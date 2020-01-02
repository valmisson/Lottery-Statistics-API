import {
  ERR_LOTTERY_INVALID,
  ERR_SCRAPING,
  ERR_FIND_RESULT,
  ERR_FIND_STATISTIC,
  ERR_DUPLICATE_RESULT,
  ERR_EMPTY_RESULTS,
  ERR_PARSE_FREQUENCY_DOZENS,
  ERR_SAVE_RESULT,
  ERR_SAVE_STATISTIC
} from './ErrorTypes'

export const createError = (statusCode, message) => {
  return {
    statusCode,
    message
  }
}

export const ErrorMessage = (errorType, lottery) => {
  let error

  switch (errorType) {
    case ERR_LOTTERY_INVALID:
      error = createError(422, `Loteria invalida, ${lottery}`)
      break
    case ERR_SCRAPING:
      error = createError(500, `Error ao fazer raspagem do resultado, ${lottery}.`)
      break
    case ERR_FIND_RESULT:
      error = createError(500, `Error ao buscar resultado, ${lottery}.`)
      break
    case ERR_FIND_STATISTIC:
      error = createError(500, `Error ao buscar estatística, ${lottery}.`)
      break
    case ERR_DUPLICATE_RESULT:
      error = createError(409, `Resultado já existe, ${lottery}.`)
      break
    case ERR_EMPTY_RESULTS:
      error = createError(404, `Não existe resultados, ${lottery}.`)
      break
    case ERR_PARSE_FREQUENCY_DOZENS:
      error = createError(500, `Error ao analizar frequência das dezenas, ${lottery}.`)
      break
    case ERR_SAVE_RESULT:
      error = createError(500, `Error ao salvar resultado, ${lottery}`)
      break
    case ERR_SAVE_STATISTIC:
      error = createError(500, `Error ao salvar estatística, ${lottery}`)
      break
    default:
      error = createError(500, 'Internal Server Error')
  }

  return error
}
