var layouts = {
	default: require('./default')
};

module.exports = function (req, res, next) {
	var layout = req.route.layout || 'default';

	if ('none' === layout) return next();

	layouts[layout](req, res, next);
};
