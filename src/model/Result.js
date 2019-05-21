const database = require('@database')

exports.save = async data => {
  try {
    const { lottery, result } = data
    const { numero } = result.concurso

    const databaseRef = await database.ref(`resultado__${lottery}`)

    await databaseRef.child(numero).set(result)
  } catch (error) {
    throw new Error('Error ao salvar resultado da ' + data.lottery)
  }
}
