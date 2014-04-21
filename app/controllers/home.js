var	Account = require('../models/account'),
	Course = require('../models/course'),
	Video = require('../models/course'),
	RouteManager = require('express-shared-routes').RouteManager,
	routes = new RouteManager();

routes.get({name: 'home', re: '/'}, function(req, res) {
	res.render('home/index', {
		title: 'Explohr - Online Adventure Education',
		user: req.user
	});
});

routes.get({name: 'catalog', re: '/catalog'}, function (req, res) {
	Course.find({}, function (err, courses) {
		if(err) return (err);
		var courseList = {};
		courses.forEach(function(course) {
			courseList[course._id] = course;
		});
		res.render('course/catalog', {
				title: "Course Catalog",
				user: req.user,
				courses: courseList
		});
	});
});

routes.get({name: 'course', re: '/course/:courseid-:courseTitle'}, function (req, res) {
	Course.findOne({_id: req.params.courseid}, function (err, course) {
		if(err) return(err);
		res.render('course/course', {
			title: req.params.courseTitle,
			user: req.user,
			course: course
		});
	});
});

routes.get({name: 'video', re: '/video/:courseId-:videoId'}, function (req, res) {
	Course.findOne({_id: req.params.courseId}, function (err, course) {
		console.log(course.videos[0]._id)
		console.log(req.params.videoId)
		var currentVideo = {}
		for(i=0; i<course.videos.length; i++){
			if(course.videos[i]._id == req.params.videoId) {
				currentVideo = course.videos[i];
				console.log(currentVideo)
			}
		}
		res.render('course/video', {
			user: req.user,
			course: course,
			video: currentVideo
		});
	});
});

routes.get({name: 'trip', re: '/trip/:trip'}, function (req, res) {
	res.render('trip/trip', {
		title: 'Surfing in Pavones, Costa Rica',
		user: req.user
	});
});