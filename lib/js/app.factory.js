angular.
  module('stcsApp').
  factory("Access", ["$q", "AuthenticationService", function ($q, AuthenticationService) {
    var Access = {
        OK: 200,

        // "we don't know who you are, so we can't say if you're authorized to access
        // this resource or not yet, please sign in first"
        UNAUTHORIZED: 401,

        // "we know who you are, and your profile does not allow you to access this resource"
        FORBIDDEN: 403,

        isAuthenticated: function () {
            if (AuthenticationService.isAuthenticated()) {
                return Access.OK;
            } 
            else {
                return $q.reject(Access.UNAUTHORIZED);
            }
        },

        isAnonymous: function () {
            if (AuthenticationService.isAuthenticated()) {
                return $q.reject(Access.FORBIDDEN)
            } else {
                return Access.OK;
            }
        },
    };

    return Access;
}]);