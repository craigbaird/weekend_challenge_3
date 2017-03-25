var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 5000;
var index = require("./routes/index.js");
var owners = require("./routes/rename.js");

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);
// app.use('/owners', owners);

//listening
app.listen(port, function(){
  console.log("Listening on: ", port);
});
