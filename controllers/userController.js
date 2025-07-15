const User = require('../models/User')

const getProfile = async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) return res.status(404).json({ msg: 'User not found' })
  res.json({ username: user.username, watchlist: user.watchlist })
}

const addToWatchlist = async (req, res) => {
  const { title } = req.body
  await User.findByIdAndUpdate(req.userId, { $addToSet: { watchlist: title } })
  res.json({ msg: 'Movie added to watchlist' })
}

const removeFromWatchlist = async (req, res) => {
  const { title } = req.body
  await User.findByIdAndUpdate(req.userId, { $pull: { watchlist: title } })
  res.json({ msg: 'Movie removed from watchlist' })
}

module.exports = {
  getProfile,
  addToWatchlist,
  removeFromWatchlist
}