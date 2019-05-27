const { JSDOM } = require('jsdom')

const resultScraping = async lottery => {
  try {
    const lotteryName = lottery.replace(/megasena/, 'mega-sena')

    const URL = `https://noticias.uol.com.br/loterias/${lotteryName}/`

    const DOM = await JSDOM.fromURL(URL)
    const HTML = DOM.serialize()

    const { document } = (new JSDOM(HTML)).window

    const concursoEl = document.querySelector('.lottery-info span')
    const dezenasEl = document.querySelectorAll('.lt-result .lt-number')
    const premiacaoEl = document.querySelectorAll('.lottery-results-table table tbody tr')

    const concursoInfo = concursoEl.textContent.trim().split(' ')

    const concurso = {
      numero: concursoInfo[1],
      data: concursoInfo[4].replace(/\./g, '/')
    }

    const dezenas = []

    dezenasEl.forEach(numero => {
      let dezena = numero.textContent.trim()

      if (dezena.length < 2) dezena = `0${dezena}`

      dezenas.push(dezena)
    })

    const premiacao = []

    premiacaoEl.forEach(el => {
      const elContent = el.querySelectorAll('td')

      const nome = elContent[0].textContent.replace(/ acertos/, '')
      const ganhadores = elContent[1].textContent
      const valor = elContent[2].textContent

      premiacao.push({
        nome,
        ganhadores,
        valor
      })
    })

    return {
      concurso,
      dezenas,
      premiacao
    }
  } catch (error) {
    throw new Error('Error ao fazer raspagem do resultado da ' + lottery)
  }
}

module.exports = resultScraping
