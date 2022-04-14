const { randomInt } = require('crypto');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const {Client, LocalAuth} = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: randomInt(700)
    })
})
// fire index
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './src/theme' });
});

// client events - initialize
client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    io.emit('qrcode', qr);
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('ready', () => {
    console.log('READY');
    client.getChats().then((resp) => {
        resp.some((item, i) => {
            io.emit('chat', item);
            console.log(item);
        })
    });
});

client.on('message', (msg) => {
    console.log('MESSAGE RECEIVED', msg);
});

client.initialize();


// socket.io events - 
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log('MESSAGE SENDED', msg);
        client.sendMessage('5521990685109@c.us', msg);

        io.emit('message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});