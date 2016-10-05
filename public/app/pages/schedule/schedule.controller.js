(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScheduleController', ScheduleController).controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            function buildToggler(componentId) {
                return function () {
                    $mdSidenav(componentId).toggle();
                }
            }
        });

    /** @ngInject */
    function ScheduleController($scope, $mdSidenav, $rootScope, $http, $state, AuthService) {
        var vm = this;
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
        console.log($state.params.applianceId)
        getData();

        function getData() {


            $http.post('http://sse.logicenergy.com/manager/sse/api/v1/dashboard?access_token=' + AuthService.getToken()).then(function (ress) {
                console.log(ress.data.response.response_body.appliances, AuthService.getToken());
                var object = ress.data.response.response_body.appliances;
                var tmp = {};
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        var element = object[key];
                        //if (element.appliance_id === $state.params.applianceId) {
                        console.log(element.comfort_status[0])
                        tmp.day = 4;
                        element.comfort_status.push(tmp);

                        vm.data = vm.chartData;
                        tmp = element.comfort_status[0];

                        for (var k in vm.chartData) {
                            var day = vm.chartData[k].day;
                            for (var p in vm.chartData[k].profiles) {
                                var set_point = vm.chartData[k].profiles[p].set_point;
                                var start = vm.chartData[k].profiles[p].start_time.split(":");
                                var finish = vm.chartData[k].profiles[p].finish_time.split(":");
                                var start_h = +start[0];
                                var finish_h = +finish[0];
                                var start_m = +start[1].charAt(0);
                                var finish_m = +finish[1].charAt(0);
                                console.log(start_h, finish_h, start_m, finish_m);

                                for (var i = start_h; i <= finish_h; i++) {
                                    for (var j = start_m; j <= 5; j++) {
                                        setBack(day, i, j, set_point);
                                    }
                                    start_m = 0;
                                }
                            }
                        }
                        vm.show = true;
                        //}
                    }
                }
            });

        }

        function setBack(day, i, j, point) {
            var back = "#c46a56";
            console.log(point)


            if (point < 21) {
                back = "#f29a28";
            }
            if (point < 18) {
                back = "#5ca34d";
            }
            if (point < 15) {
                back = "#68aec5";
            }
            vm.hours[day - 1][i].min[j] = back;
        }


        vm.chartData = [
            {
                "day": 1,
                "profiles":
                [{ "set_point": 14, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 18, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 22, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 28, "start_time": "18:00", "finish_time": "22:00" }]
            },
            {
                "day": 2,
                "profiles":
                [{ "set_point": 11, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 16, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 22, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 22, "start_time": "18:00", "finish_time": "22:00" }]
            },
            {
                "day": 3,
                "profiles":
                [{ "set_point": 15, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 22, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 22, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 20, "start_time": "18:00", "finish_time": "22:00" }]
            },
            {
                "day": 4,
                "profiles":
                [{ "set_point": 18, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 22, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 21, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 22, "start_time": "18:00", "finish_time": "22:00" }]
            },
            {
                "day": 5,
                "profiles":
                [{ "set_point": 22, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 18, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 22, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 22, "start_time": "18:00", "finish_time": "22:00" }]
            },
            {
                "day": 6,
                "profiles":
                [{ "set_point": 22, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 28, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 22, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 16, "start_time": "18:00", "finish_time": "22:00" }]
            },
            {
                "day": 7,
                "profiles":
                [{ "set_point": 22, "start_time": "06:30", "finish_time": "09:30" },
                    { "set_point": 11, "start_time": "11:00", "finish_time": "13:00" },
                    { "set_point": 22, "start_time": "15:00", "finish_time": "17:00" },
                    { "set_point": 14, "start_time": "18:00", "finish_time": "22:00" }]
            },
        ]

        vm.hours = [
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ],
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ],
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ],
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ],
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ],
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ],
            [
                { h: "00", min: ["", "", "", "", "", "",] },
                { h: "01", min: ["", "", "", "", "", "",] },
                { h: "02", min: ["", "", "", "", "", "",] },
                { h: "03", min: ["", "", "", "", "", "",] },
                { h: "04", min: ["", "", "", "", "", "",] },
                { h: "05", min: ["", "", "", "", "", "",] },
                { h: "06", min: ["", "", "", "", "", "",] },
                { h: "07", min: ["", "", "", "", "", "",] },
                { h: "08", min: ["", "", "", "", "", "",] },
                { h: "09", min: ["", "", "", "", "", "",] },
                { h: "10", min: ["", "", "", "", "", "",] },
                { h: "11", min: ["", "", "", "", "", "",] },
                { h: "12", min: ["", "", "", "", "", "",] },
                { h: "13", min: ["", "", "", "", "", "",] },
                { h: "14", min: ["", "", "", "", "", "",] },
                { h: "15", min: ["", "", "", "", "", "",] },
                { h: "16", min: ["", "", "", "", "", "",] },
                { h: "17", min: ["", "", "", "", "", "",] },
                { h: "18", min: ["", "", "", "", "", "",] },
                { h: "19", min: ["", "", "", "", "", "",] },
                { h: "20", min: ["", "", "", "", "", "",] },
                { h: "21", min: ["", "", "", "", "", "",] },
                { h: "22", min: ["", "", "", "", "", "",] },
                { h: "23", min: ["", "", "", "", "", "",] },
            ]
        ]



    }
})();
