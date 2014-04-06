/*
	Loggers are defined in config/logger.json with the following supported formats:
	"Console": true // add Console transport with default settings
	"Console": { "foo": "bar" } // add Console transport passing in settings
	"Console": [{ "foo": "bar" }, { "foo": "bar" }] // Create multiple Console transports passing in settings for each
*/

var winston = require('winston'),
	config = require('nconf').get('logger');

winston.remove(winston.transports.Console);

Object.keys(config).forEach(function (transport) {
	var options = config[transport];

	if ("boolean" === typeof options) {
		return winston.add(winston.transports[transport]);
	} else if (!Array.isArray(options)) {
		winston.add(winston.transports[transport], options);
	} else {
		options.forEach(function (transportOptions) {
			winston.add(winston.transports[transport], transportOptions);
		});
	}
});
