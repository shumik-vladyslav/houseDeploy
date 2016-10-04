(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function () {
          $mdSidenav(componentId).toggle();
        }
      }
    });
});

