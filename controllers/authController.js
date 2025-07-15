const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const signup = async (req, res) => {
  const { username, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)
  const user = new User({ username, email, password: hashed })
  await user.save()
  res.status(201).json({ msg: 'User created' })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: 'Invalid credentials' })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
  res.json({ token, username: user.username })
}

module.exports = { signup, login }