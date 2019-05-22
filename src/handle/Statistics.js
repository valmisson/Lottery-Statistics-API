exports.frequencyAllDozens = results => {
  try {
    const frequency = {}

    results.forEach(result => {
      const { dezenas } = result

      dezenas.forEach(dezena => {
        if (frequency[dezena]) {
          const { vezes } = frequency[dezena]

          frequency[dezena].vezes = vezes + 1
        } else {
          frequency[dezena] = {
            dezena,
            vezes: 1
          }
        }
      })
    })

    return frequency
  } catch (error) {
    throw new Error('Error ao processar frequência das dezenas')
  }
}
