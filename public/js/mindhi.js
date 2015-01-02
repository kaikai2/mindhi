var app = angular.module('mindhi', ['ngRoute']);

app.controller('MainCtrl', function($scope, $route, $routeParams) {
    $scope.basePath = location.pathname;
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
	$scope.getPicIndex = function(routeParams){
    	var picIndex = routeParams.picIndex;
		if (picIndex >= $scope.pic.length){
			picIndex = $scope.pic.length - 1;
		}
        return picIndex;
    };
	$scope.getRoleIndex = function(routeParams){
        var roleIndex = routeParams.roleIndex;
        return roleIndex;
    };
    $scope.getAction = function(routeParams){
        var pic = $scope.pic[$scope.getPicIndex(routeParams)];
        return pic.role[$scope.getRoleIndex(routeParams)].act;
    };
    $scope.getFace = function(routeParams){
        var pic = $scope.pic[$scope.getPicIndex(routeParams)];
        return pic.role[$scope.getRoleIndex(routeParams)].face;
    };
    $scope.getText = function(routeParams){
        var pic = $scope.pic[$scope.getPicIndex(routeParams)];
        return pic.text;
    };
    $scope.getBg = function(routeParams){
        var pic = $scope.pic[$scope.getPicIndex(routeParams)];
        return pic.bg;
    };
	$scope.save = function(routeParams, values){
        var picIndex = $scope.getPicIndex(routeParams);
		var pic = $scope.pic[picIndex];
		if ('text' in values){
			pic.text = values.text;
		}
		if ('bg' in values){
			pic.bg = values.bg;
		}
		if ('roleIndex' in routeParams){
            var roleIndex = $scope.getRoleIndex(routeParams);
            if (roleIndex >= pic.role.length){
                roleIndex = pic.role.length - 1;
            }
			var role = pic.role[roleIndex];
			if ('act' in values){
				role.act = values.act;
			}
			if ('face' in values){
				role.face = values.face;
			}
		}
	};
});


app.controller('CoverCtrl', function($scope, $window, $route, $routeParams) {

});

app.controller('MakePicSelectActionCtrl', function($scope, $window, $route, $routeParams) {
    $scope.$routeParams = $routeParams;
	var g_imglist = [
		"img/body/body-1.png",
		"img/body/body-2.png",
		"img/body/body-3.png",
		"img/body/body-4.png",
		"img/body/body-5.png",
		"img/body/body-6.png",
		"img/body/body-7.png",
		"img/body/body-8.png",
		"img/body/body-9.png",

	];
    $scope.actions = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.actions.push({
            name: g_imglist[i],
            image: $scope.basePath + g_imglist[i],
        });
    }
	$scope.cur = {act: $scope.getAction($routeParams) };
	$scope.select = function(action){
		$scope.cur.act = action.name;
	};
	$scope.done = function(){
		$scope.save($routeParams, {act: $scope.cur.act});
	};
});

app.controller('MakePicSelectBackgroundCtrl', function($scope, $route, $routeParams) {
    $scope.$routeParams = $routeParams;
	$scope.cur = {bg: $scope.getBg($routeParams)};
	
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
    $scope.$routeParams = $routeParams;
	var g_imglist = [
		"img/face/face-1.png",
		"img/face/face-2.png",
		"img/face/face-3.png",
		"img/face/face-4.png",
		"img/face/face-5.png",
		"img/face/face-6.png",
		"img/face/face-7.png",
		"img/face/face-8.png",
		"img/face/face-9.png",
		"img/face/face-10.png",
	
		"img/face/face-11.png",
		"img/face/face-12.png",
		"img/face/face-13.png",
		"img/face/face-14.png",
		"img/face/face-15.png",
		"img/face/face-16.png",
		"img/face/face-17.png",
		"img/face/face-18.png",
		"img/face/face-19.png",
		"img/face/face-20.png",
		"img/face/face-21.png",
		"img/face/face-22.png",
		"img/face/face-23.png",
		"img/face/face-24.png",
		"img/face/face-25.png",
		"img/face/face-26.png",
		"img/face/face-27.png",
		"img/face/face-28.png",
		"img/face/face-29.png",
		"img/face/face-30.png",
	];
    $scope.faces = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.faces.push({
            name: g_imglist[i],
            image: $scope.basePath + g_imglist[i],
        });
    }
	$scope.cur = {face: $scope.getFace($routeParams)};
	$scope.select = function(action){
		$scope.cur.face = action.name;
	};
	$scope.done = function(){
		$scope.save($routeParams, {face: $scope.cur.face});
	};
});

app.controller('MakePicSelectTextCtrl', function($scope, $route, $routeParams) {
	$scope.$routeParams = $routeParams;
    $scope.cur = {text: $scope.getText($routeParams)};
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
app.controller('PublishCtrl', function($scope, $window, $location, $route) {
    
    window.select_text = function(picIndex){
        $location.path($scope.basePath + 'makepic_select_text/' + picIndex);
        $route.reload();
    };
    window.select_action = function(picIndex, roleIndex){
        $location.path($scope.basePath + 'makepic_select_action/' + picIndex + '/' + roleIndex);
        $route.reload();
    };
    window.select_face = function(picIndex, roleIndex){
        $location.path($scope.basePath + 'makepic_select_face/' + picIndex + '/' + roleIndex);
        $route.reload();
    };
    window.select_background = function(picIndex){
        $location.path($scope.basePath + 'makepic_select_background/' + picIndex);
        $route.reload();
    };
    
	var maxWidth = $window.screen.availWidth * 0.8;
	var maxHeight = $window.screen.availHeight * 0.8;
	var width, height;
    if (maxWidth * 3 / 2 < maxHeight){
        width = maxWidth;
        height = maxWidth * 3 / 2;
    } else {
        width = maxHeight * 2 / 3;
        height = maxHeight;
    }
    var canvases = $window.$('#myCanvas');
	$scope.width = parseInt(width);
	$scope.height = parseInt(height);
	if (canvases.length > 0){
		var canvas = canvases[0];
		//canvases.attr({width: width, height: height});
		var context = canvas.getContext('2d');
		function drawImage(context, img, x, y, scaleWidth){
			var imgShowWidth = scaleWidth;
			var imgShowHeight = imgShowWidth * img.height / img.width;
			context.drawImage(img, parseInt(x), parseInt(y), parseInt(imgShowWidth), parseInt(imgShowHeight));
		}
		function coord(x,y,r){
			return [parseInt(x + r/2),parseInt(y + r/2),parseInt(r/2)].join(',');
		}
		for (var i = 0; i < $scope.pic.length; i++){
			(function(pic, baseY, width, height){
				var sources = {
					act1: pic.role[0].act || 'img/body/body-1.png',
					face1: pic.role[0].face || 'img/face/face-1.png',
					act2: pic.role[1].act || 'img/body/body-2.png',
					face2: pic.role[1].face || 'img/face/face-2.png',
				};
				pic.act1_pos = coord(0.7 * width, 0.4 * height + baseY, 0.3 * width);
				pic.face1_pos = coord(0.7 * width, 0.15 * height + baseY, 0.3 * width);
				pic.act0_pos = coord(0.05 * width, 0.7 * height + baseY, 0.3 * width);
				pic.face0_pos = coord(0.05 * width, 0.45 * height + baseY, 0.3 * width);
				pic.text_pos = coord(0.25 * width, 0.3 * height + baseY, 0.5 * width);
				pic.bg_pos = [0, width, baseY, baseY + height].join(',');
				loadImages(sources, function(images){
					context.beginPath();
					context.rect(0, baseY, width, height);
					context.fillStyle = pic.bg;
					context.fill();
					
					// role 1
					drawImage(context, images.act2, 0.7 * width, 0.4 * height + baseY, 0.3 * width);
					drawImage(context, images.face2, 0.7 * width, 0.15 * height + baseY, 0.3 * width);
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
	  
					// role 0
					drawImage(context, images.act1, 0.05 * width, 0.7 * height + baseY, 0.3 * width);
					drawImage(context, images.face1, 0.05 * width, 0.45 * height + baseY, 0.3 * width);
		
					context.fillStyle = 'black';
					context.fillText(pic.text, 0.25 * width, 0.3 * height + baseY, 0.5* width);
				});
			})($scope.pic[i], parseInt(i * height / 2), width, parseInt(height / 2));
		}
	}
});

app.config(function($routeProvider, $locationProvider) {
    var basePath = location.pathname;
	$routeProvider.
		when(basePath, {
            templateUrl: 'cover.html',
            controller: 'CoverCtrl'
        }).
		when(basePath + 'publish', {
            templateUrl: 'publish.html',
            controller: 'PublishCtrl'
        }).
		when(basePath + 'makepic_select_background/:picIndex', {
            templateUrl: 'makepic_select_background.html', 
            controller: 'MakePicSelectBackgroundCtrl'
        }).
		when(basePath + 'makepic_select_text/:picIndex', {
            templateUrl: 'makepic_select_text.html', 
            controller: 'MakePicSelectTextCtrl'
        }).
		when(basePath + 'makepic_select_action/:picIndex/:roleIndex', {
            templateUrl: 'makepic_select_action.html', 
            controller: 'MakePicSelectActionCtrl'
        }).
		when(basePath + 'makepic_select_face/:picIndex/:roleIndex', {
            templateUrl: 'makepic_select_face.html', 
            controller: 'MakePicSelectFaceCtrl'
        }).otherwise({
            templateUrl: 'cover.html',
            controller: 'CoverCtrl'
        });
    
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
});