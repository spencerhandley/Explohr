var RouteManager = require('express-shared-routes').RouteManager;

module.exports = new RouteManager({ injectToLocals: 'route' });
