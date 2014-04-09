var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var traditionalEdu = new Schema({
	institution: String,
	degree: String,
	start: {type: Date},
	end: {type: Date}
});

var outdoorCoursework = new Schema({
	institution: String,
	course: String,
	duration: String,
	yearsAttended: {type: Date},
	skills: String,
	other: String
});

var certification = new Schema({
	institution: String,
	certificate: String,
	acquired: {type: Date},
	expires: {type: Date}
});

var teachingExperience = new Schema({
	kind: {type: String, default: "Expiditionary"},
	organization: String,
	jobTitle: String,
	location: String,
	start: {type: Date},
	end: {type: Date},
	current: Boolean,
	description: String
});

var guidingCompany = new Schema({
	organization: String,
	jobTitle: String,
	location: String,
	start: {type: Date},
	end: {type: Date},
	current: Boolean, 
	description: String
});

var tripGuided = new Schema({
	organization: String,
	location: String, 
	numOfClients: Number,
	start: {type: Date},
	end: {type: Date},
	ages: String,
	gender: String,
	description: String
});

var sponsor = new Schema({
	organization: String,
	sport: String,
	start: {type: Date},
	end: {type: Date},
	current: Boolean
});

var climbRoute = new Schema({
	location: String, 
	route: String,
	grade: String, 
	pitches: Number,
	date: {type: Date},
	climbType: String,
	leadFollow: String
});

var rockClimbing = new Schema({
	notableRoutes: [climbRoute]
});

var Account = new Schema({
	oauthID: Number,
	created: Date,
	name: String,
	general: {
		firstname: String,
		lastname: String,
		IamA: {type: String, default: "Enthusiast"},
		educator: Boolean,
		guide: Boolean,
		athlete: Boolean,
		username: String,
		email: String,
		hometown: [],
		occupation: String,
		aboutMe: String,
		age: Number,
		photo: String,
		friends: [{type: Schema.Types.ObjectId, ref: "Account"}]
	},
	education: [],
	sportsList:  {type: Schema.Types.Mixed, default: "String"},
	classes: [{type: Schema.Types.ObjectId, ref: 'Course'}],
	sports: {
		rockClimbing: {
			notableRoutes: [climbRoute]
		}
	},
	professional: {
		education: {
			traditional: [traditionalEdu],
			outdoor: [outdoorCoursework]
		},
		certs: [certification],
		teaching: {
			experience: [teachingExperience],
			additional: String
		},
		guiding: {
			companies: [guidingCompany],
			guided: [tripGuided],
			additional: String
		},
		sponsors: [sponsor],
	}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
