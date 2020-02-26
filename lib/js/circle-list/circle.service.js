//Register 'EmployeeService'
//
angular.
    module('circleList').
    service('CircleService', function ($q, $http, $localStorage) {
        var data = {};
        var circles;

        var baseURL = "http://127.0.0.1:8000/";

        if ($http.defaults.headers.common.hasOwnProperty("Authorization") == false) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.currentUser.token;
        }

        return {
            setData: function (key, value) {
                data[key] = value;
            },
            getData: function (key) {
                return data[key];
            },
            getCircles: function () {
                var circles_defer = $q.defer();
                var req = {
                    method: 'GET',
                    url: baseURL + 'api/circle',
                    //cache: false,
                };

                $http(req).then(function (response) {
                    console.log(response.data);
                    circles_defer.resolve(response.data);
                }).catch(function onError(error) {
                    console.log(error);
                });

                return circles_defer.promise;
            },
        }
    });
