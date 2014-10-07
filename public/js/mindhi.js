var app = angular.module('mindhi', ['ngRoute']);

app.controller('MainCtrl', function($scope, $route, $routeParams) {
	$scope.pic = [{
		text: '',
		bg: '#aaa',
		role: [{
			act: '',
			face: '',
		}, {
			act: '',
			face: '',
		}],
	}, {
		text: '',
		bg: '#aaa',
		role: [{
			act: '',
			face: '',
		}, {
			act: '',
			face: '',
		}],
	}];
	
	$scope.save = function(routeParams, values){
		var picIndex = routeParams.picIndex;
		if (picIndex >= $scope.pic.length){
			picIndex = $scope.pic.length - 1;
		}
		var pic = $scope.pic[picIndex];
		if ('text' in values){
			pic.text = values.text;
		}
		if ('bg' in values){
			pic.bg = values.bg;
		}
		if ('roleIndex' in routeParams){
			var roleIndex = routeParams.roleIndex;
			if (roleIndex >= pic.role.length){
				roleIndex = pic.role.length - 1;
			}
			var role = pic.role[roleIndex];
			if ('act' in values){
				pic.act = values.act;
			}
			if ('face' in values){
				pic.face = values.face;
			}
		}
	};
});


app.controller('CoverCtrl', ['$scope', '$window', '$route', function($scope, $window$route, $routeParams) {

}]);

app.controller('MakePicSelectActionCtrl', ['$scope', '$window', '$route', function($scope, $window, $route, $routeParams) {

	var g_imglist = [
		"/img/face/19.png",
		"/img/face/4.png",
		"/img/face/2.png",
		
		"/img/face/6.png",
		"/img/face/11.png",
		"/img/face/12.png",
		
		"/img/face/27.png",
		"/img/face/34.png",
		"/img/face/45.png",
		
	];
    $scope.actions = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.actions.push({
            name: g_imglist[i],
            image: g_imglist[i],
        });
    }
	$scope.cur = {};
	$scope.select = function(action){
		$scope.cur.act = action.name;
	};
	$scope.done = function(){
		$scope.save($routeParams, {act: $scope.cur.act});
	};
}]);

app.controller('MakePicSelectBackgroundCtrl', function($scope, $route, $routeParams) {

	$scope.cur = {};
	
	$(document).ready(function() {
		$('#colorpicker').farbtastic(function(color){
			$scope.cur.bg = color;
		});
	});
	$scope.done = function(){
		$scope.save($routeParams, {bg: $scope.cur.bg});
	};
});


app.controller('MakePicSelectFaceCtrl', function($scope, $route, $routeParams) {
	var g_imglist = [
		"/img/face/19.png",
		"/img/face/4.png",
		"/img/face/2.png",
		
		"/img/face/6.png",
		"/img/face/11.png",
		"/img/face/12.png",
		
		"/img/face/27.png",
		"/img/face/34.png",
		"/img/face/45.png",
		
	];
    $scope.faces = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.faces.push({
            name: g_imglist[i],
            image: g_imglist[i],
        });
    }
	$scope.cur = {};
	$scope.select = function(action){
		$scope.cur.face = action.name;
	};
	$scope.done = function(){
		$scope.save($routeParams, {face: $scope.cur.face});
	};
});

app.controller('MakePicSelectTextCtrl', function($scope, $route, $routeParams) {
	$scope.cur = {};
	$scope.done = function(){
		$scope.save($routeParams, {text: $scope.cur.text});
	};
});

function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}
app.controller('PublishCtrl', ['$scope', '$window', function($scope, $window) {
	var width = $window.$(document).width() * 0.8;
	var height = width * 3 / 2;
	var canvases = $window.$('#myCanvas');
	if (canvases.length > 0){
		var canvas = canvases[0];
		//canvases.width(width);
		canvases.attr({width: width, height: height});
		//canvases.height(height);
		var context = canvas.getContext('2d');
		
		for (var i = 0; i < $scope.pic.length; i++){
			(function(pic, baseY, width, height){
				var sources = {
					act1: pic.role[0].act || 'img/face/1.png',
					face1: pic.role[0].face || 'img/face/1.png',
					act2: pic.role[1].act || 'img/face/1.png',
					face2: pic.role[1].face || 'img/face/1.png',
				};
				loadImages(sources, function(images){
					context.beginPath();
					context.rect(0, baseY, width, height);
					context.fillStyle = pic.bg;
					context.fill();
					
					// role 2
					context.drawImage(images.act1, 0.7 * width, 0.45 * height + baseY);
					context.drawImage(images.face2, 0.7 * width, 0.15 * height + baseY);
					
					context.beginPath();
					
					context.moveTo(0.2 * width, 0.4 * height + baseY);
					context.quadraticCurveTo(
						0.2 * width, 0.2 * height + baseY,
						0.5 * width, 0.2 * height + baseY);
					context.quadraticCurveTo(
						0.8 * width, 0.2 * height + baseY,
						0.8 * width, 0.4 * height + baseY);
					context.quadraticCurveTo(
						0.8 * width, 0.6 * height + baseY,
						0.5 * width, 0.6 * height + baseY);
					context.quadraticCurveTo(
						0.2 * width, 0.6 * height + baseY,
						0.2 * width, 0.4 * height + baseY);
						
					context.closePath();
						
					context.fillStyle = 'white';
					context.fill();
					context.strokeStyle = 'black';
					context.stroke();
	  
					// role 1
					context.drawImage(images.act1, 0.05 * width, 0.55 * height + baseY);
					context.drawImage(images.face1, 0.05 * width, 0.3 * height + baseY);

					context.fillStyle = 'black';
					context.fillText(pic.text, 100,100 + baseY);
				});
			})($scope.pic[i], i * height / 2, width, height / 2);
		}
	}
}]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', {templateUrl: '/cover.html',   controller: 'CoverCtrl'}).
		when('/publish', {templateUrl: '/publish.html',   controller: 'PublishCtrl'}).
		when('/makepic_select_background/:picIndex', {templateUrl: '/makepic_select_background.html',   controller: 'MakePicSelectBackgroundCtrl'}).
		when('/makepic_select_text/:picIndex', {templateUrl: '/makepic_select_text.html',   controller: 'MakePicSelectTextCtrl'}).
		when('/makepic_select_action/:picIndex/:roleIndex', {templateUrl: '/makepic_select_action.html',   controller: 'MakePicSelectActionCtrl'}).
		when('/makepic_select_face/:picIndex/:roleIndex', {templateUrl: '/makepic_select_face.html',   controller: 'MakePicSelectFaceCtrl'}).
		otherwise({redirectTo: '/'});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
});