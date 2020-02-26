//Register 'EmployeeService'
//
angular.
	module('stcsApp')
	.service('AuthenticationService', ['$rootScope', '$http', '$localStorage', '$state', '$cacheFactory', '$window', function ($q, $http, $localStorage, $state, $cacheFactory, $window) {
		return {
			login: function (username, password, callback) {
				var req = {
					method: 'POST',
					url: 'http://127.0.0.1:8000/api/login',
					data: {
						username: username,
						password: password
					},
				};

				$http(req).then(function (response) {
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

						callback(true, response.data);
					} else {
						callback(false, response.data);
					}
				})
					.catch(function onError(error) {
						console.log(error);
						callback(false, error.data.errors);
					});
			},
			logout: function (callback) {
				delete $localStorage.currentUser;
				$http.defaults.headers.common.Authorization = '';
			},
			isAuthenticated: function () {
				if ($localStorage.hasOwnProperty('currentUser')) {
					if ($localStorage.currentUser.hasOwnProperty('token') != null) {
						return true;
					}
				}
				return false;
			},
			getUserProfile: function () {
				return $localStorage.currentUser.employee;
			}
		}
	}])
	.service('fileUpload', ['$http', function ($http) {
		this.uploadFileToUrl = function (file, uploadUrl, fieldName, callback) {
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

			$http(req).then(function (response) {
				console.log(response);
				callback(true, response);
			})
			.catch(function onError(response) {
				console.log(response);
				callback(false, response);
			});			
		};

		this.uploaFilesToUrl = function (files, uploadUrl, fieldName, callback) {
			var fd = FormData();
			fd.append(fieldName, files);
		}
	}]);
