var Company = require('../models/company'),
	Job = require('../models/job'),
	moment = require('moment'),
	RouteManager = require('express-shared-routes').RouteManager,
	routes = new RouteManager(),
	middleware = require('../middleware');

routes.get({name: 'companyEdit', re: '/company/:user/edit'},  function (req, res){
	Company.findOne({_id: req.user._id}, function (err, account){
		res.render('account/companyEditProfile', {
			title: 'Edit Profile',
			company: account,
			user: req.user
		});
	});
});

routes.get({name: 'companyDashboard', re: '/company/:companyId/dashboard'},  function (req, res){
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