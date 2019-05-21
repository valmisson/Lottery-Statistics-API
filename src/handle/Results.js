exports.serialize = resultsList => {
  if (!resultsList.length) {
    throw new Error(`Error ao atualizar resultados, lista de resultados esta vazio`)
  }

  const results = resultsList.map(result => {
    const { numero, data, dezenas } = result.concurso

    const premiacaoArray = Object.entries(result.concurso.premiacao)

    const premiacao = premiacaoArray.map(premio => {
      let nome = premio[0].charAt(0).toUpperCase() + premio[0].slice(1)
      nome = nome.replace(/Acertos_/, '')

      return {
        nome,
        ganhadores: premio[1].ganhadores || '0',
        valor: premio[1].valor_pago
      }
    })

    return {
      concurso: {
        numero,
        data
      },
      dezenas,
      premiacao
    }
  })

  return results
}
