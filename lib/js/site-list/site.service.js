//Register 'EmployeeService'
//
angular.
    module('siteList').
    service('SiteService', function ($q, $http, $localStorage) {
        var data = {};
        var sites;

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
            getSites: function () {
                var sites_defer = $q.defer();
                var req = {
                    method: 'GET',
                    url: baseURL + 'Project/api/project/site',
                    //cache: false,
                };

                $http(req).then(function (response) {
                    console.log(response.data);
                    sites_defer.resolve(response.data);
                }).catch(function onError(error) {
                    console.log(error);
                });

                return sites_defer.promise;
            },
        }
    });
