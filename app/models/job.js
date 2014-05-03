var mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var jobListing = new Schema({
	organization: String,
	listing: String,
	description: String,
	idealCandidate: String, 
	seasons: [String],
	housing: String,
	ageRequirement: String,
	location: String,
	perks: String,
	jobs: String,
	dateCreated: { type: Date, default: Date.now },
	applicants: [String],
	applicationDetails: String,
	questionaire: [String],
	compensation: String
});

jobListing.plugin(passportLocalMongoose);

module.exports = mongoose.model('jobListing', jobListing);