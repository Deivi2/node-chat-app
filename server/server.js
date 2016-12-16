const path = require('path');

const http = require("http");
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

    // //creating event to single connection
    // socket.emit('createMessage', {
    //     from: 'pupa@example.com',
    //     text: 'gerai :)',
    // });


    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });



    socket.on('createMessage', (message) => {
        console.log('createMessage: ', message);

        // emits to every connection(connected user)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        //broadcasting specifies witch user should not get event
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    //listening event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

server.listen(port, () => {
    console.log('Running server on port', port)
});