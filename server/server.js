const http = require('http');
const express = require('express');
const socketsIO = require('socket.io');

const RpsGame = require('./game');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketsIO(server);

let waitingPlayer = null;

io.on('connection', (sock) => {
    if(waitingPlayer){
        new RpsGame(waitingPlayer, sock);
        waitingPlayer = null;
    }else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waitng for an opponent')
    }
    sock.on('message', (text) => {
        io.emit('message', text);
    })
});

server.on('error', err => console.log('Server error: ', err));

server.listen(8080, ()=> console.log('Game Started!'));