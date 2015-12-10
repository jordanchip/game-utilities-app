// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

// setup bcrypt
var SALT = bcrypt.genSaltSync();

// setup json web token

var User = require('./user.js');

// User info, with items owned by that user
var scoreboardSchema = new Schema({
    user: {type: ObjectId, ref: 'users'},
    playerName: {type: String, unique: true},
    score: {type: String},
    // index: true, unique: true
});

// hash the password
userSchema.methods.setScore = function(input) {
    this.score = input;
};

// add findOrCreate
scoreboardSchema.plugin(findOrCreate);

// create user
var Scoreboard = mongoose.model('scoreboard', scoreboardSchema);

module.exports = Scoreboard;