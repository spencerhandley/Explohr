var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Video = new Schema({
	title: String,
	link: String,
	teacher: String,
	length: String,
	topic: String
});

var Course = new Schema({
	title: String,
	level: String,
	teacher: String,
	date: { type: Date, required: true, default: Date.now },
	overview: String,
	trip: String,
	topic: String,
	videos: [Video],
	promovid: String,
});


Course.plugin(passportLocalMongoose);

module.exports = mongoose.model('Course', Course);
