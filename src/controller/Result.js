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

// Update all results
const UpdateResult = async (req, res) => {
  try {
    const { lottery } = req.params
    const resultsList = [] // should be an array of objects with results

    if (resultsList.length === 0) throw new Error(`Error ao atualizar resultados da ${lottery}, lista de resultados esta vazio`)

    const results = resultsList.map(result => {
      const { numero, data, dezenas } = result.concurso

      const premiacaoArray = Object.entries(result.concurso.premiacao)

      const premiacao = premiacaoArray.map(premio => {
        let nome = premio[0].charAt(0).toUpperCase() + premio[0].slice(1)
        nome = nome.replace(/Acertos_/, '')

        return {
          nome,
          ganhadores: premio[1].ganhadores || '0',
          valor: premio[1].valor_pago
        }
      })

      return {
        concurso: {
          numero,
          data
        },
        dezenas,
        premiacao
      }
    })

    results.forEach(async result => {
      await save({ lottery, result })
    })

    res.json({ message: `Resultados da ${lottery} atualizado!` })
  } catch (error) {
    return res.sendError(error.message, 500)
  }
}

module.exports = { SaveResult, UpdateResult }
