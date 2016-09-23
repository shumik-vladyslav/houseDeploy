(function () {
  'use strict';

  angular
    .module('app')

    .directive('myElem',
    function () {
      return {
        restrict: 'E',
        replace: true,

        template: '<div id="chartdiv" style="height: 100%; margin: 0 auto"></div>',
        link: function (scope, element, attrs) {

          var chart = false;

          var initChart = function () {
            if (chart) chart.destroy();
            var config = scope.config || {};
            chart = AmCharts.makeChart("chartdiv", {
    "theme": "light",
    "type": "serial",
    "startDuration": 2,
    "dataProvider": [{
        "country": "00:00",
        "visits": 25,
        "color": "#FF0F00"
    }, {
        "country": "01:00",
        "visits": 21,
        "color": "#FF6600"
    }, {
        "country": "02:00",
        "visits": 22,
        "color": "#FF9E01"
    }, {
        "country": "03:00",
        "visits": 15,
        "color": "#FCD202"
    }, {
        "country": "04:00",
        "visits": 17,
        "color": "#F8FF01"
    }, {
        "country": "05:00",
        "visits": 18,
        "color": "#B0DE09"
    }, {
        "country": "06:00",
        "visits": 19,
        "color": "#04D215"
    }, {
        "country": "07:00",
        "visits": 29,
        "color": "#0D8ECF"
    }, {
        "country": "08:00",
        "visits": 25,
        "color": "#0D52D1"
    }, {
        "country": "09:00",
        "visits": 24,
        "color": "#2A0CD0"
    }, {
        "country": "10:00",
        "visits": 25,
        "color": "#8A0CCF"
    }, {
        "country": "11:00",
        "visits": 24,
        "color": "#CD0D74"
    }, {
        "country": "12:00",
        "visits": 23,
        "color": "#754DEB"
    }, {
        "country": "13:00",
        "visits": 23,
        "color": "#DDDDDD"
    }, {
        "country": "14:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "15:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "16:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "17:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "18:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "19:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "20:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "21:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "22:00",
        "visits": 23,
        "color": "#333333"
    }, {
        "country": "23:00",
        "visits": 23,
        "color": "#333333"
    }],
    "valueAxes": [{
        "position": "top",
        "axisAlpha":0,
        "gridAlpha":0
    }],
    "graphs": [{
        "balloonText": "<b>[[value]] &deg;C</b>",
        "colorField": "color",
        "fillAlphas": 0.85,
        "lineAlpha": 0.1,
        "type": "column",
        "topRadius":1,
        "valueField": "visits"
    }],
    "depth3D": 5,
	"angle": 6,
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "country",
    "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha":0,
        "gridAlpha":0,
        "position": "top",
        labelsEnabled: false


    },
    "export": {
    	"enabled": true
     }

});


          };
          initChart();

        }
      }
    });
})();
