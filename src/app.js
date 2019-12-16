import logger from 'morgan'
import express from 'express'

import routes from '@routes'

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2)

// define app routes
app.use('/', routes)

// catch 404 error
app.use((req, res) => {
  res.json({
    message: 'Not Found'
  })
})

export default app
