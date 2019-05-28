const { createLogger, format, transports } = require('winston')
const dateFormate = require('dateformat')

const date = dateFormate(new Date(), 'dd-mm-yyyy, H:MM:ss - "UTC"o')

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { date },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/all.log' })
  ]
})

module.exports = logger
