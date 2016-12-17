const path = require('path');

const http = require("http");
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/valadation.js');
const {Users} = require('./utils/users.js');


const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
//creating server using http lab
var server = http.createServer(app);
//telling server to use socket io
var io = socketIO(server);

var users = new Users();

//middleware that starts chat.html file
app.use(express.static(publicpath));

//lets register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    // //creating event to single connection
    // socket.emit('createMessage', {
    //     from: 'pupa@example.com',
    //     text: 'gerai :)',
    // });

    // // when starring app// emits specifically to one user
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //
    // //send to everyone except current user
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        // emit chat messages to peoples in the room // it will let emit to everybody or people in specific rooms
        // join the room socket.join('Room name');
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // when starring app// emits specifically to one user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        //send to everyone except current user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });


// on create message
    socket.on('createMessage', (message, callback) => {
        //   console.log('createMessage: ', message);
        // emits to every connected(connected user)

        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
        //broadcasting specifies witch user should not get event
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {


        var user = users.getUser(socket.id);
        console.log(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }


    });

    //listening event
    socket.on('disconnect', () => {
        console.log('user disconnected');

        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin,', `${user.name} has left`));


        }

    })
});

server.listen(port, () => {
    console.log('Running server on port', port)
});