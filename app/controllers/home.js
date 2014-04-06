var	Account = require('../models/account'),
	Course = require('../models/course'),
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
		var course = course
		res.render('course/course', {
			title: req.params.courseTitle,
			user: req.user,
			course: course
		});
	});
});

routes.get({name: 'video', re: '/video/:videoTitle-:videoId'}, function (req, res) {
	res.render('course/video', {
		title: req.params.videoTitle,
		user: req.user,
		video: req.params.videoId
	});
});

routes.get({name: 'trip', re: '/trip/:trip'}, function (req, res) {
	res.render('trip/trip', {
		title: 'Surfing in Pavones, Costa Rica',
		user: req.user
	});
});