// Register `base` component, along with its associated controller and template
angular.
	module('base').
	component('base', {  // This name is what AngularJS uses to match to the `<employee-list>` element.
		templateUrl: 'lib/js/base/base.template.html',
		controller: ['$q', '$http', '$localStorage', '$state', '$timeout', 'EmployeeService', 'AuthenticationService', 'geolocation',
			function BaseController($q, $http, $localStorage, $state, $timeout, EmployeeService, AuthenticationService, geolocation) {
				var self = this;
				self.coords = {};
				/*		    GeoLocationService.getPosition().then(function(coords){
								self.coords.lattitude = coords.lat;
								self.coords.logitude = coords.lon;
							});
				
							var deferred = $q.defer();
							geolocation.getLocation().then(function(data){
								  console.log(data);
								  var coords = {};
								  self.coords['latitude'] = data.coords.latitude;
								  self.coords['longitude'] = data.coords.longitude;
								  //deferred.resolve(coords);
							  });
				*/
				self.employee = $localStorage.currentUser.employee;
				/*EmployeeService.getEmployeeByUsername($localStorage.currentUser.username).then(function (employee) {
					self.employee = employee;
				});*/
				//self.user = $localStorage.currentUser;

				self.logout = function () {
					AuthenticationService.logout();
					$timeout(function () {
						$state.go('login');
					}, 0);
				};


			}]
	});
