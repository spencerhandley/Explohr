var Company = require('../models/company'),
	Job = require('../models/job'),
	moment = require('moment'),
	RouteManager = require('express-shared-routes').RouteManager,
	routes = new RouteManager(),
	middleware = require('../middleware');

routes.get({name: 'companyEdit', re: '/company/:companyId/edit'},  function (req, res){
	Company.findOne({_id: req.params.companyId}, function (err, account){
		res.render('account/companyEditProfile', {
			title: 'Edit Profile',
			company: account,
			user: req.user
		});
	});
});

routes.get({name: 'companyDashboard', re: '/company/:companyId/dashboard'},  function (req, res){
	Company.findOne({_id: req.params.companyId}).populate('jobListings').exec(function (err, company){
		var jobListings = company.jobListings;

		function findApplicants(jobListings, callback) {
			var jobListingsArray = []
			,   count = 0;
			for (var i = jobListings.length; i > 0; i--) {
				Job.findOne({_id: jobListings[i-1]._id}).populate('applicants').exec(function (err,job) {
					var jobId = job._id
					,   jobApplicants = job.applicants;

					jobListingsArray[jobId] = jobApplicants;
					count++;
					if (count === jobListings.length) {
						callback(jobListingsArray);
					}
				})

			}
		}
		findApplicants(jobListings,function (popListing) {
			var returnedListing = popListing;
			res.render('account/companydashboard', {
				title: 'Company Dashboard',
				company: company,
				moment: moment,
				user: req.user,
				jobListingsArray: jobListings,
				listings: returnedListing
			});
		})
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