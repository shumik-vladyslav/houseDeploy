(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController).controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
  });

  /** @ngInject */
  function MainController($state,$rootScope, $http, DialogService) {
    var vm = this;

    getData();

    vm.getDesired = function (item) {
      var comfort_status = item.comfort_status[item.comfort_status.length - 1];
      return comfort_status.profiles[comfort_status.profiles.length - 1].set_point;
    };

    vm.edit = function (item){
      console.log(item)
      $state.go('history', {applianceId: item.appliance_id})
    }

    vm.swapComfort = function (item, flag) {
      console.log(item,flag)
      var saveItem = item;
      saveItem.comfort_active = flag;
      console.log(item)
      
      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/appliance/'+ item.appliance_id +'?access_token=' + vm.token, {"appliance":item}).then(function (ress) {
        console.log(ress);
        getData();
      });
    };

    function getData() {
      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/login', {
        "email": "edu@logic-energy.com",
        "password": "logicenergy"
      }).then(function (ress) {
        console.log(ress.data.response.response_body.user.access_token);
        vm.token = ress.data.response.response_body.user.access_token;
        $http.post('http://sse.logicenergy.com/manager/sse/api/v1/dashboard?access_token=' + vm.token).then(function (ress) {
          console.log(ress.data.response.response_body.appliances);
          vm.data = ress.data.response.response_body.appliances;
        });
      });
    }
  }
})();
