var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Message = new Schema({
	sender: String,
	sentAt: { type: Date, default: Date.now },
	content: String
})

var Thread = new Schema({
	members: [{type: Schema.Types.ObjectId, ref: "Account"}],
	messages: [Message]
})


module.exports = mongoose.model('Thread', Thread);

