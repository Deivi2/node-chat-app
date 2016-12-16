const path = require('path');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
//creating server using http lab
var server = http.createServer(app);
//telling server to use socket io
var io = socketIO(server);

//middleware that starts index.html file
app.use(express.static(publicpath));

//lets register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    //creating event
    socket.emit('createMessage', {
        from: 'pupa@example.com',
        text: 'gerai :)',
    });


    socket.on('newMessage',(newMessage) => {
        console.log('new message' , newMessage);
    });

    //listening event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

server.listen(port,() => {
 console.log('Running server on port', port)
});