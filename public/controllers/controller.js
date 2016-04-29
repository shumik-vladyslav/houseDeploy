var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
var vm = this;
$scope.imgArr = [];
vm.prefics = "//vitaliy.sirv.com/drmartenboot-3d/";
$scope.img = "";
vm.imgIndex = 0;

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
          $scope.imgArr.push(obj)
        }
      }
    }
  }
  init();
        });
};
$scope.get()
$scope.update = function() {
  //$scope.core.settings.hotspots[$scope.index].settings = $scope.settings;
  console.log($scope.core)
  $http.post('/', $scope.core).success(function(response) {});
};

$scope.back = function(){
  if(vm.imgIndex > 0){
    vm.imgIndex = --vm.imgIndex;
    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
  }
};

$scope.forward = function(){
  if(vm.imgIndex < $scope.imgArr.length - 1){
    vm.imgIndex = ++vm.imgIndex;
    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
  }
};

function init() {
    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
  console.log($scope.core.settings.hotspots[0].frames);
  console.log($scope.core.settings.hotspots[0].frames[vm.imgIndex + 1]);
    
    var imgContainer = $('#image');
    var imageWraper = $('#image-wraper');
    imgContainer.click(function(e) {
      
            var offset = $(this).offset(),
            x = Math.round((e.pageX - offset.left) / $(this).width() * 100),
            y = Math.round((e.pageY - offset.top) / $(this).height() * 100);
            console.log(x,y)
            var span = document.createElement("span"); 
            span.style.left = x;
            span.style.top = y;
            span.className = "hotspot-pointer d1";
            //span.className = "d1";
            
            imageWraper.append(span);
            var newObj = {
              "pointer": {
                "style": "d1",
                "x": x + "%",
                "y": y + "%"
              },
              "box": {
                "x": 20,
                "y": 20
              }
            };
            
            $scope.core.settings.hotspots[0].frames[vm.imgIndex + 1] = newObj;
            // newConfigForm.val(JSON.stringify(newConfig, null, '\t'));
            // nextFrame();
          });
}

}]);