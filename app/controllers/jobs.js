var Account = require('../models/account'),
	moment = require('moment'),
	Job = require('../models/job'),
	RouteManager = require('express-shared-routes').RouteManager,
	thumbnailPluginLib = require('mongoose-thumbnail'),
	routes = new RouteManager();

routes.get({name: 'newJob',  re: '/jobs/newjob'}, function (req, res){
	res.render('jobs/newjob', {
		title: "New Job",
		user: req.user
	});
});
routes.post({ name: 'newJob', re: '/jobs/newjob'}, function (req, res) {
	var job = new Job(req.body.j);
	job.save(function (err){
		if(err){
			res.json(err);
		} else {
			res.render('jobs/jobListing', {
				job: job,
				user: req.user,
				moment: moment
			});
		};
	});
});

routes.get({name: 'jobListing',  re: '/jobs/:jobId'}, function (req, res){
	Job.findOne({_id: req.params.jobId}, function (err, job) {
		res.render('jobs/jobListing', {
			moment: moment,
			job: job,
			user: req.user
		});
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
	Job.remove({_id: req.params.jobId}, function (err) {
		if (err) throw err
		res.redirect('editJobs');
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