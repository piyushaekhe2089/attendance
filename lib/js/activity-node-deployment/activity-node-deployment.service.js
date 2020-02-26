//Register 'EmployeeService'
//
angular.
    module('activityNodeDeployment').
    service('NodeActivityService', function ($q, $http, $localStorage) {
        var data = {};
        var activities;

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
            getActivities: function () {
                var activities_defer = $q.defer();
                var req = {
                    method: 'GET',
                    url: baseURL + 'Project/api/project/nodedeploymentactivity/',
                    //cache: false,
                };

                $http(req).then(function (response) {
                    console.log(response.data);
                    activities_defer.resolve(response.data);
                }).catch(function onError(error) {
                    console.log(error);
                });

                return activities_defer.promise;
            },
            getActivity: function (id) {
                var activity_defer = $q.defer();
                var req = {
                    method: 'GET',
                    url: baseURL + 'Project/api/project/' + id,
                    //cache: false,
                };

                $http(req).then(function (response) {
                    console.log(response.data);
                    activity_defer.resolve(response.data);
                }).catch(function onError(error) {
                    console.log(error);
                });

                return activity_defer.promise;
            },
        }

        /*this.getEmployees = function (){
            return this.employees;
        };
	
        this.getEmployee = function(username){
            for (var i=0; i<this.employees.length; i++){
                if (this.employees[i].user.username == username) return this.employees[i];
            }
        };*/
    });
