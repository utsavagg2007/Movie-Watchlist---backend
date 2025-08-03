const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const express = require('express')
const User = require('../models/User')
const { login } = require('../controllers/authController')

const router = express.Router()

const signup = async (req, res) => {
  const { username, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' })
  }

  const bcrypt = require('bcryptjs')
  const hashed = await bcrypt.hash(password, 10)

  const user = new User({ username, email, password: hashed })
  await user.save()
  try {
    await fetch('https://hook.us2.make.com/bsl1ll65bf27xcn7jrcj15fvghc96j7m', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        name: user.username,
      })
    })
  } catch (err) {
    console.error('Webhook failed:', err)
  }
  res.status(201).json(user)
}

router.post('/signup', signup)
router.post('/login', login)

router.post('/logout', async (req, res) => {
  const { token } = req.body
  if (!token) return res.status(400).json({ message: 'Token missing' })

  try {
    const User = require('../models/User')
    await User.updateOne({ token }, { $set: { token: null } })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Logout failed' })
  }
})

module.exports = router