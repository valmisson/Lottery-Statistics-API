const route = require('express').Router()
const ResultRoute = require('./Result')

route.use('/resultado/', ResultRoute)

route.get('/', (req, res) => {
  res.json({
    save_result: req.entireURL + '/resultado/:lottery/salvar',
    update_results: req.entireURL + '/resultado/:lottery/atualizar'
  })
})

module.exports = route
