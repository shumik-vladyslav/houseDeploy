(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($mdIconProvider) {
    $mdIconProvider
       .defaultIconSet('./assets/icons/svg-sprite-action.svg')
       .iconSet('content', './assets/icons/svg-sprite-content.svg')
       .iconSet('social', './assets/icons/svg-sprite-social.svg');
  }

})();
