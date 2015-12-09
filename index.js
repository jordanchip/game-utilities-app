// setup Express
var app = require('./models/express.js');
var Popover = require('./app/react-bootstrap/lib/Popover.js');
var express = require('express');

app.use(express.static('public'));

// setup mongoose
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/gameutilities', function (err) {
	if (err) {
		console.log(err);
	}
});

// models
var api = require('./models/api.js');
var User = require('./models/user.js');
//var Item = require('./models/item.js');
var Idea = require('./models/idea.js');
var Tournament = require('./models/tournament.js');


// start the server
var server = app.listen(3000, function() {
	console.log("Started on port 3000");
	var host = server.address().address;
	var port = server.address().port;
});