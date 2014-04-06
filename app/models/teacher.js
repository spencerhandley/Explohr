var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Teacher = new Schema({
	firstname: String,
	lastname: String,
	email: String,
	shortbio: String,
	longbio: String,
	info: {
		records: [],
		quote: String,
	}
	courses:[],
	trips[],
	photo: String,
	phone: String,
	title: String,
	books: [
	{title: String, link: String}
		],
	promovid: String
});

Teacher.plugin(passportLocalMongoose);

module.exports = mongoose.model('Teacher', Teacher);
