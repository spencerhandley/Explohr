var App = App || {};

(function () {
	var errors = {
			DUPLICATE_ROUTE: 'Route with name "%s" exists'
		},
		link = {},
		registry = {};

	function getLink(name, params) {
		var	path = registry[name];

		if (!path) return;

		if (params) {
			Object.keys(params).forEach(function (key) {
				path = path.replace(':' + key, params[key].replace(/\s+/g, '-'));
			});
		}

		return path;
	}

	function register(path, name) {
		if (registry[name]) throw new Error(errors.DUPLICATE_ROUTE.replace('%s', name));

		registry[name] = path;
		link[name] = function (params) {
			return getLink(name, params);
		};
	}

	for (var route in App.context._routes) {
		register(App.context._routes[route], route);
	}

	App.router = {
		link: link
	};
})();
