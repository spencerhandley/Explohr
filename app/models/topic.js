var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Topic = new Schema({
	name: String,
	description: String,
});

Topic.plugin(passportLocalMongoose);

module.exports = mongoose.model('Topic', Topic);
