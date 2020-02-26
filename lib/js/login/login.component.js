// Register `login` component, along with its associated controller and template

angular.
module('login').
component('login', {
	templateUrl: 'lib/js/login/login.template.html',
	controller: ['$http', '$state', '$localStorage', '$timeout', 'AuthenticationService',
		function LoginController($http, $state, $localStorage, $timeout, AuthenticationService) {
			var self = this;
			self.error = false;
			self.success = false;
			self.user = {};
			self.usernameError = '';
			self.passwordError = '';

			self.login = function () {
				self.error = '';
				self.passwordError = '';
				self.usernameError = '';
				self.master = angular.copy(self.user);
				AuthenticationService.login(self.master.username, self.master.password,
					function (result, data) {
						if (result == true) {
							//$state.go('base.employee.detail', { 'id': $localStorage.currentUser.employee.id });
							$state.go('base.employee.profile');

							/*EmployeeService.getEmployeeByUsername($localStorage.currentUser.username).then(function(employee){
								//$location.path('/employee/list');
								state = "#!/employee/" + employee.id;
								$state.go('base.employee.detail', {'id': employee.id});
							});*/
						} else {
							//self.success = false;
							if (data.error) {
								self.error = data.error[0];
							}
							if (data.password) {
								self.passwordError = data.password[0];
							}
							if (data.username) {
								self.usernameError = data.username[0];
							}
						}
					})
			}

			self.clearError = function () {
				self.error = '';
				self.usernameError = '';
				self.passwordError = '';
			}

		}
	]
});
