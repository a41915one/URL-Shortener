const express = require('express')
const SERVER = 'http://localhost:3000/'
const mongoose = require('mongoose')
const URL = require('./models/url')
const shortenCode = require('./utils/shortenCode')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  res.render('index')
})

// 新增網址
app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect('/')
  // 先把產生一筆短code的功能賦值到變數中，後續方便使用
  const shortURL = shortenCode();
  // 去URL models找尋，如果沒有找到跟網頁中輸入的url一樣資料
  URL.findOne({ original: req.body.url })
    // 就執行這個then，創造一筆original資料並同時放入shortURL(以shortenCode所做出的一筆shorten資料)
    .then(data => {
      // 確保沒有一樣的data才繼續創造
      if (!data) {
        return URL.create({ shorten: shortURL, original: req.body.url });
      }
      console.log(data);
      //如果有return data,則會在整個.then()鏈繼續使用，若沒有，怎僅限於在這個.then()中存在
      return data;
    })
    //如果在URL model中有找到一樣的資料，則不創造新資料，直接渲染原網頁
    .then(data => {
      res.render('index', {
        SERVER: SERVER,
        origin: req.body.url,
        shortURL: data.shorten,
      })
    })
    .catch(err => console.error('error !!!', err));
})




app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})