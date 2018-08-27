const express = require('express')
const app = express()

app.listen(8080, () => {
  console.log('server is running on port 8080')
})

// cors 허용
app.use(
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH')
    res.header('Access-Control-Allow-Headers', 'Content-Type, apikey, x-access-token')
    next()
  }
)

app.get('/scrape', (req, res) => {
  scrape(req.query.endWord)
    .then((value) => {
      res.status(200).json(value)
    })
    .catch((err) => {
      console.error(err)
    })
})

// const socket = require('socket.io')
// io = socket(server)

// io.on('connection', (socket) => {
//   console.log(socket.id)

//   socket.on('SEND_MESSAGE', (data) => {
//     io.emit('RECEIVE_MESSAGE', data)
//   })
// })

const puppeteer = require('puppeteer')

let scrape = async (endWord) => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()

  await page.goto(`https://ko.dict.naver.com/search.nhn?query=${endWord}로시작하는단어&kind=keyword`)

  // 마지막 페이지 번호 산출
  let totalPageNum = await page.evaluate(() => {
    let totalItemCount = [...document.querySelectorAll('.section .head em')].pop().innerText.replace('(', '').replace(')', '')
    let lastPageNum = Math.ceil(Number(totalItemCount) / 10)

    return lastPageNum
  })
  browser.close()
  console.log('Last Page Number: ', totalPageNum)

  let randomPageNum = getRandomIntInclusive(1, totalPageNum)
  console.log('Random Page Number: ', randomPageNum)

  let result = ''
  let loop = true
  while (loop) { // "명사"를 찾을 때 까지 반복
    result = await getWord(endWord, randomPageNum)
    if (result.type === '명사') loop = false
  }

  return result
}

/**
 * [Func] 특정 페이지의 요청 단어 Scraping
 * @param {*} queryWord // 요청 단어
 * @param {*} pageNum // 총 페이지 수
 */
const getWord = (queryWord, pageNum) => {
  return new Promise((resolve, reject) => {
    async function superman () {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      await page.goto(`https://ko.dict.naver.com/search.nhn?query=${queryWord}로시작하는단어&kind=keyword&page=${pageNum}`)
      const result = await page.evaluate(() => {
        let elements = [...document.querySelectorAll('.lst3')[0].children]
        console.log(elements)

        let data = []
        elements.forEach((elem, index) => {
          const elemArr = [...elem.children]
          const regex = /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi

          let word = '' // 단어
          let meaning = '' // 뜻
          let type = '' // 품사
          elemArr.forEach((child) => {
            if (child.localName === 'div') word = child.children[0].innerText.replace(regex, '')
            if (child.localName === 'ul') meaning = child.children[0].children[1].innerText
            if (child.localName === 'p') type = meaning = child.innerText
            if (child.localName === 'p' && child.className !== 'syn') {
              meaning = child.innerText.slice(type.indexOf(']') + 1)
            }
          })

          // [TODO] 산기슭 ...

          data.push({
            word: word,
            meaning: meaning,
            type: type.substring(type.indexOf('[') + 1, type.indexOf(']'))
          })
        })

        return data
      })

      let pick = result[Math.floor(Math.random() * result.length)]

      resolve(pick)
      browser.close()
    }

    superman()
  })
}

/**
 * [Func] 임의 숫자 반환
 * @param {*} min // 최소 숫자
 * @param {*} max // 최대 숫자
 */
function getRandomIntInclusive (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
