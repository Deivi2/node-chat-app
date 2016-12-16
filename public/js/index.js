//request initiate connection from client and keep connection open
var socket = io();

//listen to event
socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('newMessage', {
        from: 'Deivi2',
        text: 'Pupa prasiskiesk ikisiu',
        createdAt: '11'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected form server');
});

socket.on('createMessage', function (email) {
    console.log('new email', email);
});
