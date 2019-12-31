import Statistic from '@sciences/Statistic'
import { StatisticModel, ResultModel } from '@models'
import { isLotteryValid } from '@utils/Helps'
import { ERR_LOTTERY_INVALID, ERR_EMPTY_RESULTS } from '@utils/ErrorTypes'

class StatisticController {
  async updateAll (req, res, next) {
    const { lottery } = req.body

    try {
      if (!isLotteryValid(lottery)) throw new Error(ERR_LOTTERY_INVALID)

      const results = await ResultModel.find(lottery)

      if (!results) throw new Error(ERR_EMPTY_RESULTS)

      const allFrequency = Statistic.parseAllFrequency(results)

      await StatisticModel.save(allFrequency, lottery)

      res.json({
        loteria: lottery,
        messagem: 'Estatisticas atualizada com sucesso.'
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new StatisticController()
