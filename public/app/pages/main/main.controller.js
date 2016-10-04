(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController)

  /** @ngInject */
  function MainController($state, $rootScope, $http, TempDialogService,AuthService) {
    var vm = this;

    getData();

    vm.getDesired = function (item) {
      var comfort_status = item.comfort_status[item.comfort_status.length - 1];
      return comfort_status.profiles[comfort_status.profiles.length - 1].set_point;
    };

    vm.schedule = function (item) {
      console.log(item)
      //TempDialogService.showDialog(item);
      $state.go('schedule', {applianceId: item.appliance_id})
    }

     vm.edit = function (item) {
      $state.go('schedule', {applianceId: item.appliance_id})
    }
      vm.history = function (item) {
      $state.go('history', {applianceId: item.appliance_id})
    }

    vm.swapComfort = function (item) {
      console.log(item)

      item.comfort_active = !item.comfort_active;
      console.log(item)

      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/appliance/' + item.appliance_id + '?access_token=' + vm.token, { "appliance": item }).then(function (ress) {
        console.log(ress);
        getData();
      });
    };

    function getData() {

      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/dashboard?access_token=' + AuthService.getToken()).then(function (ress) {
        console.log(ress.data.response.response_body.appliances,AuthService.getToken());
        vm.data = ress.data.response.response_body.appliances;
      });

    }
  }
})();
