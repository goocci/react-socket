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

  await page.goto('https://ko.dict.naver.com/search.nhn?query=국&kind=keyword')

  const result = await page.evaluate(() => {
    let data = []
    let elements = [...document.querySelectorAll('.lst3')[0].children]
    console.log(elements)

    elements.forEach((elem, index) => {
      let word = elem.children[0].children[0].children[0].innerText
      console.log(word)
      let meaning = elem.children[2] ? elem.children[2].children[0].children[1].innerText : elem.children[1].innerText.replace(/ *\[[^)]*\] */g, '')
      console.log(meaning)
      let type = elem.children[2] ? elem.children[1].innerText : elem.children[1].innerText.split(' ')[0]
      console.log(type)
      console.log('--------------')

      data.push({
        word: word,
        meaning: meaning
      })
    })

    return data // Return our data array
  })

  // browser.close()
  return result // Return the data
}

scrape().then((value) => {
  console.log(value) // Success!
})
