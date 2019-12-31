export const isLotteryValid = lottery => {
  const validLotteries = new Set(['megasena', 'lotofacil', 'lotomania', 'quina'])

  return validLotteries.has(lottery)
}
