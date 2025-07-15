const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log('Auth Header:', authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token provided' })

  const token = authHeader.split(' ')[1]
  console.log('Extracted Token:', token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    console.error('JWT verification failed:', err.message)
    res.status(401).json({ msg: 'Invalid token' })
  }
}

module.exports = authMiddleware