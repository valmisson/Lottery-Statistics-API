import { Router } from 'express'

import { ResultControllers, StatisticControllers } from '@controllers'

const route = Router()

route.post('/resultado/salvar', ResultControllers.save)
route.put('/estatisticas/atualizar', StatisticControllers.updateAll)

route.get('/', (req, res) => {
  const entireURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  res.json({
    salvar_resultado: {
      url: entireURL + '/resultado/salvar',
      method: 'POST',
      input: 'lottery'
    },
    atualizar_estatisticas: {
      url: entireURL + '/estatisticas/atualizar',
      method: 'POST',
      input: 'lottery'
    }
  })
})

export default route
