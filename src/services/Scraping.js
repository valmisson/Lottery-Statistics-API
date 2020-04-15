import puppeteer from 'puppeteer'
import { ERR_SCRAPING } from '@utils/ErrorTypes'

const Scraping = async lottery => {
  try {
    const URL = `http://loterias.caixa.gov.br/wps/portal/loterias/landing/${lottery}`

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await page.goto(URL)

    const result = await page.evaluate(lottery => {
      const dezenasQuery = lottery === 'lotomania' || lottery === 'lotofacil'
        ? '.resultado-loteria table tbody tr td' : '#ulDezenas li'

      const concursoEl = document.querySelector('.title-bar h2 span')
      const dezenasEl = document.querySelectorAll(dezenasQuery)
      const premiacaoEl = document.querySelectorAll('.related-box .description')

      const concursoInfo = concursoEl.textContent.replace(/\s+/g, '|').split('|')

      const concurso = {
        numero: concursoInfo[1].trim(),
        data: concursoInfo[2].replace(/\(|\)/g, '')
      }

      const dezenas = []

      dezenasEl.forEach(numero => {
        const dezena = numero.textContent.trim()

        dezenas.push(dezena)
      })

      const premiacao = []

      premiacaoEl.forEach(el => {
        const premiacaoInfo = el.textContent.trim()
          .replace(/apostas?|ganhadoras?,|números|- [2-6]|acertados|acertos|R\$/g, '')
          .replace(/Não houve acertador/, '0  0,00')
          .replace(/\s+/g, ' ')
          .split(' ')

        if (!/Sena|Quina|Quadra|Terno|Duque|[11-20]|0/.test(premiacaoInfo[0])) return

        premiacao.push({
          nome: premiacaoInfo[0],
          ganhadores: premiacaoInfo[1],
          valor: premiacaoInfo[2]
        })
      })

      return {
        concurso,
        dezenas,
        premiacao
      }
    }, lottery)

    await browser.close()

    return result
  } catch (err) {
    throw new Error(ERR_SCRAPING)
  }
}

export default Scraping
