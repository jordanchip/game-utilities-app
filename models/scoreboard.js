// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')


// setup json web token

var User = require('./user.js');

// User info, with items owned by that user
var scoreboardSchema = new Schema({
    playerName: {type: String, unique: true},
    score: {type: String},
    // index: true, unique: true
});


// add findOrCreate
scoreboardSchema.plugin(findOrCreate);

var Scoreboard = mongoose.model('scoreboard', scoreboardSchema);

module.exports = Scoreboard;