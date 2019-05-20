const Scraping = require('@service/scraping')
const { save } = require('@model/Result')

const SaveResult = async (req, res) => {
  try {
    const { lottery } = req.params

    const result = await Scraping(lottery)

    await save({ lottery, result })

    res.json({ message: `Resultado da ${lottery} salvo!` })
  } catch (error) {
    return res.sendError(error.message, 500)
  }
}

module.exports = { SaveResult }
