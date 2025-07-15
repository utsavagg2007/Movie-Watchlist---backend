const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {
  getProfile,
  addToWatchlist,
  removeFromWatchlist
} = require('../controllers/userController')

const router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.post('/watchlist', authMiddleware, addToWatchlist)
router.delete('/watchlist', authMiddleware, removeFromWatchlist)

module.exports = router