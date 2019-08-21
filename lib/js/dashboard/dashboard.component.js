// Register `dashboard` component, along with its associated controller and template
angular.
  module('dashboard').
  component('dashboard', {  // This name is what AngularJS uses to match to the `<dashboard>` element.
    templateUrl: 'lib/js/dashboard/dashboard.template.html',
  });
