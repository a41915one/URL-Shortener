const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Node.js jobs')
})

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})