//Register 'EmployeeService'
//
angular.
	module('project').
	service('ProjectService', function ($q, $http, $localStorage) {
		var data = {};
			  var employees;  
			  
			  var baseURL = "http://127.0.0.1:8000/";
		
			  if($http.defaults.headers.common.hasOwnProperty("Authorization") == false) {
				  $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.currentUser.token;
			  }
		
			  return {
				  setData: function(key, value){
					  data[key] = value;
				  },
				  getData: function(key){
					  return data[key];
				  },
				  getProjects: function(){
					var projects_defer = $q.defer();
					  var req = {
						  method: 'GET',
						  url: baseURL + 'Project/api/project',
						  //cache: false,
					  };
		
					  $http(req).then(function (response) {
						  console.log(response.data);
						  projects_defer.resolve(response.data);
					  }).catch(function onError(error) {
						  console.log(error);
					  });
		
					  return projects_defer.promise;
				  },
				  getProject: function (id) {
					var project_defer = $q.defer();
					  var req = {
						  method: 'GET',
						  url: baseURL + 'Project/api/project/' + id,
						  //cache: false,
					  };
		
					  $http(req).then(function (response) {
						  console.log(response.data);
						  project_defer.resolve(response.data);
					  }).catch(function onError(error) {
						  console.log(error);
					  });
		
					  return project_defer.promise;			  
				  },
				  getPOByProject: function (id) {
					  var po_defer = $q.defer();
					  var req = {
						  method: 'GET',
						  url: baseURL + 'Project/api/pobyproject/' + id,
					  };

					  $http(req).then(function (response) {
						  console.log(response);
						  po+defer.resolve(response.data);
					  }).catch(function onError(error) {
						  console.log(error);
					  })
				  }
		
			  }
		
			  /*this.getEmployees = function (){
				  return this.employees;
			  };
		
			  this.getEmployee = function(username){
				  for (var i=0; i<this.employees.length; i++){
					  if (this.employees[i].user.username == username) return this.employees[i];
				  }
			  };*/
	});
