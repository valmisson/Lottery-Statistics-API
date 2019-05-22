const { findAll } = require('@model/Result')
const { frequencyAllDozens } = require('@handle/Statistics')

exports.UpdateStatistics = async (req, res) => {
  try {
    const { lottery } = req.params
    const results = await findAll(lottery)
    const frequencyDozens = frequencyAllDozens(results)

    res.json(frequencyDozens)
    // res.json({ message: `Estatisticas da ${lottery} atualizada` })
  } catch (error) {
    res.sendError(error.message, 500)
  }
}
