(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $timeout, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, data) {
      if (!AuthService.isAuthorized() && !data.freePage) {
        $timeout(function () {
          $state.go('login');
        }, 0);
      }
    });
    $log.debug('runBlock end');
  }

})();
