var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Concentration = new Schema ({
	name: String
})
var traditionalEdu = new Schema({
	school: {name: String},
	type: String,
	concentration: [Concentration],
	year: {name: String}
});


var outdoorCoursework = new Schema({
	institution: String,
	course: String,
	duration: String,
	yearsAttended: String,
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
	kind: {type: String, default: "Expeditionary"},
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
	role: String,
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

var mountaineering = new Schema({
	mountain: String,
	route: String,
	difficulty: String,
	skills: String,
	description: String,
	date: {type: Date},
	guided: String, 
	summited: String
});

var run = new Schema({
	river: String,
	run: String,
	difficulty: String,
	craft: String,
	role: String,
	date: {type: Date},
	guided: String
});

var race = new Schema({
	race: String, 
	location: String, 
	type: String, 
	totalTime: String,
	place: String,
	date: {type: Date},
	mtnRd: String
})

var company = new Schema({
	company: String,
	position: String,
	courseArea: String,
	start: String,
	end: String,
	current: String,
	location: String,
	description: String
});
//var conc = new Schema({
//	name: String
//})
//
//var school = new Schema({
//	school: {
//		name: String, 
//		concentration: {},
//		type: String
//	}
//})

var rockClimbing = new Schema({
	notableRoutes: [climbRoute]
});

var Account = new Schema({
	oauthID: Number,
	type: {type: String, default: "Account"},
	created: Date,
	name: String,
	applications: [String],
	general: {
		specialities: String,
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
		fieldDays: String,
		photo: String,
		onboarded: {type: Boolean, default: false},
		friends: [{type: Schema.Types.ObjectId, ref: "Account"}]
	},
	education: [traditionalEdu],
	sportsList:  {type: Schema.Types.Mixed, default: {placehold: "ho"}, required: true
	},
	classes: [{type: Schema.Types.ObjectId, ref: 'Course'}],
	sports: {
		rockClimbing: {
			notableRoutes: [climbRoute]
		},
		mountaineering: {
			routes: [mountaineering]
		},
		river: {
			runs: [run]
		},
		cycling: {
			races: [race]
		}
	},
	professional: {
		education: {
			outdoor: [outdoorCoursework]
		},
		experience: [{type: Schema.Types.Mixed, default: {placehold: "ho"}, required: true
	}],
		certs: [certification],
		// teaching: {
			// experience: [teachingExperience],
			// additional: String
		// },
		// guiding: {
			// companies: [guidingCompany],
		// 	guided: [tripGuided],
		// 	additional: String
		// },
		sponsors: [sponsor],
	}
});


module.exports = mongoose.model('Account', Account);
