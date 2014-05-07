var passport = require('passport'),
	async = require('async'),
	Account = require('../models/account'),
	Company = require('../models/company'),
	Job = require('../models/job'),
	Course = require('../models/course'),
	Thread = require('../models/messages'),
	Message = require('../models/message'),
	moment = require('moment'),
	RouteManager = require('express-shared-routes').RouteManager,
	thumbnailPluginLib = require('mongoose-thumbnail'),
	routes = new RouteManager();

routes.get({name: 'register', re: '/register'}, function (req, res){
	res.render('account/register', {
		title: 'Sign Up'
	});
});

routes.post({re:'/register'}, function(req, res) {
	Company.register(new Company({ username : req.body.username, name: req.body.organizationName }), req.body.password, function(err, account) {
	    if (err) {
	        return res.render('account/register');
	    }
	    passport.authenticate('local')(req, res, function () {
		    Company.findByIdAndUpdate( account._id, {
				$set: {
					email: req.body.username }
			}, function (err, person){
				if(err){
					res.json(err);
				} else if(person === null){
					res.json('no such user');
				} else{
					res.send(person);
					res.redirect('/company/' + req.user._id + '/edit');
				}
			});
		});
	});
});

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}

routes.get( {re:'/auth/facebook', name:'facebooklogin'}, passport.authenticate('facebook', {scope: ['email', 'user_birthday']}));

routes.get({re:'/auth/facebook/callback'},
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

routes.post({name: 'editProfile', re: '/user/:user/edit'}, function (req, res){
	Account.findByIdAndUpdate( req.user.id , {
		$set: {
			general: req.body.general,
			sports: req.body.sports,
			sportsList: req.body.sportsList,
			education: req.body.education,
			professional: req.body.professional}

	}, function (err, person){
		if(err){
			res.json(err);
		} else if(person === null){
			res.json('no such user');
		} else{
			res.send(person);
			res.redirect('/user/' + req.user._id);
		}
	});
});


routes.get({name: 'setup', re: '/user/:user/setup'}, function (req, res){
	res.render('account/setup', {
		title: 'Setup Profile',
		user: req.user
	});
});

routes.get({name: 'login', re: '/login'}, function (req, res){
	res.render('account/login', {
		title: 'Log In',
		user: req.user
	});
});

routes.get({name: 'addToMyList', re: '/course/:user/:courseid/addCourse'}, ensureAuthenticated , function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		//TODO handle duplicates
		account.classes.push(req.params.courseid);
		account.save(function (err) {
			if (err) return (err);

			res.redirect('catalog');
		});

	});
});
routes.get({name: 'removeFromMyList', re: '/course/:user/:courseid/deleteCourse'}, ensureAuthenticated ,function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if (err) {
			res.send(null, 500);
		} else if (account) {
			var records = {'records': account};
			var idx = account.classes ? account.classes.indexOf(req.params.courseid) : -1;
			if (idx !== -1) {
				account.classes.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
						res.send(null, 500);
					} else {
						res.send(records);
						res.redirect('dashboard');
					}
				});
				return;
			}
		}
        res.send(null, 404);
	});
});


routes.get({name: 'deteteClimb', re: '/course/:user/:courseid/deleteCourse'}, ensureAuthenticated, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if (err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var idx = account.classes ? account.classes.indexOf(req.params.courseid) : -1;
			if (idx !== -1) {
				account.classes.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
						res.send(null, 500);
					} else {
						res.send(records);
						res.redirect('dashboard');
					};
				});
				return;
			}
		}
        res.send(null, 404);
	});
});



routes.post({name: 'login', re: '/login'}, passport.authenticate('local'), function (req, res){
	res.redirect('/company/' + req.user._id + '/dashboard');
});

routes.get({ name: 'logout', re: '/logout' }, function (req, res) {
	req.logout();
	res.redirect('/');
});

routes.get({ name: 'newcourse', re: '/newcourse' }, function (req, res){
	res.render('admin/newcourse', {
		title: 'New Course',
		user: req.user
	});
});

routes.post({ name: 'newcourse', re: '/newcourse'}, function (req,res){
	var course = new Course(req.body.c);
	course.videos.push(new Video());
	course.save(function (err){
		if(err){
			res.json(err);
		}else{
			res.redirect('catalog');
		}
	});
});

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


routes.get({name: 'edit', re: '/user/:user/edit'}, ensureAuthenticated, function (req, res){
	Account.findOne({_id: req.user._id}, function (err, account){
		res.render('account/editprofile', {
			title: 'Edit Profile',
			account: account,
			user: req.user
		});
	});
});
routes.get({name: 'companyEdit', re: '/company/:user/edit'}, ensureAuthenticated, function (req, res){
	Company.findOne({_id: req.user._id}, function (err, account){
		res.render('account/companyEditProfile', {
			title: 'Edit Profile',
			company: account,
			user: req.user
		});
	});
});
routes.get({name: 'companyDashboard', re: '/company/:companyId/dashboard'}, ensureAuthenticated, function (req, res){
	Company.findOne({_id: req.params.companyId}).populate('jobListings').exec(function (err, company){
		Job.populate(company.jobListings, {path: 'applicants'}, function(err, data){
			res.render('account/companydashboard', {
				title: 'Company Dashboard',
				company: company,
				moment: moment,
				user: req.user
			});
		});
	});
});


routes.get({name:'dashboard', re: '/dashboard/:user'}, ensureAuthenticated, function (req, res){
	var locals = {};
	Account.findOne({_id: req.user._id}).populate('classes').exec(function (err, account) {
		res.render('account/userdashboard', {
			user: account
		});
	});
});



routes.get({name:'teacherprofile', re: '/teacher/:user'}, function (req, res){
	res.render('account/teacherprofile', {
		title: 'Professor',
		user: req.user
	});
});

routes.get({name:'people', re: '/users/list'}, function (req, res){
	Account.find({}, function (err, users) {
		var userMap = {};
		users.forEach(function(user){
			userMap[user._id] = user;
		})
		res.render('home/people', {
			users: userMap,
			user:req.user
		});
	});
});
routes.get({name:'jobListings', re: '/jobs/listings'}, function (req, res){
	res.render('jobs/listings', {
		user:req.user
	});
});

routes.get({name:'userprofile', re: '/user/:user'}, function (req, res){
	Account.findOne({_id: req.params.user}).populate('classes').exec(function (err, account) {
		res.render('account/userprofile', {
			profileUser: account,
			user: req.user,
			moment: moment
		});
	});
});

routes.get({name:'companyProfile', re: '/company/:companyId'}, function (req, res){
	Company.findOne({_id: req.params.companyId}).populate('jobListings').exec(function (err, company) {
		res.render('account/companyprofile', {
			profileCompany: company,
			user: req.user,
			moment: moment
		});
	});
});

routes.post({name: 'editCompanyProfile', re: '/company/:user/edit'}, function (req, res){
	Company.findByIdAndUpdate( req.user._id , {
		$set: {name: req.body.name,
			staffSize: req.body.staffSize,
			mainContact: req.body.mainContact,
			email: req.body.email, 
			phone: req.body.phone,
			location: req.body.location,
			url: req.body.url,
			housing: req.body.housing, 
			roomAndBoard: req.body.roomAndBoard,
			perks: req.body.perks,
			ageRequirement: req.body.ageRequirement,
			gettingHere: req.body.gettingHere
		}

	}, function (err, company){
		if(err){
			res.json(err);
		} else if(company === null){
			res.json('no such user');
		} else{
			res.send(company);
			res.redirect('/company/' + req.user._id);
		}
	});
});
