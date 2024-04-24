// js/client.js
document.addEventListener('DOMContentLoaded', function () {
    const socket = io();

    const form = document.getElementById('send-container');
    const messageInp = document.getElementById('messageInp');
    const container = document.querySelector('.container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (messageInp.value) {
            const message = messageInp.value;
            socket.emit('chat message', message);
            appendMessage(`You: ${message}`, 'right'); // Show my message immediately
            messageInp.value = '';
        }
    });

    socket.on('chat message', function (data) {
        const { message, username } = data;
        if (username !== socket.username) { // Display only if message is not from current user
            appendMessage(`${username}: ${message}`, 'left');
        }
    });

    const username = prompt('Enter your username:');
    socket.emit('user joined', username);
    socket.username = username;


    
    function appendMessage(message, position) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add('message', position);
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }
});
