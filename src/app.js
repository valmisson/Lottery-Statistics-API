import logger from 'morgan'
import express from 'express'

import routes from '@routes'
import Logger from '@services/Logger'
import { ErrorMessage, createError } from '@utils/Errors'

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2)

// see logs files
app.use('/logs', express.static('logs'))

// response info handler
app.use((req, res, next) => {
  res.info = (info) => {
    Logger.info({ method: req.method, url: req.originalUrl, ...info })

    res.status(info.statusCode).json(info)
  }

  next()
})

// define app routes
app.use('/', routes)

// catch 404 error
app.use((req, res) => {
  res.status(404).json(createError(404, 'Not Found'))
})

// errors handler
app.use((err, req, res, next) => {
  const { lottery } = req.body

  const error = ErrorMessage(err.message, lottery)

  Logger.error({ method: req.method, url: req.originalUrl, ...error })

  res.status(error.statusCode).json(error)
})

export default app
