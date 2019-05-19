const logger = require('morgan')
const express = require('express')

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

module.exports = app
