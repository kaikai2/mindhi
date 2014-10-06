

var app = angular.module('makepicApp', []);

app.controller('MakePic', function($scope){
    $scope.emotions = [];
    for(var i = 0; i < g_imglist.length; i++){
        $scope.emotions.push({
            name: g_imglist[i],
            image: g_imglist[i]
        });
    }
});
    /*
app.controller('Canvas', function($scope, $http){
    //$scope.

});*/

function save2result(){
    $("img").src = $("canvas").toDataURL();
}

app.directive('draggableCanvas', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        scope: {
            isdraggable: '=isdraggable',
            //kineticObj: '=kineticObj',
            //kineticStageObj: '=kineticStageObj',
        },
        link: function (scope, el, attrs) {
            console.log("in");
            if (!scope.kineticStageObj) {
                var id = attrs["id"];
                    //create random unique id
                if (!id) {
                    id = Math.random().toString(36).substring(7);
                }
                if (!scope.kineticStageObj) {
                    scope.kineticStageObj = new Kinetic.Stage({
                        container: id,
                        width: 578,
                        height: 200
                    });
                }
                if (!scope.kineticStageObj.container) {
                    scope.kineticStageObj.attrs.container = id;
                }
            }
            var layer = new Kinetic.Layer();
            var rectX = scope.kineticStageObj.getWidth() / 2 - 50;
            var rectY = scope.kineticStageObj.getHeight() / 2 - 25;
                
                //if kineticObj is null, init
            var options = {
                x: rectX,
                y: rectY,
                width: 100,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4,
            };
            if (scope.isdraggable) {
                options.draggable = true;
            }
            if (!scope.kineticObj) {
                scope.kineticObj = new Kinetic.Rect(options);
            }
               
                // add cursor styling
            scope.kineticObj.on('mouseover', function () {

                document.body.style.cursor = 'pointer';

            });
            scope.kineticObj.on('mouseout', function () {
                document.body.style.cursor = 'default';
                $rootScope.$emit("CANVAS-MOUSEOUT");
            });

            layer.add(scope.kineticObj);
            scope.kineticStageObj.add(layer);
             
        }
    }
}]);


