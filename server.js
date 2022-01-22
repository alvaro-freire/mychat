const net = require('net');
const EventEmitter = require('events')
const port = 8080

const eventEmitter = new EventEmitter()

eventEmitter.on('connection', socket => {
    console.log('New connection')
    socket.write("Welcome\n")
})

function handler(socket) {
    eventEmitter.emit('connection', socket)
}

const server = net.createServer(handler)

server.listen(port, () => {
    console.log('opened server on', server.address());
});