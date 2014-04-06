var methods = ['all', 'get', 'post', 'put', 'delete'],
	errors = {
		DUPLICATE_ROUTE: 'Route with name "%s" exists'
	},
	link = {},
	registry = {},
	routes = [],
	defaultMiddleware = [];

function use(fn) {
	defaultMiddleware.push(fn);
}

function getLink(name, params) {
	var	path = registry[name];

	if (!path) return;

	if (params) {
		Object.keys(params).forEach(function (key) {
			path = path.replace(':' + key, params[key].replace(/\s+/g, '-'));
		});
	}

	return path.replace(' ', '-');
}

function register(path, name) {
	if (registry[name]) throw new Error(errors.DUPLICATE_ROUTE.replace('%s', name));

	registry[name] = path;
	link[name] = function (params) {
		return getLink(name, params);
	};
}

function applyRoutes(app) {
	routes.forEach(function (route) {
		var method = route.shift(),
			path = route.shift(),
			properties = route.length > 1 && 'function' !== typeof route[0] ? route.shift() : null,
			middleware = [];

		if (properties) {
			properties = 'object' === typeof properties ? properties : { name: properties };
			register(path, properties.name);
			middleware.push(function (req, res, next) {
				res.locals.route = properties;
				for (var property in properties) {
					if (!req.route[property]) req.route[property] = properties[property];
				}
				next();
			});
		}

		if (defaultMiddleware) middleware = middleware.concat(defaultMiddleware);
		middleware = middleware.concat(route);

		app[method].apply(app, [path].concat(middleware));
	});
}

exports = {
	applyRoutes: applyRoutes,
	link: link,
	methods: methods,
	register: register,
	registry: registry,
	use: use
};

methods.forEach(function (method) {
	exports[method] = function () {
		var args = [method].concat(Array.prototype.slice.call(arguments));
		routes.push(args);
	};
});

module.exports = exports;
