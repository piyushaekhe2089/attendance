// Register `employee` component, along with its associated controller and template
angular.
  module('employee').
  component('employee', {  // This name is what AngularJS uses to match to the `<employee>` element.
    templateUrl: 'lib/js/employee/employee.template.html',
  });
