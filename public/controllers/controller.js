var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
var vm = this;
$scope.imgArr = [];
vm.prefics = "//vitaliy.sirv.com/drmartenboot-3d/";
$scope.img = "";
$scope.style = "d1";
vm.imgIndex = 0;
$scope.url = "";

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
    style: $scope.style//d1,d2,d3
  }
}
$scope.layers = {};
$scope.htospot = angular.copy($scope.htospotObj);

$scope.click = function (htospot, index) {
  $scope.htospot = htospot;
  $scope.index = index;
  removeFrame();
  setFrame();
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
  $http.post('/get', {url: $scope.url}).success(function(response) {
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
  var obj = {};
  for (var key in $scope.core.settings.hotspots) {
    if ($scope.core.settings.hotspots.hasOwnProperty(key)) {
      var element = $scope.core.settings.hotspots[key];
      
      if(element && Object.keys(element.frames).length !== 0){
        obj[key] = $scope.core.settings.hotspots[key];
      }
    }
  }
  $scope.core.settings.hotspots = obj;
  
  console.log($scope.core)
  
  $http.post('/', {url: $scope.url, core: $scope.core}).success(function(response) {});
};

$scope.addHotspot = function(){
  removeFrame();
   $scope.index = $scope.core.settings.hotspots.length;
    $scope.core.settings.hotspots[$scope.index] = {};
    $scope.core.settings.hotspots[$scope.index].frames = {};
  console.log($scope.core.settings.hotspots)
    
}

$scope.back = function(){
  removeFrame();
  if(vm.imgIndex > 0){
    vm.imgIndex = --vm.imgIndex;
    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
  }
 setFrame();
};

$scope.forward = function(){
  removeFrame();
  if(vm.imgIndex < $scope.imgArr.length - 1){
    vm.imgIndex = ++vm.imgIndex;
    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
  }
 setFrame();
};
function setFrame(){
  var imageWraper = $('#image-wraper');
  console.log($scope.core.settings.hotspots)
  var frame = $scope.core.settings.hotspots[$scope.index].frames[vm.imgIndex + 1];
  if(frame){
   var pointer = frame.pointer;
    if(pointer){
    var span = document.createElement("span"); 
    span.id = "frame";
    span.style.left = pointer.x;
    span.style.top = pointer.y;
    span.className = "hotspot-pointer d1";
    //span.className = "d1";
    
    imageWraper.append(span);
    }
    }
}
function removeFrame(){
  var el = document.getElementById('frame');
  if(el)
  el.parentNode.removeChild(el);
}

function init() {
  
var lastScrollTop = 0;


    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
  if(!$scope.index){
    $scope.index = Object.keys($scope.core.settings.hotspots).length;
    $scope.core.settings.hotspots[$scope.index] = {};
    $scope.core.settings.hotspots[$scope.index].frames = {};
  }
 
 setFrame();
    
    var imgContainer = $('#image');
    var imageWraper = $('#image-wraper');
    
//     $('#image-wraper').bind('DOMMouseScroll', function(e){
//      if(e.originalEvent.detail > 0) {
//          //scroll down
//          $scope.back();
//      }else {
//          //scroll up
//          $scope.forward();
//      }

//      //prevent page fom scrolling
//      return false;
//  });

//  //IE, Opera, Safari
//  $('#image-wraper').bind('mousewheel', function(e){
//      if(e.originalEvent.wheelDelta < 0) {
//          //scroll down
//          console.log('Down');
//          $scope.back();
         
//      }else {
//          //scroll up
//          console.log('Up');
//          $scope.forward();
         
//      }

//      //prevent page fom scrolling
//      return false;
//  });
    imgContainer.click(function(e) {
      
            var offset = $(this).offset(),
            x = Math.round((e.pageX - offset.left) / $(this).width() * 100),
            y = Math.round((e.pageY - offset.top) / $(this).height() * 100);
            console.log(x,y)
            var el = document.getElementById('frame');
            if(el)
            el.parentNode.removeChild(el);
            var span = document.createElement("span"); 
            span.id = "frame";
            span.style.left = x+"%";
            span.style.top = y+"%";
            span.className = "hotspot-pointer "+$scope.style;
            //span.className = "d1";
            
            imageWraper.append(span);
            var newObj = {
              "pointer": {
                "style": $scope.style,
                "x": x + "%",
                "y": y + "%"
              },
              "box": {
                "x": 20,
                "y": 20
              }
            };
            
            $scope.core.settings.hotspots[$scope.index].frames[vm.imgIndex + 1] = newObj;
            // newConfigForm.val(JSON.stringify(newConfig, null, '\t'));
            // nextFrame();
          });
}

}]);

