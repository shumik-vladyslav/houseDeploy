(function () {
  'use strict';

  angular
    .module('app')
    .controller('HistoryController', HistoryController);

  /** @ngInject */
  function HistoryController($rootScope, $http, $state, DialogService) {
    var vm = this;
    console.log($state.params.applianceId,AmCharts)
    getData();

    function getData() {
      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/login', {
        "email": "edu@logic-energy.com",
        "password": "logicenergy"
      }).then(function (ress) {
        console.log(ress.data.response.response_body.user.access_token);
        vm.token = ress.data.response.response_body.user.access_token;
        $http.post('http://sse.logicenergy.com/manager/sse/api/v1/dashboard?access_token=' + vm.token).then(function (ress) {
          console.log(ress.data.response.response_body.appliances);
          var object = ress.data.response.response_body.appliances;
          for (var key in object) {
            if (object.hasOwnProperty(key)) {
              var element = object[key];
              if(element.appliance_id === $state.params.applianceId){
                vm.data = element.comfort_status;

                
              }
            }
          }
        });
      });
      
    }
  }
})();
