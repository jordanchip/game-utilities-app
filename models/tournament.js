// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Mixed = Schema.Types.Mixed;
var findOrCreate = require('mongoose-findorcreate')

var User = require('./user.js');

// Item schema
var tournamentSchema = new Schema({
    user: {type: ObjectId, ref: 'users'},
    title: String,
    data: Mixed,
});

// ensure schemas use virtual IDs
tournamentSchema.set('toJSON', {
    virtuals: true
});

// add findorCreate
tournamentSchema.plugin(findOrCreate);

// create item
var Tournament = mongoose.model('tournament', tournamentSchema);

module.exports = Tournament;

