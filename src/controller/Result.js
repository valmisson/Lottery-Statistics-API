const SaveResult = async (req, res) => {
  try {
    const { lottery } = req.params

    res.json(lottery)
  } catch (error) {
    res.sendError(error.message, 500)
  }
}

module.exports = { SaveResult }
