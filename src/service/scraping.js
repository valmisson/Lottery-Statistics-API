const { JSDOM } = require('jsdom')

const resultScraping = async lottery => {
  try {
    const URL = `https://g1.globo.com/loterias/${lottery}.ghtml`

    const DOM = await JSDOM.fromURL(URL)
    const HTML = DOM.serialize()

    const { document } = (new JSDOM(HTML)).window

    const concursoEl = document.querySelector('.content-lottery__info')
    const dezenasEl = document.querySelectorAll('.content-lottery__result')
    const premiacaoEl = document.querySelectorAll('.tabela_premiacao table tbody tr')

    const concursoInfo = concursoEl.textContent.trim().split(' ')

    const concurso = {
      numero: concursoInfo[1],
      data: concursoInfo[3]
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

      const nome = elContent[0].textContent.trim()
      const ganhadores = elContent[1].textContent.trim().replace(/Acumulou!/g, 0)
      const valor = elContent[2].textContent.trim().replace(/R\$ /g, '').replace(/-/g, '0,00')

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
