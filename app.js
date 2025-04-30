require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
      res.send("Hello World")
})

app.use((err, req, res, next) => {
      console.log(err)
      res.status(500).send("Something Broke")
})

app.listen(process.env.PORT)