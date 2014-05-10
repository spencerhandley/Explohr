var Thread = require('../models/messages'),
	Message = require('../models/message'),
	moment = require('moment'),
	RouteManager = require('express-shared-routes').RouteManager,
	routes = new RouteManager();
routes.post({ name: 'sendMessage', re: '/user/messaging/:threadId'}, function (req, res) {
	var message = new Message ({
		sender: req.user._id,
		content: req.body.messageContent
	});
	Thread.findOne({_id: req.params.threadId}, function (err, thread){
		thread.messages.push(message)
		thread.save(function (err) {
			if (err) return (err);
			res.redirect(routes.getLink('messageThread', {threadId: req.params.threadId}));
		});
	})
})

routes.post({ name: 'initiateThread', re: '/user/messaging/:recieverId-:senderName-:senderId'}, function (req, res) {
	var firstMessage = new Message({
		sender: req.params.senderId,
		content: req.body.messageContent
	});

	firstMessage.save(function (err, message) {
		if(err) {
			console.log('error sending message');
			res.json(err);
		} else {
			var thread = new Thread({
				members: [req.params.senderId, req.params.recieverId],
				messages: [message],
				content: req.body.messageContent
			});
			thread.save(function (err, thread) {
				if(err) {
					console.log("couldn't save thread")
					res.json(err)
				} else {
					Thread.find({'members': req.user._id,}, function (err, threads) {
						res.render('messaging/messageDash', {
							user: req.user,
							sender: req.params.senderName,
							stream: thread,
							threads: threads
						});
					});
				}
			})
		}
	});
})

routes.get({name: "messageThread", re: '/user/messaging/:threadId'}, function (req, res) {
	Thread.find({"members": req.user._id}).populate('members').exec(function (err, threads) {
		Thread.findOne({_id: req.params.threadId}).populate('members').exec(function (err, thread){
			res.render('messaging/messageDash', {
				user: req.user,
				stream: thread,
				threads: threads,
				moment: moment,
				sender: thread.members[1]
			});
			res.locals.context.threadUrl = routes.getLink('messageThread', {
				name: thread._id,
			});
		});
	});
});

routes.get({name: "messageCenter", re: '/user/messaging'}, function (req, res) {
	Thread.find({'members': req.user._id,}).populate('members').exec(function (err, threads) {
		res.render('messaging/messageDash', {
			user: req.user,
			threads: threads,
			moment: moment
		});
	});
});

routes.get({ re: '/ajax/user/messaging/:threadId' }, function (req, res) {
	Thread.findOne({_id: req.params.threadId}, function (err, thread) {
		res.json('messaging/messageDash', {
			user: req.user,
			stream: thread,
			threads: ["hey", "heyyou"],
			moment: moment,
			messages: thread.messages
		});
	});
});