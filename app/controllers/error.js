var logger = require('winston');

exports['404'] = {
	handler: function (req, res) {
		logger.log('error', 404, {
			req: {
				headers: req.headers,
				method: req.method,
				url: req.url
			}
		});

		res
			.status(404)
			.format({
				html: function () {
					res.render('404', { url: req.url });
				},
				json: function () {
					res.send({ error: 'Not found' });
				}
			});
	}
};

exports['500'] = {
	handler: function (err, req, res, next) {
		try {
			res.render('500');
		} catch (e) {
			logger.log('error', e);
			next(err);
		}
	}
};
