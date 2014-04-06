module.exports = function (req, res, next) {
	// This is a temporary stub layout
	// Use this to grab data for header / footer
	// and other content required by shell

	res.locals.layout = 'default'; //fake data for illustration

	next();
};
