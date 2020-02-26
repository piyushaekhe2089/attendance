// Register `employeeDetail` component, along with its associated controller and template

angular.
	module('projectAdd').
	component('projectAdd', {
		templateUrl: 'lib/js/project-add/project-add.template.html',
		controller: ['$http', 'EmployeeService',
			function ProjectAddController($http, EmployeeService) {
				var self = this;
				self.error = false;
				self.success = false;
				self.project = {};
				self.project.quote_set = [{}];
/*				var req = {
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
*/
				EmployeeService.getManagers().then(function (managers) {
					self.rgm = managers;
				});

				self.updateEmail = function () {
					self.project.stcs_project_manager_email = self.project.stcs_project_manager.company_email;
				}
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

				self.master = angular.copy(self.project);

				self.save = function save() {
					self.project["customer_name"] = self.project.customer_name;
					self.project["project_name"] = self.project.project_name;
					self.project["stcs_project_manager_id"] = self.project.stcs_project_manager.id
					self.project["stcs_project_manager"] = self.project.stcs_project_manager;
					self.project["customer_project_manager"] = self.project.customer_project_manager;
					self.project["customer_project_manager_email"] = self.project.customer_project_manager_email;
					self.project["quote_set"] = self.project.quote_set;
					
					
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/Project/api/project/',
						data: self.project,
					};
/*
					$http(req).then(function (response) {
						self.success = true;
					})
					.catch(function onError(error) {
						self.error = true;
						console.log(error);
					});
*/
				};
			}			
		]
	});
