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
app.use(express.static('public'))
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
  const shorten = shortenCode();
  // 去URL models找尋，如果沒有找到跟網頁中輸入的url一樣資料
  URL.findOne({ original: req.body.url })
    // 就執行這個then，創造一筆original資料並同時放入shortURL(以shortenCode所做出的一筆shorten資料)
    .then(data => {
      // 確保沒有一樣的data才繼續創造
      if (!data) {
        console.log(`資料庫內無相關資料，會產生新資料存到資料庫`);
        return URL.create({ shorten: shorten, original: req.body.url });
      } 
      //如果有return data,則會在整個.then()鏈繼續使用，若沒有，怎僅限於在這個.then()中存在
      console.log(`已經有相同筆資料，將會採用原資料： ${data}`);
      return data;
    })
    
    //輸入相同網址時，產生一樣的縮址。如果在URL model中有找到一樣的資料，則不創造新資料，直接以相同的資料庫資料渲染原網頁
    .then(data => {
      res.render('index', {
        SERVER: SERVER,
        original: req.body.url,
        shorten: data.shorten,
      })
    })
    .catch(err => console.error('error !!!', err));
})

app.get('/:shorten', (req, res) => {
  const shortCode = req.params.shorten;
  console.log(`網址列的shortCode為 ${shortCode}`);
  if (shortCode.length == 5) {
    URL.findOne({ shorten: shortCode })
      .then(data => {
        //console.log(data);
        if (data) {
          res.redirect(data.original);
        } else {
          console.log('No matching record found');
          res.redirect('/');
        }
      })
      .catch(err => console.error('error !!!', err))
  } else {
    res.redirect('/');
  }
})


app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})