(function () {
  'use strict';

  angular
    .module('app')
    .factory('DialogService', DialogService);

  /** @ngInject */
  function DialogService($http) {
    var data = null;
    var token = '';

    var service = {
      getData: getData
    };

    $http.post('http://sse.logicenergy.com/manager/sse/api/v1/login', {
      "email": "edu@logic-energy.com",
      "password": "logicenergy"
    }).then(function (ress) {
      console.log(ress.data.response.response_body.user.access_token);
      token = ress.data.response.response_body.user.access_token;

      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/dashboard?access_token=' + token).then(function (ress) {
        console.log(ress.data.response.response_body.appliances);
        data = ress.data.response.response_body.appliances;

      });

    });

    return service;



    function getData() {
      return data;
    }
  }
})();
