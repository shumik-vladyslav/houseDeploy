(function () {
  'use strict';

  angular
    .module('app')
    .controller('HistoryController', HistoryController) .controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
  });

  /** @ngInject */
  function HistoryController($scope, $mdSidenav,$rootScope, $http, $state) {
    var vm = this;
     $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
    console.log($state.params.applianceId)
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
              //if (element.appliance_id === $state.params.applianceId) {
                let tem = element.comfort_status[0].$$hashKey = "sd"
                element.comfort_status.push(tem)
                vm.data = element.comfort_status;

              //}
            }
          }
        });
      });

    }

    vm.chartData = [
      {
        "country": "00:00",
        "visits": 13
      }, {
        "country": "01:00",
        "visits": 14
      }, {
        "country": "02:00",
        "visits": 15
      }, {
        "country": "03:00",
        "visits": 15
      }, {
        "country": "04:00",
        "visits": 17,
      }, {
        "country": "05:00",
        "visits": 18,
      }, {
        "country": "06:00",
        "visits": 19,
      }, {
        "country": "07:00",
        "visits": 14,
      }, {
        "country": "08:00",
        "visits": 25,
      }, {
        "country": "09:00",
        "visits": 15,
      }, {
        "country": "10:00",
        "visits": 25,
      }, {
        "country": "11:00",
        "visits": 24,
      }, {
        "country": "12:00",
        "visits": 23,
      }, {
        "country": "13:00",
        "visits": 23,
      }, {
        "country": "14:00",
        "visits": 23,
      }, {
        "country": "15:00",
        "visits": 22,
      }, {
        "country": "16:00",
        "visits": 23,
      }, {
        "country": "17:00",
        "visits": 22,
      }, {
        "country": "18:00",
        "visits": 22,
      }, {
        "country": "19:00",
        "visits": 22,
      }, {
        "country": "20:00",
        "visits": 23,
      }, {
        "country": "21:00",
        "visits": 23,
      }, {
        "country": "22:00",
        "visits": 17,
      }, {
        "country": "23:00",
        "visits": 23,
      },
      {
        "country": "00:00",
        "visits": 15,
      }]


   
  }
})();
