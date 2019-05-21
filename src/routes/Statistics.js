const route = require('express').Router()
const { UpdateStatistics } = require('@controller/Statistics')

route.get('/:lottery/atualizar', UpdateStatistics)

module.exports = route
