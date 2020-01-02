import { ERR_PARSE_FREQUENCY_DOZENS } from '@utils/ErrorTypes'

class Statistic {
  parseFrequency ({ dozens, frequencyDozensList }) {
    try {
      const frequency = frequencyDozensList

      this._addTimesFrequency(dozens, frequency)

      return frequency
    } catch (err) {
      throw new Error(ERR_PARSE_FREQUENCY_DOZENS)
    }
  }

  parseAllFrequency (resultList) {
    try {
      const frequency = {}
      const results = Object.values(resultList)

      results.forEach(result => {
        const { dezenas } = result

        this._addTimesFrequency(dezenas, frequency)
      })

      return frequency
    } catch (error) {
      throw new Error(ERR_PARSE_FREQUENCY_DOZENS)
    }
  }

  _addTimesFrequency (dozens, frequency) {
    dozens.forEach(dezena => {
      if (frequency[dezena]) {
        frequency[dezena].vezes += 1

        return
      }

      frequency[dezena] = {
        dezena,
        vezes: 1
      }
    })
  }
}

export default new Statistic()
