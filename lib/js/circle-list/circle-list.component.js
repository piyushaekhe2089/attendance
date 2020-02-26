// Register `circleList` component, along with its associated controller and template
angular.
	module('circleList').
	component('circleList', {  // This name is what AngularJS uses to match to the `<circle-list>` element.
		templateUrl: 'lib/js/circle-list/circle-list.template.html',
		controller: ['$http', 'CircleService', function CircleListController($http, CircleService) {
				var self = this;
				self.msg = '';
				self.circle = {};
/*				
				var req = {
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/circle',
					xhrFields: {
						withCredentials: false,
					},
				}
*/				
				CircleService.getCircles().then(function (data) {
					self.circles = data;
				});
/*
				$http(req).then(function (response) {
					console.log(response.data);
					self.circles = response.data;
				})
				.catch(function onError(error) {
					console.log(error);
				});
*/
				self.save = function save() {
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/circle',
						data: self.circle,
					}
					$http(req).then(function onSuccess (response) {
						console.log(response.data);
						self.circles.push(response.data);
						angular.element('#mediumCircleModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});					
				};

				self.edit = function editCircle(data, id) {
					circle = {
						'id': id,
						'name': data
					}
					var req = {
						method: 'PUT',
						url: 'http://127.0.0.1:8000/api/circle',
						data: circle,
					}
					$http(req).then(function onSuccess (response) {
						console.log(response.data);
						angular.forEach(self.circles, function(c) {
							if(c.id == response.data.id){
								c = response.data;
							}
						})
						angular.element('#mediumCircleModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});					
				};

				self.delete = function deleteCircle(id) {
					circle = {
						'id': id,
					};
					var req = {
						method: 'DELETE',
						url: 'http://127.0.0.1:8000/api/circle',
						data: circle,
						headers: { 
							'Content-Type': 'application/json' 
						},
					};

					$http(req).then(function (response) {
						console.log(response.data);
						self.msg = "Circle deleted successfully.";
						alert("Circle deleted successfully.");
						for(i=0; i<self.circles.length; i++) {
							if(self.circles[i].id == id) {
								self.circles.splice(i, 1);
							}
						}
					})
					.catch(function onError(error) {
						console.log(error);
						alert("Error while deleting circle.")
						self.msg = "Error while deleting circle."
					});					
				};
			}
		]
	});

var EditCircleModal = function () {
	this.visible = false;
};

EditCircleModal.prototype.open = function (circle) {
	this.person = circle;
	this.visible = true;
};

EditCircleModal.prototype.close = function () {
	this.visible = false;
};
