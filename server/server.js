const path = require('path');
const express = require('express');

const publicpath = path.join(__dirname, '../public');
const port = process.evc.PORT || 3000;
const app = express();

//middleware that starts index.html file
app.use(express.static(publicpath));



app.listen(port,() => {
 console.log('Running server on port', port)
});