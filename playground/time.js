var moment = require('moment');

// var date = new Date();
//
// console.log(date.getMonth());

//
// var date = moment();
// console.log(date.format('Do MM YYYY'));

var createdAt = 1234;
var time = moment(createdAt);
console.log(time.format('k:mm a'));