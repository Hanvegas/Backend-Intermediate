const express = require('express')
const { userRegister, userLogin } = require('../services/auth')
const { route } = require('./movie')
const { getUserByEmail } = require('../database')

const router = express.Router()

router.post('/testing', async (req, res) => {
      const { email } = req.body
      const user = await getUserByEmail(email)
      console.log(user)
})

router.post('/register', async (req, res) => {
      const { fullname, username, password, email } = req.body
      if (!fullname || !username || !password || !email) return res.send("Please input fields")
      const input = await userRegister(fullname, username, password, email)
      res.send(input)
})

router.post('/login', async (req, res) => {
      const { email, password } = req.body
      if (!email || !password) return res.send("Please input fields")
      const { token, passwordHash } = await userLogin(email, password)
      res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24
      })
      res.send({ token, passwordHash })
})



module.exports = router