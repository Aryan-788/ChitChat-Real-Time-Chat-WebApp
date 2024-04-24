// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        const username = socket.username || 'Anonymous';
        io.emit('chat message', { message: msg, username: username });
    });

    socket.on('user joined', (username) => {
        socket.username = username;
        io.emit('chat message', { message: `${username} joined the chat`, username: 'System' });
    });
});



server.listen(8000, () => {
    console.log('Server listening on port 8000');
});
