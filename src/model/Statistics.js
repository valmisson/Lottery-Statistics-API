const database = require('@database')

exports.saveFrequencyDozens = async data => {
  try {
    const { lottery, frequencyDozens } = data
    const databaseRef = await database.ref(`frequencia_dezenas__${lottery}`)

    await databaseRef.set(frequencyDozens)
  } catch (error) {
    throw new Error(`Error ao salvar frequencia dezenas da ${data.lottery}`)
  }
}
