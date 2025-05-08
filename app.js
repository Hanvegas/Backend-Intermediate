require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/movie', require('./routes/movie'))

app.use('/', require('./routes/auth'))

app.use((req, res, next) => {
      next(res.status(404).send("Not Found"))
})

app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500
      res.status(statusCode).send(err.message)
})

app.listen(process.env.PORT)