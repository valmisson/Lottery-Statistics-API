import { Router } from 'express'

const route = Router()

route.get('/', (req, res) => {
  res.json({
    routes: 'all Routes'
  })
})

export default route
