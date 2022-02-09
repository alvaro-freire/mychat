const net = require('net');
const port = 8080
const clientList = []

const server = net.createServer((socket) => {
    console.log('opened connection', socket.remoteAddress, socket.remotePort)
    clientList.push(socket)
    username = socket.remotePort + ' '

    socket.on('data', (data) => {
        const first = String(data).split(' ')[0]
        message = String(data).replace(first + " ", '').trim()

        if (first == 'SEND') {
            socket.write('RECEIVE port:' + username + '-> ' + message + '\n')

            clientList.forEach((client) => {
                socket.write('client port -> ' + client.remotePort + '\n')
            })

        } else if (first == 'USERNAME') {
            if (message.indexOf(' ') !== -1) {
                socket.write('ERROR invalid username\n')
            } else {
                username = message
            }
        } else {
            if (String(data) == 'USERNAME\n') {
                socket.write('USERNAME -> ' + username + '\n')
            } else {
                socket.write('ERROR invalid command\n')
            }
        }
    })

    socket.on('close', () => {
        clientList.splice(clientList.indexOf(socket), 1)
        console.log('closed connection', socket.remoteAddress, socket.remotePort)
    })
})


server.listen(port, () => {
    console.log('opened server on', server.address());
});