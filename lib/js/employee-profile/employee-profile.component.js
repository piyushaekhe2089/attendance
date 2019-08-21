// Register `employeeDetail` component, along with its associated controller and template

angular.
  module('employeeProfile').
  component('employeeProfile', {
    templateUrl: 'lib/js/employee-detail/employee-detail.template.html',
    controller: ['$http', '$stateParams', 'EmployeeService', '$localStorage',
      function EmployeeProfileController($http, $stateParams, EmployeeService, $localStorage) {
	      var self = this;
		  //var username = $stateParams.username;
		  
		  self.employee = $localStorage.currentUser.employee;

	      /*EmployeeService.getEmployeeByUsername(username).then(function(data){
		      self.employee = data;
	      });*/
	      /*
	      var req = {
		      method: 'GET',
		      url: 'http://127.0.0.1:8000/api/employee/' + self.username,
	      }

	      $http(req).then(function(response) {
		      self.employee = response.data;
	      })
	      .catch(function onError(error) {
		      console.log(error);
	      });*/

      }
    ]
  });
