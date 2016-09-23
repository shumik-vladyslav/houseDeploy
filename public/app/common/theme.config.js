(function() {
    'use strict';

    angular
        .module('app')
        .config(themeConfig);

    /** @ngInject */
    function themeConfig($mdThemingProvider) {
        $mdThemingProvider.definePalette('navBack', {
            '50': '#63dfff',
            '100': '#17d0ff',
            '200': '#00b1de',
            '300': '#007896',
            '400': '#005f78',
            '500': '#004759',
            '600': '#002f3a',
            '700': '#00161c',
            '800': '#000000',
            '900': '#000000',
            'A100': '#63dfff',
            'A200': '#17d0ff',
            'A400': '#005f78',
            'A700': '#00161c',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100 A200'
        });

        $mdThemingProvider.definePalette('white', {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#ffffff',
            '600': '#f0f0f0',
            '700': '#e0e0e0',
            '800': '#d1d1d1',
            '900': '#c2c2c2',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#e0e0e0',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
        });

        $mdThemingProvider.definePalette('bottomSheet', {
            '50': '#8fe8ff',
            '100': '#43d9ff',
            '200': '#0bcdff',
            '300': '#009bc2',
            '400': '#0082a4',
            '500': '#006a85',
            '600': '#005266',
            '700': '#003948',
            '800': '#002129',
            '900': '#00080b',
            'A100': '#8fe8ff',
            'A200': '#43d9ff',
            'A400': '#0082a4',
            'A700': '#003948',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100 A200'
        });

        $mdThemingProvider.definePalette('subBar', {
            '50': '#cdedf0',
            '100': '#b9e6ea',
            '200': '#a6dee4',
            '300': '#92d7de',
            '400': '#7fd0d8',
            '500': '#6bc9d2',
            '600': '#57c2cc',
            '700': '#44bbc6',
            '800': '#38adb8',
            '900': '#329ba5',
            'A100': '#e0f4f6',
            'A200': '#f4fbfc',
            'A400': '#ffffff',
            'A700': '#2c8891',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100 A200'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('white')
            .accentPalette('orange');

        $mdThemingProvider.theme('navGuest')
            .primaryPalette('white');

        $mdThemingProvider.theme('navAuth')
            .primaryPalette('navBack');
            
        $mdThemingProvider.theme('bottomSheet')
            .primaryPalette('bottomSheet');
        
        $mdThemingProvider.theme('subBar')
            .primaryPalette('subBar');

        $mdThemingProvider.alwaysWatchTheme(true);
    }
})();
