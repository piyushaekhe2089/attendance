//Register 'EmployeeService'
//
angular.
	module('dashboard').
	service('DashboardService', function ($q, $http, $localStorage) {
		var attendance;
		
		
		var month_attandance_defer = $q.defer();

		var baseURL = 'http://127.0.0.1:8000/';

		return {
			getAllMonthAttendance: function (year) {
				var attendance_defer = $q.defer();
				var req = {
					method: 'GET',
					url: baseURL + 'api/attendance/' + year,
					//cache: true,
				};

				$http(req).then(function (response) {
					console.log(response.data);
					attendance_defer.resolve(response.data);
				}).catch(function onError(error) {
					console.log(error);
				});

				return attendance_defer.promise;
			},
			getDayAttendance: function (date=null) {
				var day_attendance_defer = $q.defer();
				var data = {};
				if (date != null){
					data = {'date': date};
				}
				var req = {
					method: 'GET',
					url: baseURL + 'api/attendance/signin',
					data: data,
					//cache: true,
				};

				$http(req).then(function (response) {
					console.log(response.data);
					day_attendance_defer.resolve(response.data);
				}).catch(function onError(error) {
					console.log(error);
				});
				
				return day_attendance_defer.promise;				
			},
			getMonthAttendance: function () {

			},
			getTeamAttendance: function() {
				var team_attendance_defer = $q.defer();
				var req = {
					method: 'GET',
					url: baseURL + 'api/attendance/team/'
				};
  
				$http(req).then(function(response){
					console.log(response.data);
					team_attendance_defer.resolve(response.data);
				}).catch(function onError(error) {
					console.log(error);
				});
  
				return team_attendance_defer.promise;
			},
		}
	});
