const logger = require('morgan')
const express = require('express')
const sendError = require('@helper/sendError')
const entireURL = require('@helper/entireURL')
const routes = require('@routes/')
const { description, version } = require('~/package.json')

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2)

app.use(sendError)
app.use(entireURL)

app.use('/v1', routes)

app.get('/', (req, res) => {
  res.json({
    name: description,
    version,
    path: req.entireURL + 'v1'
  })
})

// catch 404 error
app.use((req, res) => {
  res.json({
    message: 'Not Found'
  })
})

module.exports = app
