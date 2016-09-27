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
        url: 'schedule/:applianceId',
        templateUrl: 'app/pages/history/history.html',
        controller: 'HistoryController',
        controllerAs: 'history'
      })
      .state('schedule', {
        url: '/schedule',
        templateUrl: 'app/pages/history/history.html',
        controller: 'HistoryController',
        controllerAs: 'history'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/pages/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        freePage: true
      })
      .state('recovery', {
        url: '/recovery',
        templateUrl: 'app/pages/recovery/recovery.html',
        controller: 'RecoveryController',
        controllerAs: 'recovery'
      })
       .state('register', {
        url: '/register',
        templateUrl: 'app/pages/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'register',
        freePage: true
      }) 
      .state('check', {
        url: '/check',
        templateUrl: 'app/pages/check/check.html',
        controller: 'CheckController',
        controllerAs: 'check'
      })
      .state('info', {
        url: '/info',
        templateUrl: 'app/pages/info/info.html',
        controller: 'InfoController',
        controllerAs: 'info'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
