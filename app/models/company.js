var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    jobListing = require("../models/job"),
    passportLocalMongoose = require('passport-local-mongoose');

var Company = new Schema({
	type: {type: String, default: "Company"},
	username: String,
	name: String,
	companyType: String,
	idealCandidate: String,
	companyDescription: String,
	staffSize: String,
	mainContact: String,
	email: String,
	phone: String,
	location: String,
	url: String,
	jobListings: [{type: Schema.Types.ObjectId, ref: 'jobListing'}],
	seasons: [String],
	housing: String,
	roomAndBoard: String, 
	perks: String,
	gettingHere: String, 
	applicationDetails: String,
	ageRequirement: String,
	dateCreated: { type: Date, default: Date.now }
});

Company.plugin(passportLocalMongoose);

module.exports = mongoose.model('Company', Company);