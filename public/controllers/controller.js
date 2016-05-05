var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
  var vm = this;
  $scope.pageX = 0;
  $scope.pageY = 0;
  $scope.imgArr = [];
  vm.prefics = "//vitaliy.sirv.com/";
  $scope.img = "";
  $scope.style = "d1";
  vm.imgIndex = 0;
  $scope.url = "";
  $scope.folder = "";
  $scope.spin = "";

  $scope.htospotObj = {
    data: "",
    frames: {}//1:frame
  }

  $scope.frameObj = {
    box: {
      x: 0,
      y: 0
    },
    pointer: {
      x: "0%",
      y: "0%",
      style: $scope.style//d1,d2,d3
    }
  }
  $scope.layers = {};
  $scope.htospot = angular.copy($scope.htospotObj);

  $scope.click = function (htospot, index) {
    if (htospot.data) {
      var arr = htospot.data.split('');
      var href = htospot.data.match(/href="([^\'\"]+)/g);

      if (arr[1] === "a") {
        console.log(htospot.data);
        console.log(href[0].slice(6, href[0].length));
        var first = true;
        var last = true;
        var firstNumber = 0;
        var lastNumber = 0;
        for (var i = 0; i < arr.length; i++) {
          var element = arr[i];
          if (element === '>' && first) {
            first = false;
            firstNumber = i;
          }
        }
        for (var j = arr.length; j >= 0; j--) {
          var elementj = arr[j];
          if (elementj === '<' && last) {
            last = false;
            lastNumber = j;
          }
        }
        $scope.actionData = htospot.data.slice(firstNumber + 1, lastNumber);
        $scope.actionURL = href[0].slice(6, href[0].length);
        console.log(firstNumber + 1, lastNumber);
        console.log(htospot.data.slice(firstNumber + 1, lastNumber));
      } else {
        $scope.actionData = htospot.data;
        $scope.actionURL = "";
      }
    } else {
      $scope.actionData = "";
      $scope.actionURL = "";
    }
    $scope.htospot = htospot;
    $scope.index = index;
    removeFrame();
    setFrame();
  }

  $scope.changeSelect = function () {
    if ($scope.htospot.frames[$scope.singleSelect])
      $scope.settings = $scope.htospot.frames[$scope.singleSelect];
    else
      $scope.settings = angular.copy($scope.frameObj);
  }

  $scope.add = function () {
    $scope.htospot.frames[$scope.singleSelect] = $scope.settings;
    if (!$scope.index && $scope.index != 0) {
      $scope.index = $scope.core.settings.hotspots.length;
      $scope.core.settings.hotspots[$scope.index] = $scope.htospot;
      console.log($scope.index, $scope.core.settings)

    }
  }
  $scope.getFlag = false;

  $scope.get = function () {
    $scope.url = $scope.folder + "/" + $scope.spin;
    $scope.getFlag = false;
    vm.prefics = '//vitaliy.sirv.com/' + $scope.folder + '/';
    $http.post('/get', { url: $scope.url }).success(function (response) {
      console.log(response)
      $scope.getFlag = true;

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
  $scope.update = function (flag) {
    //$scope.core.settings.hotspots[$scope.index].settings = $scope.settings;
    var obj = [];
    for (var key in $scope.core.settings.hotspots) {
      if ($scope.core.settings.hotspots.hasOwnProperty(key)) {
        var element = $scope.core.settings.hotspots[key];

        if (key !== "undefined" && element && Object.keys(element.frames).length !== 0) {
         
          obj[key] = $scope.core.settings.hotspots[key];
        }
      }
    }
    $scope.core.settings.hotspots = obj;

    console.log($scope.core)

    $http.post('/', { url: $scope.url, core: $scope.core }).success(function (response) {
      $scope.get();
    });
    if (!flag)
      window.open(
        '//vitaliy.sirv.com/' + $scope.url,
        '_blank'
      );
  };

  $scope.addHotspot = function () {
    removeFrame();
    $scope.index = Object.keys($scope.core.settings.hotspots).length;
    $scope.core.settings.hotspots[$scope.index] = {};
    $scope.core.settings.hotspots[$scope.index].frames = {};
    console.log($scope.core.settings.hotspots)

  }

  $scope.back = function () {
    removeFrame();
    if (vm.imgIndex > 0) {
      vm.imgIndex = --vm.imgIndex;
      $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
    }
    setFrame();
  };

  $scope.forward = function () {
    removeFrame();
    if (vm.imgIndex < $scope.imgArr.length - 1) {
      vm.imgIndex = ++vm.imgIndex;
      $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
    }
    setFrame();
  };

  $scope.set = function (id) {
    removeFrame();
    vm.imgIndex = id;
    if (id < $scope.imgArr.length - 1 && id >= 0) {
      $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
    }
    setFrame();
  };

  $scope.changeMessage = function () {

    if ($scope.actionURL)
      if ($scope.actionURL.slice(0, 7) !== "http://")
        $scope.core.settings.hotspots[$scope.index].data = '<a href="' + "http://" + $scope.actionURL + '" style="text-decoration: none;">' + $scope.actionData + '</a>';
      else
        $scope.core.settings.hotspots[$scope.index].data = '<a href="' + $scope.actionURL + '" style="text-decoration: none;">' + $scope.actionData + '</a>';
    else
      $scope.core.settings.hotspots[$scope.index].data = $scope.actionData;
  };

  function setFrame() {
    var imageWraper = $('#image-wraper');
    console.log($scope.core.settings.hotspots)
    var frame = $scope.core.settings.hotspots[$scope.index].frames[vm.imgIndex + 1];
    if (frame) {
      var pointer = frame.pointer;
      if (pointer) {
        var span = document.createElement("span");
        span.id = "frame";
        span.style.left = pointer.x;
        span.style.top = pointer.y;
        span.className = "hotspot-pointer d1";
        //span.className = "d1";

        imageWraper.append(span);

        setDopAndDrow();
      }
    }
  }

  $scope.daletedFrame = function () {
    removeFrame();
    $scope.core.settings.hotspots[$scope.index].frames[vm.imgIndex + 1] = {};
    $scope.update(true);
    //$scope.get();
  };
  $scope.daletedFrames = function () {
    $scope.core.settings.hotspots[$scope.index].frames = {};
    $scope.update(true);
    //$scope.get();
  };

  function setDopAndDrow() {
    var ball = document.getElementById('frame');

    ball.onmousedown = function (e) { // 1. отследить нажатие


      function moveAt(e) {
        ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
      }

      // 3, перемещать по экрану
      document.onmousemove = function (e) {
        moveAt(e);
      }
      var imgContainer = $('#image');
      var imageWraper = $('#image-wraper');



      // 4. отследить окончание переноса
      ball.onmouseup = function () {
        // document.onmousemove = null;
        // ball.onmouseup = null;

        var offset = $('#image').offset(),
          frame = $('#frame').position(),

          x = Math.round((frame.left - offset.left) / $('#image').width() * 100),
          y = Math.round((frame.top - offset.top) / $('#image').height() * 100);
        console.log(frame);
        removeFrame();
        var el = document.getElementById('frame');
        if (el)
          el.parentNode.removeChild(el);
        var span = document.createElement("span");
        span.id = "frame";
        span.style.left = x + "%";
        span.style.top = y + "%";
        span.className = "hotspot-pointer " + $scope.style;
        //span.className = "d1";

        imageWraper.append(span);
        var newObj = {
          "pointer": {
            "style": $scope.style,
            "x": x + "%",
            "y": y + "%"
          },
          "box": {
            "x": $scope.messageX || 20,
            "y": $scope.messageY || 20
          }
        };

        $scope.core.settings.hotspots[$scope.index].frames[vm.imgIndex + 1] = newObj;

        setDopAndDrow();
      }
    }
  }

  function removeFrame() {
    var el = document.getElementById('frame');
    if (el)
      el.parentNode.removeChild(el);
  }

  function init() {

    var lastScrollTop = 0;


    $scope.img = vm.prefics + $scope.imgArr[vm.imgIndex];
    if (!$scope.core.settings.hotspots) {
      $scope.core.settings.hotspots = {};
      $scope.index = 0;
      $scope.core.settings.hotspots[$scope.index] = {};
      $scope.core.settings.hotspots[$scope.index].frames = {};
    }
    if (!$scope.index) {
      $scope.index = Object.keys($scope.core.settings.hotspots).length;
      $scope.core.settings.hotspots[$scope.index] = {};
      $scope.core.settings.hotspots[$scope.index].frames = {};
    }

    setFrame();

    var imgContainer = $('#image');
    var imageWraper = $('#image-wraper');

    imgContainer.click(function (e) {

      var offset = $(this).offset(),
        x = Math.round((e.pageX - offset.left) / $(this).width() * 100),
        y = Math.round((e.pageY - offset.top) / $(this).height() * 100);
      console.log(e.pageY, offset.left, $(this).width());

      console.log(x, y, e.pageX, e.pageY)
      var el = document.getElementById('frame');
      if (el)
        el.parentNode.removeChild(el);
      var span = document.createElement("span");
      span.id = "frame";
      span.style.left = x + "%";
      span.style.top = y + "%";
      span.className = "hotspot-pointer " + $scope.style;
      //span.className = "d1";

      imageWraper.append(span);
      var newObj = {
        "pointer": {
          "style": $scope.style,
          "x": x + "%",
          "y": y + "%"
        },
        "box": {
          "x": $scope.messageX || 20,
            "y": $scope.messageY || 20
        }
      };

      $scope.core.settings.hotspots[$scope.index].frames[vm.imgIndex + 1] = newObj;

      setDopAndDrow();
      // newConfigForm.val(JSON.stringify(newConfig, null, '\t'));
      // nextFrame();
    });


  }



}]);

