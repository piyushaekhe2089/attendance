// Register `employeeDetail` component, along with its associated controller and template

angular.
  module('employeeEdit').
  component('employeeEdit', {
    templateUrl: 'lib/js/employee-edit/employee-edit.template.html',
    controller: ['$http', '$stateParams', 'EmployeeService', 
      function EmployeeEditController($http, $stateParams, EmployeeService) {
	      var self = this;
	      self.emp_id = $stateParams.id;
	      self.error = false;
	      self.success = false;
	      self.employee = {};
	      var req = {
		      method: 'GET',
		      url: 'http://127.0.0.1:8000/api/employee_form',
	      };

	      $http(req).then(function(response) {
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

	      EmployeeService.getManagers().then(function(managers){
		      self.rgm = managers;
	      });

	      EmployeeService.getEmployee(self.emp_id).then(function(data){
		      self.employee = data;
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

	      self.save = function save(){
	             self.employee['circle_id'] = self.employee.circle.id;
		     self.employee['designation_id'] = self.employee.designation.id;
		     self.employee['role_id'] = self.employee.role.id;
		     self.employee['own_partner_id'] = self.employee.own_partner.id;
		     var managers = [];
		     for (var i=0; i<self.employee.reporting_manager.length; i++) {
			     managers.push(self.employee.reporting_manager[i].id)
		     }
	             self.employee['reporting_manager_set'] = managers;

		     var managers = [];
		     for (var i=0; i<self.employee.regional_manager.length; i++) {
			     managers.push(self.employee.regional_manager[i].id)
		     }
	             self.employee['regional_manager_set'] = managers;
	             //self.employee['reporting_manager_set'] = self.employee.reporting_manager;
	             //self.employee['regional_manager_set'] = self.employee.regional_manager;
		      var req = {
			      method: 'POST',
			      url: 'http://127.0.0.1:8000/api/employee/edit/' + self.emp_id,
			      data: self.employee,
		      };

		      $http(req).then(function(response){
			      self.success = true;
		      })
		      .catch(function onError(error){
			      self.error = true;
			      console.log(error);
		      });
		      
	      };

      }
    ]
  });
