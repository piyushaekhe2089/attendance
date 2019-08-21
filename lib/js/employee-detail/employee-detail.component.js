// Register `employeeDetail` component, along with its associated controller and template

angular.
  module('employeeDetail').
  component('employeeDetail', {
    templateUrl: 'lib/js/employee-detail/employee-detail.template.html',
    controller: ['$http', '$stateParams', 'EmployeeService',
      function EmployeeDetailController($http, $stateParams, EmployeeService) {
	      var self = this;
	      var id = $stateParams.id;

	      EmployeeService.getEmployee(id).then(function(data){
		      self.employee = data;
	      });
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
