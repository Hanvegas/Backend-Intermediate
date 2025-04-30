require('dotenv').config()
const express = require('express')
const { getMovies, getMovieById, updateMovie, insertMovie, deleteMovie } = require('./database')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/movie', async (req, res) => {
      const movies = await getMovies()
      res.send(movies)
})

app.get("/movie/:id", async (req, res) => {
      const { id } = req.params
      const movie = await getMovieById(id)
      res.send(movie)
})

app.post('/movie', async (req, res) => {
      const { name, synopsis, rating } = req.body
      if (!name || !synopsis || !rating) return res.send("Field cannot Empty")
      const movie = await insertMovie(name, synopsis, rating)
      res.send(movie)
})

app.patch('/movie/:id', async (req, res) => {
      try {
            const { id } = req.params
            const { name, synopsis, rating } = req.body
            if (!name || !synopsis || !rating) return res.send("Field cannot Empty")
            const movie = await updateMovie(name, synopsis, rating, id)
            res.send(movie)
      } catch (error) {
            console.log(error)
      }
})

app.delete('/movie/:id', (req, res) => {
      const { id } = req.params
      deleteMovie(id)
      res.send("Deleted Movie Successfully")
})

app.use((err, req, res, next) => {
      console.log(err)
      res.status(500).send("Something Broke")
})

app.listen(process.env.PORT)