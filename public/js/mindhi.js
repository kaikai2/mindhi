var app = angular.module('mindhi', ['ngRoute']);

app.controller('CoverCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});

app.controller('MakePicSelectActionCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});

app.controller('MakePicSelectBackgroundCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});


app.controller('MakePicSelectFaceCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});

app.controller('MakePicSelectTextCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});

app.controller('PublishCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', {templateUrl: 'cover.html',   controller: 'CoverCtrl'}).
		when('/publish', {templateUrl: 'publish.html',   controller: 'PublishCtrl'}).
		when('/makepic_select_action', {templateUrl: 'makepic_select_action.html',   controller: 'MakePicSelectActionCtrl'}).
		when('/makepic_select_background', {templateUrl: 'makepic_select_background.html',   controller: 'MakePicSelectBackgroundCtrl'}).
		when('/makepic_select_face', {templateUrl: 'makepic_select_face.html',   controller: 'MakePicSelectFaceCtrl'}).
		when('/makepic_select_text', {templateUrl: 'makepic_select_text.html',   controller: 'MakePicSelectTextCtrl'}).
		otherwise({redirectTo: '/'});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
});