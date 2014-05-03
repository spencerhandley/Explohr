var Account = require('../models/account'),
	Company = require('../models/company'),
	moment = require('moment'),
	Job = require('../models/job'),
	RouteManager = require('express-shared-routes').RouteManager,
	thumbnailPluginLib = require('mongoose-thumbnail'),
	routes = new RouteManager();

routes.get({name: 'newJobPage',  re: '/jobs/listings/newjob'}, function (req, res){
	res.render('jobs/newjob', {
		title: "New Job",
		user: req.user
	});
});
routes.post({ name: 'newJob', re: '/jobs/newjob'}, function (req, res) {
	var job = new Job(req.body.j);
	job.organization = req.user._id
	job.save(function (err){
		if(err){
			res.json(err);
		} else {
			console.log(req.user._id)
			Company.findById( req.user._id , function (err, company){
				console.log(company)
				company.jobPostings.push(job)
				company.save(function(err) {
					if(err){
						res.json(err);
					} else if(company === null){
						res.json('no such company');
					} else{
						res.render('jobs/jobListing', {
							job: job,
							user: req.user,
							moment: moment
						});
					}
				})
			});	
		};
	});
});

routes.get({name: 'jobListing',  re: '/jobs/:jobId'}, function (req, res){
	Job.findOne({_id: req.params.jobId}, function (err, job) {
		Company.findOne({_id: job.organization}, function (err, company) {
			res.render('jobs/jobListing', {
				moment: moment,
				company: company,
				job: job,
				user: req.user
			});
		})
	});
});

routes.get({ name: 'editJobs', re: '/editjobs' }, function (req, res){
	Job.find({}, function (err, jobs){
		var jobMap = {};
		jobs.forEach(function(job){
			jobMap[job._id] = job;
		})
		res.render('jobs/editJobListings', {
			user: req.user,
			jobs: jobMap
		});
	});
});

routes.get({name: 'deleteJob', re: '/jobs/:jobId/delete'}, function (req, res) {
	Company.findOne({_id: req.user._id}, function(err, company) {
		var jobs = company.jobPostings
		var index = jobs.indexOf(req.params.jobId)
		jobs.splice(index, 1)
		company.jobListings.remove(req.params.jobId)
		company.save()
		Job.remove({_id: req.params.jobId}, function (err) {
			if (err) throw err
			res.redirect('editJobs');
		})
		
	})
	
})

routes.get({name: 'apply', re: '/jobs/:jobId/apply'}, function (req, res) {
	Job.findOne({_id: req.params.jobId}, function (err, job) {
		// TODO: Handle Duplicates
		job.applicants.push(req.user._id);
		job.save(function (err) {
			if (err) return (err);
			Account.findOne({_id: req.user._id}, function (err, account) {
				account.applications.push(req.params.jobId);
				account.save(function (err) {
					if (err) return (err);
					res.redirect('jobListings');

				});
			});
		});
	});
});


routes.get({name: 'jobListings',  re: '/jobListings'}, function (req, res){
	Job.find({}, function (err, jobs) {
		var jobMap = {};
		jobs.forEach(function(job){
			jobMap[job._id] = job;
		});
		res.render('jobs/alljobs', {
			jobs: jobMap,
			user: req.user
		});
	});	
});