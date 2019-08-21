// Register `dashboardData` component, along with its associated controller and template

angular.
	module('dashboardData').
	component('dashboardData', {
		templateUrl: 'lib/js/dashboard-data/dashboard-data.template.html',
		controller: ['$http', 'EmployeeService', 'DashboardService', 'geolocation', 'EmployeeService',
			function DashboardDataController($http, EmployeeService, DashboardService, geolocation, EmployeeService) {
				var self = this;
				self.coords = {};
				self.attendance = 0;
				self.year_days = 365;
				self.logged_in_size = 0;
				self.logged_out_size = 0;
				self.team_size = 0;
				self.idle_size = 0;
				self.map = {
					center: {
						lat: 20.5937,
						lng: 78.9629,
						//zoom: 4
					},
				};

				var d = new Date();
				self.today = d;
				self.currentYear = d.getFullYear();

				self.check_in = false;
				self.check_in_time = null;
				/*
						  EmployeeService.getManagers().then(function(managers){
							  self.rgm = managers;
						  });
				*/
				geolocation.getLocation().then(function (data) {
					console.log(data);
					var coords = {};
					self.coords['latitude'] = data.coords.latitude;
					self.coords['longitude'] = data.coords.longitude;
					var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
					url = url + data.coords.longitude + "," + data.coords.latitude + ".json";
					url = url + "?types=poi&access_token=" + mapboxgl.accessToken;
					url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
					url = url + data.coords.latitude + "," + data.coords.longitude;
					url = url + "&result_type=street_address";
	            	url = url + "&key=AIzaSyCzEdQihoBOCqscqtcC6mfIOCVtyhtm-OA";
					var req = {
						method: 'GET',
						url: url,
						headers: {
							'Authorization': undefined
						  }
					};

					$http(req).then(function (response) {
						console.log(response);
						self.coords['address'] = response.data.results[0].formatted_address;
						//self.coords['address'] = response.data.features[0].place_name;
					});
					/*					
					var latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
					var geocoder = geocoder = new google.maps.Geocoder();
					geocoder.geocode({ 'latLng': latlng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								self.coords['address'] = results[1].formatted_address;
								//alert("Location: " + results[1].formatted_address);
							}
						}
					});
					*/
					//deferred.resolve(coords);
				});

				DashboardService.getAllMonthAttendance(self.currentYear).then(function (data) {
					var attendance = 0;
					for (var i = 0; i < data.length; i++) {
						if (data[i].check_in != null) {
							attendance = attendance + 1;
						}
					}
					self.attendance = attendance;
				});

/*
				DashboardService.getDayAttendance(self.today).then(function (data) {
					if (data['attendance'].length == 0) {
						self.check_in = false;
					}
					else {
						self.check_in = true;
						var d = new Date(data[0].check_in);
						self.check_in_time = d.getHours() + ":" + d.getMinutes();
					}
				});
*/
				DashboardService.getDayAttendance(self.today).then(function (data) {
					if(data['claim'].length == 0){
						self.check_in = false;
					}
					else if (data['claim'][0].to_location_time == null){
						self.check_in = true;
						var d = new Date(data['claim'][0].from_location_time);
						self.check_in_time = d.getHours() + ":" + d.getMinutes();						
					}
					else {
						self.check_in = false;
					}
				});
				self.signin = function (signin) {
					var type = "signin";
					if (signin == false){
						type = "signout";
					}
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/attendance/' + type,
						data: {
							'latitude': self.coords['latitude'],
							'longitude': self.coords['longitude'],
							'address': self.coords['address']
						},
					};

					$http(req).then(function (response) {
						alert(response.data['msg']);
						if (type == "signin") {
							//self.attendance = self.attendance + 1;
							self.check_in = true;
							var d = new Date(response.data['attendance'].check_in);
							var claim_date = new Date(response.data['claim'].from_location_time);
							self.check_in_time = claim_date.getHours() + ":" + claim_date.getMinutes();
						}
						else {
							self.check_in = false;
						}
					}).catch(function onError(error) {
						console.log(error);
					});
				};

				DashboardService.getTeamAttendance().then(function (data) {
					var logged_in = data.logged_in;
					self.logged_in_size = data.logged_in.length;
					self.logged_out_size = data.logged_out.length;
					self.team_size = data.team.length;
					self.idle_size = self.team_size - (self.logged_in_size + self.logged_out_size);
					var markers = {};
					var glMarkers = [];
					for (var i=0; i<logged_in.length; i++){
						var loc = logged_in[i].check_in_location.split(",");

						var gm = {
							coordinates: [parseFloat(loc[0]), parseFloat(loc[1])],
							options: {
								anchor: logged_in[i].employee.name,
							},
						};
						glMarkers.push(gm);
						markers[logged_in[i].id] = {
							lat: parseFloat(loc[0]),
							lng: parseFloat(loc[1]),
							title: logged_in[i].employee.name,
							icon: "images/marker-icon.png"
						};
					}
					self.map["markers"] = markers;
					self.map["glMarkers"] = glMarkers;
				})
			/*
							self.signout = function () {
								var req = {
									method: 'POST',
									url: 'http://127.0.0.1:8000/api/attendance/signout',
									data: {
										'latitude': self.coords['latitude'],
										'longitude': self.coords['longitude']
									},
								};
			
								$http(req).then(function (response) {
									alert(response.data['msg']);
								})
									.catch(function onError(error) {
										console.log(error);
									});
							};
			*/
			}
		]
	});
