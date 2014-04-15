var join = require('path').join,
	root = join(__dirname, '..');

// Configure nConf
require(join(root, 'config'));

// Configure winston
require(join(root, 'lib/logger'));

var _ = require('underscore'),
	path = require('path'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	mailer = require('mailer'),
	LocalStrategy = require('passport-local').Strategy,
	join = require('path').join,
	root = join(__dirname, '..'),
	swig = require('swig'),
	cookies = require('cookies'),
	express = require('express'),
	expstate = require('express-state'),
	app = express(),
	config = require('nconf').get(),
	controllers = require('./controllers'),
	middleware = require('./middleware'),
	logger = require('winston'),
	router = require(join(root, 'lib/router')),
	mongo = require('mongodb');
// Express-State configuration
expstate.extend(app);
app.set('state namespace', 'App.context');

// Swig configuration
swig.setDefaults({ cache: false });

// Route configuration
//_.each(config.routes, function (route, name) {
//	var path = route.path;
//
//TODO: Implement redirect
// if (route.redirect) return router.redirect(path, route.redirect);
//
//	Object.keys(route).filter(function (key) {
//		return _.contains(router.methods, key);
//	}).forEach(function (httpMethod) {
//		var action = route[httpMethod].split('.'),
//			controller = action[0],
//			method = action[1],
//			obj = controllers[controller][method],
//			middleware = obj.middleware || [];
//
//		middleware.push(obj.handler);
//
//		router[httpMethod].call(router, path, _.extend(obj, { name: name }), middleware);
//	});
//});

// Application configuration
app.engine('html', swig.renderFile);
app.set('view engine', 'jade');
app.set('views', join(root, 'app/views'));
app.use(express.compress());
app.use(express.responseTime());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.logger({ format: 'dev', stream: { write: function (message) {
	logger.info(message.slice(0, -1));
}}}));

app.use(function (req, res, next) {
	// expose current user data to view
	res.locals.currentUser = req.session.account;

	// expose context object (exposed to client in layout)
	res.locals.context = {
	//	token: req.csrfToken()
	};

	next();
});

app.use(app.router);
//app.use(middleware.browser.redirect);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookies.express());
//app.use(middleware.layout);

//app.use(express.static(join(__dirname, 'assets')));
if ("development" === app.get('env')) app.use(express.static(join(__dirname, 'assets')));

// passport config
var Account = require('./models/account');
FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(Account.authenticate()));

passport.use(new FacebookStrategy({
    clientID: '483379851763044',
    clientSecret: 'b9ac905f62ceafd74cb218ea9d71bd95',
    callbackURL: config.config.callbackUrl
  },
	function(accessToken, refreshToken, profile, done) {
		console.log(profile)
		console.log(profile._json.education)
		Account.findOne({ oauthID: profile.id }, function(err, user) {
			if(err) { console.log(err); }
			if (!err && user != null) {
				done(null, user);
			} else {
				var user = new Account({
					oauthID: profile.id,
					name: profile.displayName,
					created: Date.now(),
					general: {
						firstname: profile.first_name,
						lastname: profile.last_name,
						hometown: profile._json.location.name,
						username: profile.username,
					},	
					education: profile._json.education
				});
				user.save(function(err) {
					if(err) {
				 		console.log(err);
					} else {
						console.log("saving user ...");
						done(null, user);
					};
				});
			};
		});
	}
));
// serialize and deserialize
passport.serializeUser(function(user, done) {
 console.log('serializeUser: ' + user._id)
 done(null, user._id);
});
passport.deserializeUser(function(id, done) {
 Account.findById(id, function(err, user){
     console.log(user)
     if(!err) done(null, user);
     else done(err, null)
 })
});
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());

// mongoose

mongoose.connect('mongodb://localhost/passport_local_mongoose');

// Todo: Make .tmp into .tmp/assets
if ("development" === app.get('env')) app.use(express.static(join(root, '.tmp')));

//config db
// 404 Middleware
app.use(controllers.error['404'].handler);

// Error handling middlewares
app.use(function (err, req, res, next) {
	logger.log('error', (err.message || 500), {
		req: {
			headers: req.headers,
			method: req.method,
			url: req.url
		},
		stack: err.stack
	});

	next(err);
});

if ('production' === app.get('env')) {
	app.use(controllers.error['500'].handler);
} else {
	app.use(express.errorHandler());
}

// Register routes with application
router.applyRoutes(app);

// Application local variables
app.locals.router = router;
app.locals.basedir = app.get('views');
app.locals.router = router;

// Expose app data to client
app.expose({
	_routes: router.registry
}, { cache: true });

module.exports = app;