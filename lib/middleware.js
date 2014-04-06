var router = require('./router');

exports.csrf = function csrfMiddleware(req, res, next) {
	res.locals.token = req.csrfToken();
	next();
};

exports.requiresLogin = function requiresLogin(req, res, next) {
	if (req.session.account) return next();

	// TODO: flash messages
	req.session.redirectUrl = req.url;
	res.redirect(router.getLink('signin'));
};