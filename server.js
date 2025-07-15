const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const connectDB = require("./config/db")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

connectDB();

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5001, () => console.log('Server running')))
  .catch(err => console.log(err))