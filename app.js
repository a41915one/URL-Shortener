const express = require('express')

const mongoose = require('mongoose')
const Record = require('./models/record')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})