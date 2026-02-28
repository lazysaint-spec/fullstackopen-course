const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware')
const entryRouter = require('./controllers/entries.js')
const cors = require('cors')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB' )
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))
app.use(middleware.requestLogger)


app.use('/api/persons', entryRouter)


module.exports = app