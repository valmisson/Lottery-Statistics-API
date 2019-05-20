const Scraping = require('@service/scraping')

const SaveResult = async (req, res) => {
  try {
    const { lottery } = req.params

    const result = await Scraping(lottery)

    res.json(result)
  } catch (error) {
    return res.sendError(error.message, 500)
  }
}

module.exports = { SaveResult }
