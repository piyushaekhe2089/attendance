// Register `employeeList` component, along with its associated controller and template
angular.
  module('userLoggedIn').
  component('userLoggedIn', {  // This name is what AngularJS uses to match to the `<employee-list>` element.
    templateUrl: 'lib/js/user-logged-in/user-logged-in.template.html',
    controller: ['$http', '$localStorage', 'EmployeeService',
	    function UserLoggedIn($http, $localStorage, EmployeeService) {
		    var $ctrl = this;
		    var username = $localStorage.currentUser.username
		    EmployeeService.getEmployeeByUsername(username).then(function(employee){
			    $ctrl.employee = employee;
		    });
	    }
    ]
  });

