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
