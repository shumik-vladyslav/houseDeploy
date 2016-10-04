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
        url: '/history/:applianceId',
        templateUrl: 'app/pages/history/history.html',
        controller: 'HistoryController',
        controllerAs: 'history'
      })
       .state('schedule', {
        url: '/schedule/:applianceId',
        templateUrl: 'app/pages/schedule/schedule.html',
        controller: 'ScheduleController',
        controllerAs: 'schedule'
      })
        .state('edit', {
        url: '/edit',
        templateUrl: 'app/pages/scheduledit/scheduledit.html',
        controller: 'ScheduleEditController',
        controllerAs: 'scheduledit'
      })
        .state('solar', {
        url: '/solar',
        templateUrl: 'app/pages/solar/solar.html',
        controller: 'SolarController',
        controllerAs: 'solar'
      })
        .state('batteries', {
        url: '/batteries',
        templateUrl: 'app/pages/batteries/batteries.html',
        controller: 'BatteriesController',
        controllerAs: 'batteries'
      })
        .state('smart', {
        url: '/smart',
        templateUrl: 'app/pages/smart/smart.html',
        controller: 'SmartController',
        controllerAs: 'smart'
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
