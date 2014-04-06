var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Trip = new Schema({
	title: String,
	teacherid: String,
	date: { startdate: String, enddate: String },
	info: {
		destination: String,
		details: String,
		knownfor: String,
		availablespots: String,
		includes: [],
		dealine: String,
	}
	topicid: String,
	attendees:[],
	promovid: String
});

Trip.plugin(passportLocalMongoose);

module.exports = mongoose.model('Trip', Trip);
