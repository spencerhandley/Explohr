var semver = require('semver'),
	useragent = require('useragent');

module.exports = function (ua, dict) {
	var parsedUA = useragent.lookup(ua),
		range = dict[parsedUA.family];

	return range ? semver.satisfies([parsedUA.major, parsedUA.minor, (parsedUA.patch || '0')].join('.'), range) : false;
};
