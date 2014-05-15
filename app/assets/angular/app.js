var users = require('../models/account');

angular.module('people', ['ngresource', 'ngroute']);

// angular.module('people').config(function($routeProvider, $locationProvider)
// 	$locationProvider.html5Mode(true)
// }) 

angular.module('people').controller('mainCtrl', function($scope) {
	$scope.users = users
})


