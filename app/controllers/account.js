var passport = require('passport'),
	async = require('async'),
	Account = require('../models/account'),
	Course = require('../models/course'),
	RouteManager = require('express-shared-routes').RouteManager,
	thumbnailPluginLib = require('mongoose-thumbnail'),
	routes = new RouteManager();

routes.get({name: 'register', re: '/register'}, function (req, res){
	res.render('account/register', {
		title: 'Sign Up'
	});
});

routes.post({re:'/register'}, function(req, res) {
	Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
	    if (err) {
	        return res.render('account/register', { account : account });
	    }
	    passport.authenticate('local')(req, res, function () {
		    Account.findByIdAndUpdate( account._id, {
				$set: {
					general: req.body.general }
			}, function (err, person){
				if(err){
					res.json(err);
				} else if(person === null){
					res.json('no such user');
				} else{
					res.send(person);
					res.redirect('/');

				}
			});
		});
	});
});
function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}

routes.get( {re:'/auth/facebook', name:'facebooklogin'}, passport.authenticate('facebook'));

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
		account.classes.push(req.params.courseid);
		account.save(function (err) {
			if (err) return (err);
			console.log('Success!');
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
	res.redirect('/');
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
			console.log("success! :) ");
			console.log(course);
			res.redirect('catalog');
		}
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



routes.get({name:'dashboard', re: '/dashboard/:user'}, ensureAuthenticated, function (req, res){
	var locals = {};
	Account.findOne({_id: req.user._id}).populate('classes').exec(function (err, account) {
		console.log(account);
		console.log(account.classes);
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

routes.get({name:'userprofile', re: '/user/:user'}, function (req, res){
	Account.findOne({_id: req.params.user}).populate('classes').exec(function (err, account) {

		res.render('account/userprofile', {
			user: account
		});
	});
});
