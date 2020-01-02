import { createLogger, format, transports } from 'winston'

const Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/all.log', level: 'info' })
  ]
})

export default Logger
