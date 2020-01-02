import Scraping from '@services/Scraping'
import Statistic from '@sciences/Statistic'
import { ResultModel, StatisticModel } from '@models'
import { isLotteryValid } from '@utils/Helps'
import {
  ERR_LOTTERY_INVALID, ERR_DUPLICATE_RESULT
} from '@utils/ErrorTypes'

class ResultController {
  async save (req, res, next) {
    const { lottery } = req.body

    try {
      if (!isLotteryValid(lottery)) throw new Error(ERR_LOTTERY_INVALID)

      const result = await Scraping(lottery)
      const { concurso, dezenas } = result

      if (await ResultModel.findOne(concurso.numero, lottery)) {
        throw new Error(ERR_DUPLICATE_RESULT)
      }

      const frequencyDozensList = await StatisticModel.find(lottery)

      const frequencyDozens = Statistic.parseFrequency({
        dozens: dezenas, frequencyDozensList
      })

      await ResultModel.save(result, lottery)
      await StatisticModel.save(frequencyDozens, lottery)

      res.info({
        statusCode: 201,
        messagem: `Resultado salvo e estatística atualizada, ${lottery} - ${concurso.numero}.`
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new ResultController()
