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
	middleware = require('../middleware'),
	routes = new RouteManager();

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

routes.get({name: 'login', re: '/login'}, function (req, res){
	res.render('account/login', {
		title: 'Log In',
		user: req.user
	});
});

routes.get({name: 'addToMyList', re: '/course/:user/:courseid/addCourse'} , function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		//TODO handle duplicates
		account.classes.push(req.params.courseid);
		account.save(function (err) {
			if (err) return (err);

			res.redirect('catalog');
		});

	});
});

routes.get({name: 'removeFromMyList', re: '/course/:user/:courseid/deleteCourse'} ,function (req, res) {
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

routes.get({name: 'deleteClimb', re: '/user/:climbId/deleteClimb'}, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if (err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var climb;
			account.sports.rockClimbing.notableRoutes.forEach(function (c){
				if(c._id === req.params.climbId) {
					climb = c;
				}
			})

			var idx = account.sports.rockClimbing.notableRoutes ? account.sports.rockClimbing.notableRoutes.indexOf(climb) : -1;
			console.log(climb)
			if (idx !== -1) {
				account.sports.rockClimbing.notableRoutes.splice(idx, 1);
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


routes.get({name: 'edit', re: '/user/:user/edit'}, function (req, res){
	Account.findOne({_id: req.user._id}, function (err, account){
		res.render('account/editprofile', {
			title: 'Edit Profile',
			account: account,
			user: req.user
		});
	});
});


routes.get({name:'dashboard', re: '/dashboard/:user'}, function (req, res){
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

routes.get({name:'userprofile', re: '/user/:user'}, function (req, res){
	Account.findOne({_id: req.params.user}).populate('classes').exec(function (err, account) {
		res.render('account/userprofile', {
			profileUser: account,
			user: req.user,
			moment: moment
		});
	});
});

routes.post({name: 'deleteTradEdu', re: '/company/:user/trad/:tradEduId/delete'}, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if(err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var findEdu = function(source) {
				var sourceIdx = 0;
				for (var i = 0; i<source.education.length; i++) {
					sourceIdx++
					if (source.education[i]._id == req.params.tradEduId) {
						break;
					}
				}
				return sourceIdx

			}
			var edu = (findEdu(account) - 1);
			var idx = account.education ? edu : -1 ;
			if (idx !== -1) {
				account.education.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						res.send(records)
					}
				});
				return
			}
		}
		res.send(null, 404);
	})
})

routes.post({name: 'deleteCert', re: '/company/:user/cert/:expId/delete'}, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if(err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var findEdu = function(source) {
				var sourceIdx = 0;
				for (var i = 0; i<source.professional.certs.length; i++) {
					sourceIdx++
					if (source.professional.certs[i]._id == req.params.expId) {
						break;
					}
				}
				return sourceIdx

			}
			var edu = (findEdu(account) - 1);
			var idx = account.professional.certs ? edu : -1 ;
			if (idx !== -1) {
				account.professional.certs.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						res.send(records)
					}
				});
				return
			}
		}
		res.send(null, 404);
	})
})
routes.post({name: 'deleteExperience', re: '/company/:user/exp/:expId/delete'}, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if(err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var findEdu = function(source) {
				var sourceIdx = 0;
				for (var i = 0; i<source.professional.experience.length; i++) {
					sourceIdx++
					if (source.professional.experience[i]._id == req.params.expId) {
						break;
					}
				}
				return sourceIdx

			}
			var edu = (findEdu(account) - 1);
			var idx = account.professional.experience ? edu : -1 ;
			if (idx !== -1) {
				account.professional.experience.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						res.send(records)
					}
				});
				return
			}
		}
		res.send(null, 404);
	})
})

routes.post({name: 'deleteSponsor', re: '/company/:user/spon/:expId/delete'}, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if(err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var findEdu = function(source) {
				var sourceIdx = 0;
				for (var i = 0; i<source.professional.sponsors.length; i++) {
					sourceIdx++
					if (source.professional.sponsors[i]._id == req.params.expId) {
						break;
					}
				}
				return sourceIdx

			}
			var edu = (findEdu(account) - 1);
			var idx = account.professional.sponsors ? edu : -1 ;
			if (idx !== -1) {
				account.professional.sponsors.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						res.send(records)
					}
				});
				return
			}
		}
		res.send(null, 404);
	})
})

routes.post({name: 'deleteOutdoor', re: '/company/:user/outdoor/:expId/delete'}, function (req, res) {
	Account.findOne({ _id: req.user._id}, function (err, account) {
		if(err) {
			res.send(null, 500)
		} else if (account) {
			var records = {'records': account};
			var findEdu = function(source) {
				var sourceIdx = 0;
				for (var i = 0; i<source.professional.education.outdoor.length; i++) {
					sourceIdx++
					if (source.professional.education.outdoor[i]._id == req.params.expId) {
						break;
					}
				}
				return sourceIdx

			}
			var edu = (findEdu(account) - 1);
			var idx = account.professional.education.outdoor ? edu : -1 ;
			if (idx !== -1) {
				account.professional.education.outdoor.splice(idx, 1);
				account.save(function(err) {
					if (err) {
						console.log(err);
					} else {
						res.send(records)
					}
				});
				return
			}
		}
		res.send(null, 404);
	})
})


