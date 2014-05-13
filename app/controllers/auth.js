var passport = require('passport'),
	async = require('async'),
	Account = require('../models/account'),
	RouteManager = require('express-shared-routes').RouteManager,
	routes = new RouteManager(),
	Company = require('../models/company');

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

routes.get( {re:'/auth/facebook', name:'facebooklogin'}, passport.authenticate('facebook', {scope: ['email', 'user_birthday']}));

routes.get({re:'/auth/facebook/callback'},
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });