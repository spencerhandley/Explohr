var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Message = new Schema({
	sender: String,
	sentAt: { type: Date, default: Date.now },
	content: String
})

module.exports = mongoose.model('Message', Message);
