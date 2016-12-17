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

//to post message in form
$("#message-form").on('submit', function (e) {
    e.preventDefault();

    var messageTestBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTestBox.val()
    },function () {
        messageTestBox.val('')
    });
});

//to get posted message
socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from} ${formatedTime}: ${message.text}`);

    $('#messages').append(li);
});


// generate new location message

socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');

    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: ${formatedTime} `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);

});

//add and post location

var locationButton = $('#send-location');
locationButton.on('click', function(){


   if(!navigator.geolocation){
       return alert('Geolocation not supported by your browser.')
   }

   locationButton.attr('disabled', 'disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function (position) {
       console.log(position);
       locationButton.removeAttr('disabled').text('Send location');
       socket.emit('createLocationMessage',{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       });
   },function () {
       locationButton.removeAttr('disabled').text('Send location');
       alert('Unable to fetch location')
   })
});

