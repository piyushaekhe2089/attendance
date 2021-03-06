//Register 'EmployeeService'
//
angular.
  module('approvals').
  service('ApprovalsService', function($q, $http, $localStorage){
	  var data = {};
	  var employees;  
	  
	  var baseURL = "http://127.0.0.1:8000/";

	  return {
		  setData: function(key, value){
			  data[key] = value;
		  },
		  getData: function(key){
			  return data[key];
		  },
		  getApprovals: function(){
			  var approvals_defer = $q.defer();
			  var req = {
				  method: 'GET',
				  url: baseURL + 'api/approvals/',
				  //cache: false,
			  };

			  $http(req).then(function (response) {
				  console.log(response.data);
				  approvals_defer.resolve(response.data);
			  }).catch(function onError(error) {
				  console.log(error);
			  });

			  return approvals_defer.promise;
		  },
		  getPhotoApprovals: function() {
			var photo_approvals_defer = $q.defer();
			var req = {
				method: 'GET',
				url: baseURL + 'api/photo_approvals/',
				//cache: false,
			};

			$http(req).then(function (response) {
				console.log(response.data);
				photo_approvals_defer.resolve(response.data);
			}).catch(function onError(error) {
				console.log(error);
			});
			
			return photo_approvals_defer.promise;
		},
		  /*
		  getEmployee: function (id) {
			var employee_defer = $q.defer();
			  var req = {
				  method: 'GET',
				  url: baseURL + 'api/employee/' + id,
				  //cache: false,
			  };

			  $http(req).then(function (response) {
				  console.log(response.data);
				  employee_defer.resolve(response.data);
			  }).catch(function onError(error) {
				  console.log(error);
			  });

			  return employee_defer.promise;			  
		  },
		  getEmployeeByUsername: function (username) {
			var employee_by_username_defer = $q.defer();
			  var req = {
				  method: 'GET',
				  url: baseURL + 'api/employee/' + username,
				  //cache: false,
			  };

			  $http(req).then(function (response) {
				  console.log(response.data);
				  employee_by_username_defer.resolve(response.data);
			  }).catch(function onError(error) {
				  console.log(error);
			  });

			  return employee_by_username_defer.promise;
		  },
		  getManagers: function() {
			var manager_defer = $q.defer();
			  var req = {
				  method: 'GET',
				  url: baseURL + 'api/employee_rgm/',
				  //cache: false,
			  };

			  $http(req).then(function (response) {
				  console.log(response.data);
				  manager_defer.resolve(response.data);
			  }).catch(function onError(error) {
				  console.log(error);
			  });

			  return manager_defer.promise;			  
		  },
		  getEmployeePhoto: function(id) {
			  return this.getEmployee(id).then(function(employee){
				  var emp = {};
				  emp["id"] = id;
				  emp["name"] = employee.name;
				  emp["image"] = employee.image;
				  emp["image_url"] = employee.image_url;
				  emp["image_approved"] = employee.image_approved;
				  return emp;
			  })
		  },
		  */
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
