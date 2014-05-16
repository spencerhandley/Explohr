var peopleApp = angular.module('people', ['ngresource', 'ngroute']);

// angular.module('people').config(function($routeProvider, $locationProvider)
// 	$locationProvider.html5Mode(true)
// }) 

peopleApp.controller('mainCtrl', function($scope) {
	$scope.myVar  = "hey dude"
})


