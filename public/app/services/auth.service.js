(function () {
  'use strict';

  angular
    .module('app')
    .factory('AuthService', AuthService);

  /** @ngInject */
  function AuthService($http,$state) {
    var data = null;
    var token = '';
    var authorized = false;

    var service = {
      getToken: getToken,
      isAuthorized: isAuthorized,
      Authorized: Authorized,
      
    };

    return service;

    function isAuthorized() {
      if($.cookie('token')){
        token = $.cookie('token');
        authorized = true;
      }
      return authorized;
    }
//  "email": "edu@logic-energy.com",
//         "password": "logicenergy"
    function Authorized(email, password) {
      $http.post('http://sse.logicenergy.com/manager/sse/api/v1/login', {
        "email": email,
        "password": password
      }).then(function (ress) {
        console.log(ress, ress.data.response.response_body.user.access_token)
        token = ress.data.response.response_body.user.access_token;
        $.cookie('token', token);
        authorized = true;
        $state.go('main');
      }, function(){
        return false;
      });
    }

    function getToken() {
      return token;
    }
  }
})();
