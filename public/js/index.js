//request initiate connection from client and keep connection open
var socket = io();

//listen to event
socket.on('connect', function () {
    console.log('connected to server');
    // socket.emit('newMessage', {
    //     from: 'Deivi2',
    //     text: 'Pupa prasiskiesk ikisiu',
    //     createdAt: '11'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected form server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});


jQuery("#message-form").on('submit', function (e) {

    var eee = e;

    eee.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function () {
        
    });
});