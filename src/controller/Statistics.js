exports.UpdateStatistics = (req, res) => {
  try {
    const { lottery } = req.params

    res.json({ message: `Estatisticas da ${lottery} atualizada` })
  } catch (error) {
    res.sendError(error.message, 500)
  }
}
