import { Database } from '@services/Firebase'
import { ERR_SAVE_RESULT, ERR_FIND_RESULT } from '@utils/ErrorTypes'

class ResultModel {
  async save (result, lottery) {
    try {
      const { numero } = result.concurso
      const databaseRef = await Database.ref(`resultado__${lottery}`)

      await databaseRef.child(numero).set(result)
    } catch (err) {
      throw new Error(ERR_SAVE_RESULT)
    }
  }

  async find (lottery) {
    try {
      const databaseRef = await Database.ref(`resultado__${lottery}`)
      const result = await databaseRef.once('value')

      return result.val()
    } catch (err) {
      throw new Error(ERR_FIND_RESULT)
    }
  }

  async findOne (contest, lottery) {
    try {
      const databaseRef = await Database.ref(`resultado__${lottery}`)
      const result = await databaseRef.child(contest).once('value')

      return result.val()
    } catch (error) {
      throw new Error(ERR_FIND_RESULT)
    }
  }
}

export default new ResultModel()
