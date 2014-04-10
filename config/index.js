var _ = require('underscore'),
	fs = require('fs'),
	path = require('path'),
	nconf = require('nconf'),
	defaults = {
		NODE_ENV: 'production'
	};

nconf
	.use('memory')
	.argv()
	.env();

fs.readdirSync(__dirname).forEach(function (fileName) {
	if (".json" !== path.extname(fileName)) return;

	var basename = path.basename(fileName, ".json"),
		settings = require(path.join(__dirname, fileName)),
		defaultSettings = settings.all;

	settings = settings[nconf.get('NODE_ENV') || 'production'];

	if (defaultSettings) settings = _.extend(defaultSettings, settings || {});

	defaults[basename] = settings;
});

nconf.defaults(defaults);
