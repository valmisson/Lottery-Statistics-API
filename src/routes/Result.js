const route = require('express').Router()
const { SaveResult } = require('@controller/Result')

route.get('/:lottery/salvar', SaveResult)

module.exports = route
