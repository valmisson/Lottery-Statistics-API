const { findAll } = require('@model/Result')
const { saveFrequencyDozens } = require('@model/Statistics')
const { frequencyAllDozens } = require('@handle/Statistics')

exports.UpdateStatistics = async (req, res) => {
  try {
    const { lottery } = req.params
    const results = await findAll(lottery)
    const frequencyDozens = frequencyAllDozens(results)

    await saveFrequencyDozens({ lottery, frequencyDozens })

    res.json({ message: `Estatisticas da ${lottery} atualizada` })
  } catch (error) {
    res.sendError(error.message, 500)
  }
}
