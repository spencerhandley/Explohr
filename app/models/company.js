var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var company = new Schema({
	name: String,
	companyType: String,
	idealCandidate: String,
	companyDescription: String,
	staffSize: String,
	maincontact: String,
	email: String,
	phone: String,
	location: String,
	url: String,
	jobPostings: String,
	seasons: [String],
	housing: String,
	roomAndBoard: String, 
	perks: String,
	gettingHere: String, 
	applicationDetails: String,
	ageRequirement: String,
	dateCreated: { type: Date, default: Date.now }
});

jobListing.plugin(passportLocalMongoose);

module.exports = mongoose.model('JobListing', jobListing);