const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//connect to mongodb
const MONGO_URI = config.mongoDBUri;
mongoose.connect(MONGO_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('📍 Connected to MongoDB')
})

module.exports = app
