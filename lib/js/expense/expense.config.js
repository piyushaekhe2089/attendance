angular.
  module('employee').
  config(['$routeProvider',
	  function config($routeProvider){
		  $routeProvider.
			  when('/list', {
				  template: '<employee-list></employee-list>'
			  })
	  }
  ]);
