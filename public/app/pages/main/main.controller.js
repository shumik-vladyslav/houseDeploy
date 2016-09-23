(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $http, DialogService) {
    var vm = this;

    getData();

    vm.getDesired = function (item) {
      var comfort_status = item.comfort_status[item.comfort_status.length - 1];
      return comfort_status.profiles[comfort_status.profiles.length - 1].set_point;
    };

    vm.swapComfort = function (item, flag) {
      item.comfort_active = flag;
      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/application/'+ item.appliance_id +'?access_token=' + vm.token, item).then(function (ress) {
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
