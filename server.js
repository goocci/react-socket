const express = require('express')
const app = express()

server = app.listen(8080, () => {
  console.log('server is running on port 8080')
})

const socket = require('socket.io')
io = socket(server)

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data)
  })
})

const puppeteer = require('puppeteer')

let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()

  const queryWord = '치'
  await page.goto(`https://ko.dict.naver.com/search.nhn?query=${queryWord}&kind=keyword`)

  const totalPageNum = await page.evaluate(() => {
    let totalItemCount = [...document.querySelectorAll('.section .head em')].pop().innerText.replace('(', '').replace(')', '')
    let lastPageNum = Math.ceil(Number(totalItemCount) / 10)

    return lastPageNum
  })
  browser.close()
  console.log('Last Page Number: ', totalPageNum)

  let results = []
  for (let i = 1; i <= totalPageNum; i++) {
    let wordList = await getWord(queryWord, i)
    results.push(wordList)
  }

  return results
}

scrape()
  .then((value) => {
    console.log('Last Result:', value) // Success!
  })
  .catch((err) => {
    console.error(err)
  })

const getWord = (queryWord, pageNum) => {
  return new Promise((resolve, reject) => {
    async function superman () {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      await page.goto(`https://ko.dict.naver.com/search.nhn?query=${queryWord}&kind=keyword&page=${pageNum}`)
      const result = await page.evaluate(() => {
        let elements = [...document.querySelectorAll('.lst3')[0].children]

        let data = []
        elements.forEach((elem, index) => {
          // 단어
          const regex = /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi
          let word = elem.children[0].children[0].innerText.replace(regex, '')

          // 뜻
          let meaning = ''
          if (elem.children[2]) {
            if (elem.children[2].localName === 'ul') meaning = elem.children[2].children[0].children[1].innerText
          } else meaning = elem.children[1].innerText.replace(/ *\[[^)]*\] */g, '')

          // 품사
          let type = elem.children[2] ? elem.children[1].innerText : elem.children[1].innerText.split(' ')[0]

          data.push({
            word: word,
            meaning: meaning,
            type: type
          })
        })

        return data
      })

      resolve(result)
      browser.close()
    }

    superman()
  })
}
