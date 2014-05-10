var Course = require('../models/course'),
	RouteManager = require('express-shared-routes').RouteManager,
	routes = new RouteManager();


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


