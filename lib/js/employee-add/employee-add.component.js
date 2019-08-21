// Register `employeeDetail` component, along with its associated controller and template

angular.
	module('employeeAdd').
	component('employeeAdd', {
		templateUrl: 'lib/js/employee-add/employee-add.template.html',
		controller: ['$http', 'EmployeeService',
			function EmployeeAddController($http, EmployeeService) {
				var self = this;
				self.error = false;
				self.success = false;
				self.employee = {};
				var req = {
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/employee_form',
				};

				$http(req).then(function (response) {
					self.ow_choices = response.data.ow_choices;
					self.mf_choices = response.data.mf_choices;
					self.pb_choices = response.data.pb_choices;
					self.role_choices = response.data.role_choices;
					self.circles = response.data.circles;
					self.roles = response.data.roles;
					self.designations = response.data.designations;
					self.own_partner = response.data.own_partner;
				})
					.catch(function onError(error) {
						console.log(error);
					});

				EmployeeService.getManagers().then(function (managers) {
					self.rgm = managers;
				});
				/*var req = {
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/employee_rgm',
				}
	  
				$http(req).then(function(response) {
					self.rgm = response.data;
				})
				.catch(function onError(error) {
					console.log(error);
				});*/

				self.master = angular.copy(self.employee);

				self.save = function save() {
					self.employee['circle_id'] = self.employee.circle;
					self.employee['designation_id'] = self.employee.designation;
					self.employee['role_id'] = self.employee.role;
					self.employee['own_partner_id'] = self.employee.own_partner;
					self.employee['reporting_manager_set'] = self.employee.reporting_manager;
					self.employee['regional_manager_set'] = self.employee.regional_manager;
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/employee/',
						data: self.employee,
					};

					$http(req).then(function (response) {
						self.success = true;
					})
					.catch(function onError(error) {
						self.error = true;
						console.log(error);
					});

				};

			}
		]
	});
