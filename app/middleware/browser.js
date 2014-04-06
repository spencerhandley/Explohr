var browserCheck = require('browser-check'),
	unsupportedBrowsers = require('nconf').get('app').unsupportedBrowsers,
	link = require('route-registry').link;

exports.redirect = function (req, res, next) {
	var unsupported = browserCheck(req.headers['user-agent'], unsupportedBrowsers),
		redirectUrl = link.browserUnsupported();

	if (unsupported && redirectUrl !== req.url) return res.redirect(redirectUrl);
	next();
};
