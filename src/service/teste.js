const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const {Client, LocalAuth} = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "1234"
    })
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './src/theme' });
});

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

io.on('connection', (socket) => {
    console.log('a user connected');

});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        var message = {
            mediaKey: undefined,
            id: {
              fromMe: false,
              remote: `5521990685109@c.us`,
              id: '1234567890ABCDEFGHIJ',
              _serialized: `false_5521990685109@c.us_1234567890ABCDEFGHIJ`
            },
            ack: -1,
            hasMedia: false,
            body: 'Hello!',
            type: 'chat',
            timestamp: 1591482682,
            from: `5521990685109@c.us`,
            to: `5521990685109@c.us`,
            author: undefined,
            isForwarded: false,
            broadcast: false,
            fromMe: false,
            hasQuotedMsg: false,
            location: undefined,
            mentionedIds: []
        };
        console.log('MESSAGE RECEIVED', msg);

        client.emit('message_create', message);

        io.emit('message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});