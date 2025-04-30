const mysql = require('mysql2')

const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
}).promise()

module.exports.getMovies = async () => {
      const [res] = await pool.query("SELECT * FROM movies")
      return res
}

module.exports.getMovieById = async (id) => {
      const [res] = await pool.query("SELECT * FROM movies WHERE id = ?", [id])
      return res[0]
}

module.exports.insertMovie = async (name, synopsis, rating) => {
      const result = await pool.query("INSERT INTO movies (name, synopsis, rating) VALUES (?, ?, ?)", [name, synopsis, rating])
      return { id: result[0].insertId, name, synopsis, rating }
}

module.exports.updateMovie = async (name, synopsis, rating, id) => {
      await pool.query("UPDATE movies SET name = ?, synopsis = ?, rating = ? WHERE id = ?", [name, synopsis, rating, id])
      return { id, name, synopsis, rating }
}

module.exports.deleteMovie = async (id) => {
      await pool.query("DELETE FROM movies WHERE id = ?", [id])
}