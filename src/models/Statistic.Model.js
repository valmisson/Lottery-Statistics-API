import { Database } from '@services/Firebase'
import { ERR_SAVE_STATISTIC, ERR_FIND_STATISTIC } from '@utils/ErrorTypes'

class StatisticModel {
  async save (frequencyDozens, lottery) {
    try {
      const databaseRef = await Database.ref(`frequencia_dezenas__${lottery}`)

      await databaseRef.set(frequencyDozens)
    } catch (err) {
      throw new Error(ERR_SAVE_STATISTIC)
    }
  }

  async find (lottery) {
    try {
      const databaseRef = await Database.ref(`frequencia_dezenas__${lottery}`)
      const statistics = await databaseRef.once('value')

      return statistics.val()
    } catch (err) {
      throw new Error(ERR_FIND_STATISTIC)
    }
  }
}

export default new StatisticModel()
