const route = require('express').Router()
const ResultRoute = require('./Result')

route.use('/resultado/', ResultRoute)

route.get('/', (req, res) => {
  res.json({
    save_result: req.entireURL + '/resultado/:lottery/salvar'
  })
})

module.exports = route
