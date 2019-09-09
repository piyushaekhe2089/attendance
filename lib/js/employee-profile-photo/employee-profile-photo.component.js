// Register `employeeProfilePhoto` component, along with its associated controller and template

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

			EmployeeService.getEmployeePhoto(self.emp_id).then(function (data) {
				self.employee = data;
				//alert(self.employee.designation.name);
			});


			self.master = angular.copy(self.employee);

			self.save = function save() {
				var file = self.employee.image;
				var uploadUrl = 'http://127.0.0.1:8000/api/employee/upload_profile_photo/' + self.emp_id;
				var fieldName = "image";
				fileUpload.uploadFileToUrl(file, uploadUrl, fieldName, function (result, response) {
					if (result == true) {
						console.log(response);
						self.employee = response.data;
						self.success = true;
						self.error = false;
					} else {
						console.data(response)
						self.error = true;
						self.success = false;
					}
				});
			};
		}
	]
});
