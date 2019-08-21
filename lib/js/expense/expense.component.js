// Register `employee` component, along with its associated controller and template
angular.
  module('expense').
  component('expense', {  // This name is what AngularJS uses to match to the `<employee>` element.
    templateUrl: 'lib/js/expense/expense.template.html',
  });
