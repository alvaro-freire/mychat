const net = require('net');
const port = 8080

const server = net.createServer((socket) => {
    console.log('opened connection', socket.remoteAddress, socket.remotePort)

    socket.on('data', (data) => {
        console.log("wrote this: " + data)
    })

    socket.on('close', () => {
        console.log('closed connection', socket.remoteAddress, socket.remotePort)
    })

})


server.listen(port, () => {
    console.log('opened server on', server.address());
});