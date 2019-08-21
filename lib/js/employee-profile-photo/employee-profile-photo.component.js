// Register `employeeDetail` component, along with its associated controller and template

angular.
  module('employeeProfilePhoto').
  component('employeeProfilePhoto', {
    templateUrl: 'lib/js/employee-profile-photo/employee-profile-photo.template.html',
    controller: ['$http', '$stateParams', 'EmployeeService', 'fileUpload',
      function EmployeeProfilePhotoController($http, $stateParams, EmployeeService, fileUpload) {
	      var self = this;
	      self.emp_id = $stateParams.id;
	      self.error = false;
	      self.success = false;
	      self.employee = {};
/*	      
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
*/
	      EmployeeService.getEmployeePhoto(self.emp_id).then(function(data){
		      self.employee = data;
//		      alert(self.employee.designation.name);
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
		      var file = self.employee.image;
		      var uploadUrl = 'http://127.0.0.1:8000/api/employee/upload_profile_photo/' + self.emp_id;
		      var fieldName = "image";
		      fileUpload.uploadFileToUrl(file, uploadUrl, fieldName, function(result, response){
			      if(result == true){
				      console.log(response);
				      self.employee = response.data;
				      self.success = true;
				      self.error = false;
			      }else{
				      console.data(response)
				      self.error = true;
				      self.success = false;
			      }
		      });
/*		      
		      var req = {
			      method: 'POST',
			      url: 'http://127.0.0.1:8000/api/employee/upload_profile_photo/' + self.emp_id,
			      data: self.employee,
		      };

		      $http(req).then(function(response){
			      self.success = true;
		      })
		      .catch(function onError(error){
			      self.error = true;
			      console.log(error);
		      });
*/		      
		      
	      };

      }
    ]
  });
