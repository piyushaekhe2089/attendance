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
