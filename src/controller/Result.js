const Scraping = require('@service/scraping')
const { save } = require('@model/Result')
const { serialize } = require('@handle/Results')

exports.SaveResult = async (req, res) => {
  try {
    const { lottery } = req.params

    const result = await Scraping(lottery)

    await save({ lottery, result })

    res.json({ message: `Resultado da ${lottery} salvo!` })
  } catch (error) {
    return res.sendError(error.message, 500)
  }
}

exports.UpdateResult = async (req, res) => {
  try {
    const { lottery } = req.params
    const resultsList = [] // should be an array of objects with results

    const results = serialize(resultsList)

    results.forEach(async result => {
      await save({ lottery, result })
    })

    res.json({ message: `Resultados da ${lottery} atualizado!` })
  } catch (error) {
    return res.sendError(error.message, 500)
  }
}
