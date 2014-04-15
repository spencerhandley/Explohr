var http = require('http'),
	app = require('./app'),
	config = require('nconf').get('server'),
	logger = require('winston');
	

http
	.createServer(app)
	.listen(config.port, function () {
		logger.info("Express server listening on port %d in %s mode", config.port, app.get('env'));
	});
