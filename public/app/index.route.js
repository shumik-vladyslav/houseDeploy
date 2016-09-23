(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/pages/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('history', {
        url: '/:applianceId',
        templateUrl: 'app/pages/history/history.html',
        controller: 'HistoryController',
        controllerAs: 'history'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
