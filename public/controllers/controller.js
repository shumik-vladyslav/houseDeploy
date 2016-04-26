var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
var vm = this;
$scope.htospotObj = {
  data: "",
  frames: {}//1:frame
}

$scope.frameObj = {
  box:{
    x: 0,
    y: 0
  },
  pointer:{
    x: "0%",
    y: "0%",
    style: "d1"//d1,d2,d3
  }
}
$scope.layers = {};
$scope.htospot = angular.copy($scope.htospotObj);

$scope.click = function (htospot, index) {
  $scope.htospot = htospot;
  $scope.index = index;
}

$scope.changeSelect = function () {
  if($scope.htospot.frames[$scope.singleSelect])
  $scope.settings = $scope.htospot.frames[$scope.singleSelect];
  else
  $scope.settings = angular.copy($scope.frameObj);
}

$scope.add = function () {
 $scope.htospot.frames[$scope.singleSelect] = $scope.settings;
 if(!$scope.index && $scope.index != 0){
   $scope.index = $scope.core.settings.hotspots.length;
   $scope.core.settings.hotspots[$scope.index] = $scope.htospot;
   console.log($scope.index, $scope.core.settings)
   
 }
}

$scope.get = function() {
  $http.get('/get').success(function(response) {
  console.log(response)
  $scope.core = response;
  var layers = $scope.core.layers;
  var count = 1;
  for (var key in layers) {
    if (layers.hasOwnProperty(key)) {
      var element = layers[key];
      for (var i in element) {
        if (element.hasOwnProperty(i)) {
          var obj = element[i];
          $scope.layers[count++] = obj;
        }
      }
    }
  }
        });
};
$scope.get()
$scope.update = function() {
  $scope.core.settings.hotspots[$scope.index].settings = $scope.settings;
  console.log($scope.core)
  $http.post('/', $scope.core).success(function(response) {});
};



}]);