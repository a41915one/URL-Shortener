const express = require('express')

const mongoose = require('mongoose')
const URL = require('./models/url')
const shortenURL = require('./utils/shortenURL')
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
  // 設定OriginalURL變數，並將網頁中輸入的original賦值給變數
  const OriginalURL = res.body.original
  // 去URL models找尋，如果沒有找到跟網頁中輸入的original一樣資料
  URL.findOne({ OriginalURL })
    // 就執行這個then，創造一筆original資料並同時執行shortenURL功能創造一筆shorten資料
    .then(data => {
      data ? data : URL.create({ shorten: shortenURL, original: OriginalURL })
    })
    //如果在URL model中有找到一樣的資料，則不創造新資料，直接渲染原網頁
    .then(data => {
      res.render('index', {
        original: data.original,
        shorten: data.shorten,
      })
    })
    .catch(err => console.log('error !!!'))
})

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})