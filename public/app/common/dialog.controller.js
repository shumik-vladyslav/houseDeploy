(function () {
    'use strict';

    angular
        .module('app')

        .directive('myElem',
        function ($timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    chart: '@',
                    data: '='
                },
                template: '<div id="chartdiv{{chart}}" style="height: 90%; margin: 0 auto;width: 100%;"></div>',
                link: function (scope, element, attrs) {
                    var chart = false;
                    for (var i = 0; i <= scope.data.length; i++) {
                        if (scope.data[i]) {
                            if (scope.data[i].visits < 15) {
                                scope.data[i].color = "#6cbad7";
                                continue;
                            }
                            if (scope.data[i].visits < 18) {
                                scope.data[i].color = "#edaa30";
                                continue;

                            }
                            if (scope.data[i].visits < 21) {
                                scope.data[i].color = "#89ae60";
                                continue;
                            }

                            if (scope.data[i].visits < 22) {
                                scope.data[i].color = "#c96961";
                            }
                        }
                    }
                    var initChart = function () {
                        if (chart) chart.destroy();
                        var config = scope.config || {};
                        chart = AmCharts.makeChart("chartdiv" + scope.chart, {
                            "theme": "light",
                            "type": "serial",
                            "startDuration": 2,
                            "dataProvider": scope.data,
                            "valueAxes": [{
                                "position": "top",
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                fontSize: 7,
                                "labelFunction": function (valueText, serialDataItem, categoryAxis) {


                                    // if (!serialDataItem.dataContext.show) {
                                    return serialDataItem + "°C";
                                    // }

                                    // return valueText;
                                },
                            }],
                            "graphs": [{
                                "balloonText": "<b>[[value]] &deg;C</b>",
                                "colorField": "color",
                                "fillAlphas": 0.85,
                                "lineAlpha": 0.1,
                                "type": "column",
                                "topRadius": 1,
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
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "position": "top",
                                "labelFunction": function (valueText, serialDataItem, categoryAxis) {
                                    // console.log(valueText, serialDataItem, categoryAxis)

                                    // if (!serialDataItem.dataContext.show) {
                                    return;
                                    // }

                                    // return valueText;
                                },


                            },
                            "export": {
                                "enabled": true
                            }

                        });


                    };

                    $timeout(function () {
                        initChart();

                    }, 100);
                }
            }
        });
})();
