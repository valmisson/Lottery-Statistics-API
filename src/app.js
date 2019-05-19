const logger = require('morgan')
const express = require('express')
const sendError = require('@helper/sendError')

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(sendError)

module.exports = app
