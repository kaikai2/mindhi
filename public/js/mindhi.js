var app = angular.module('mindhi', ['ngRoute']);

app.controller('MainCtrl', function($scope, $route, $routeParams) {
	$scope.cur = {
		text: '',
		act: '',
		face: '',
		bg: '#000',
	};
});


app.controller('CoverCtrl', ['$scope', '$window', function($scope, $window) {

}]);

app.controller('MakePicSelectActionCtrl', ['$scope', '$window', function($scope, $window) {

	var g_imglist = [
		"img/face/1.jpg",
		"img/face/1.png",
		"img/face/10.png",
		
		"img/face/11.jpg",
		"img/face/11.png",
		"img/face/12.jpg",
		
		"img/face/12.png",
		"img/face/13.png",
		"img/face/14.png",
		
	];
    $scope.actions = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.actions.push({
            name: g_imglist[i],
            image: g_imglist[0],
        });
    }
	$scope.select = function(action){
		$scope.cur.act = action.name;
	};
}]);

app.controller('MakePicSelectBackgroundCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	//$scope.cur.bg;
	
	$(document).ready(function() {
		$('#colorpicker').farbtastic(function(color){
			$scope.cur.bg = color;
		});
	});
});


app.controller('MakePicSelectFaceCtrl', function($scope, $route, $routeParams) {
	var g_imglist = [
		"img/face/1.jpg",
		"img/face/1.png",
		"img/face/10.png",
		
		"img/face/11.jpg",
		"img/face/11.png",
		"img/face/12.jpg",
		
		"img/face/12.png",
		"img/face/13.png",
		"img/face/14.png",
		
	];
    $scope.faces = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.faces.push({
            name: g_imglist[i],
            image: g_imglist[0],
        });
    }
	$scope.select = function(action){
		$scope.cur.face = action.name;
	};
});

app.controller('MakePicSelectTextCtrl', function($scope, $route, $routeParams) {
	$scope.name = "BookController";
	$scope.params = $routeParams;
});

app.controller('PublishCtrl', ['$scope', '$window', function($scope, $window) {
	var width = $window.$(document).width() * 0.8;
	var height = width * 3 / 2;
	$window.$('#myCanvas').width(width);
	$window.$('#myCanvas').height(height);
	
	
	$scope.myCanvas
}]);

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