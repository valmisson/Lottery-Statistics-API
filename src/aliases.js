import path from 'path'
import moduleAlias from 'module-alias'

const addPath = dir => path.resolve(__dirname, `./${dir}`)

moduleAlias.addAliases({
  '~': addPath('../'),
  '@src': addPath('/'),
  '@utils': addPath('/utils'),
  '@sciences': addPath('/sciences'),
  '@services': addPath('/services'),
  '@routes': addPath('/routes/index.js'),
  '@models': addPath('/models/index.js'),
  '@controllers': addPath('/controllers/index.js')
})

moduleAlias()
