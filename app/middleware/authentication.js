exports.ensureAuthenticated = function(req, res, next) {
console.log('Auth middleware is executing');

if (req.isAuthenticated() || req.path === '/' || req.path === '/register' || req.path === '/login') { return next(); }
	res.redirect('/')
}