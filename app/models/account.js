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
	kind: String,
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
	date: {type: Date}
});

var rockClimbing = new Schema({
	notableRoutes: [climbRoute]
});

var sport = new Schema({
	sportName: String
})
var Account = new Schema({
	general: {
		firstname: String,
		lastname: String,
		IamA: String,
		educator: Boolean,
		guide: Boolean,
		athlete: Boolean,
		email: String,
		hometown: String,
		occupation: String,
		aboutMe: String,
		age: Number,
		photo: String,
		friends: [{type: Schema.Types.ObjectId, ref: "Account"}]
	},
	sportsList: [sport],
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
