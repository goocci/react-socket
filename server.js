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
    headless: false,
    devtools: true,
    slowMo: 250 // slow down by 250ms
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

  let promiseAll = []
  for (let i = 1; i <= totalPageNum; i++) {
    promiseAll.push(getWord(queryWord, i))
  }

  const result = await Promise.all(promiseAll)
  console.log(result)
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
          console.log(elem.children[0].children[0].innerText)
          const regex = /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi
          let word = elem.children[0].children[0].innerText.replace(regex, '')
          let meaning = elem.children[2] ? elem.children[2].children[0].children[1].innerText : elem.children[1].innerText.replace(/ *\[[^)]*\] */g, '')
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
