//Register 'EmployeeService'
//
angular.
  module('stcsApp').
  service('AuthenticationService', ['$rootScope', '$http', '$localStorage', '$state', '$cacheFactory', '$window', function($q, $http, $localStorage, $state, $cacheFactory, $window){
	  return {
		  login: function(username, password, callback){
			  var req = {
				  method: 'POST',
				  url: 'http://127.0.0.1:8000/api/login',
				  data: {
					  username : username,
					  password : password
				  },
			  };

			  $http(req).then(function(response){
				  console.log(response);
				  if (response.data.token) {
					  // store username and token in local storage 
					  // to keep user logged in between page refreshes
					  $localStorage.currentUser = { 
						  username: username, 
						  token: response.data.token,
						  employee: response.data.employee
					  };

					  // add jwt token to auth header for all requests 
					  // made by the $http service
					  $http.defaults.headers.common.Authorization = 'Token ' + response.data.token;

					  // return callback with true 
					  // to indicate successful login

					  callback(true);
				  } else {
					  callback(false);
				  }
			  })
			  .catch(function onError(error){
				  console.log(error);
			  });
		  },
		  logout: function(callback){
			  delete $localStorage.currentUser;
			  $http.defaults.headers.common.Authorization = '';
		  },
		  isAuthenticated: function(){
			  $localStorage.getItem('token');
		  },
	  }
  }
  ])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, fieldName, callback){
        var fd = new FormData();
        fd.append(fieldName, file);
	var req = {
		method: 'POST',
		url: uploadUrl,
		data: fd,
		transformRequest: angular.identity,
		headers: {
			'Content-Type': undefined
		} 		
	};

	$http(req).then(function(response){
		console.log(response);
		callback(true, response);
	})
	.catch(function onError(response){
		console.log(response);
		callback(false, response);
	});
    } 
}]);

angular.
  module('stcsApp').
  service('PositionService', function($q, $http, $localStorage, $state, geolocation){
	  return {
		  getPosition: function(){
			  var deferred = $q.defer();

			  geolocation.getLocation().then(function(data){
				  var coords = {};
				  coords.lat = data.coords.latitude;
				  coords.lng = data.coors.longitude;
				  console.log(data);
				  deferred.resolve(coords);
			  })

			  return deferred.promise;			  
		  },
	  }
  });