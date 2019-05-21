const route = require('express').Router()
const ResultRoute = require('./Result')
const StatisticsRoute = require('./Statistics')

route.use('/resultado/', ResultRoute)
route.use('/estatisticas/', StatisticsRoute)

route.get('/', (req, res) => {
  res.json({
    save_result: req.entireURL + '/resultado/:lottery/salvar',
    update_results: req.entireURL + '/resultado/:lottery/atualizar',
    update_statistics: req.entireURL + '/estatisticas/:lottery/atualizar'
  })
})

module.exports = route
