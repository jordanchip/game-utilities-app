// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

// Item schema
var ideaSchema = new Schema({
    title: String,
    text: String,
    index: String,
});

// ensure schemas use virtual IDs
itemSchema.set('toJSON', {
    virtuals: true
});

// add findorCreate
itemSchema.plugin(findOrCreate);

// create item
var Idea = mongoose.model('ideas', itemSchema);

module.exports = Idea;
