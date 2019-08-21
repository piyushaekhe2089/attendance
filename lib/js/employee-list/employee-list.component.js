// Register `employeeList` component, along with its associated controller and template
angular.
	module('employeeList').
	component('employeeList', {  // This name is what AngularJS uses to match to the `<employee-list>` element.
		templateUrl: 'lib/js/employee-list/employee-list.template.html',
		controller: ['$http', 'EmployeeService',
			function EmployeeListController($http, EmployeeService) {
				var $ctrl = this;
				var selectedId = null;

				EmployeeService.getEmployees().then(function (data) {
					$ctrl.employees = data;
				});
			}
		]
	});

