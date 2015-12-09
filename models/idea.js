// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

// Idea schema
var ideaSchema = new Schema({
    title: String,
    text: String,
    index: String,
});

// ensure schemas use virtual IDs
ideaSchema.set('toJSON', {
    virtuals: true
});

// add findorCreate
ideaSchema.plugin(findOrCreate);

// create i
var Idea = mongoose.model('ideas', ideaSchema);

module.exports = Idea;
