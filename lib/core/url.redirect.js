angular.
  module('core').
  filter('redirect', function() {
    return function(url) {
      window.location = url;
    };
  });
