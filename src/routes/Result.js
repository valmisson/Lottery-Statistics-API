const route = require('express').Router()
const { SaveResult, UpdateResult } = require('@controller/Result')

route.get('/:lottery/salvar', SaveResult)
route.get('/:lottery/atualizar', UpdateResult)

module.exports = route
