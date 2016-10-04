(function () {
    'use strict';

    angular
        .module('app')

        .directive('headMenu',
        function ($timeout) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/common/head/head.html',
                link: function (scope, element, attrs) {
                }
            }
        });
})();
