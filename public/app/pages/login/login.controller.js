(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope, $http, AuthService) {
    var vm = this;

    vm.login = function (email, password) {
      console.log(email, password)
      if (email, password) {
        AuthService.Authorized(email, password)
      }
    };
  }
})();
