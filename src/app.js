import logger from 'morgan'
import express from 'express'

import routes from '@routes'
import { ErrorMessage, createError } from '@utils/Errors'

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2)

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

  res.status(error.statusCode).json(error)
})

export default app
