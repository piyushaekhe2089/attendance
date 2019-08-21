// Register `circleList` component, along with its associated controller and template
angular.
	module('circleList').
	component('circleList', {  // This name is what AngularJS uses to match to the `<circle-list>` element.
		templateUrl: 'lib/js/circle-list/circle-list.template.html',
		controller: ['$http', '$modal',
			function CircleListController($http, $modal) {
				var self = this;
				self.circle = {};
				var req = {
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/circle',
					xhrFields: {
						withCredentials: false,
					},
				}
				$http(req).then(function (response) {
					console.log(response.data);
					self.circles = response.data;
				})
				.catch(function onError(error) {
					console.log(error);
				});

				self.save = function save() {
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/circle',
						data: self.circle,
					}
					$http(req).then(function (response) {
						console.log(response.data);
						self.circles.push(response.data);
						angular.element('#mediumCircleModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});					
				};

				self.openModal = function (circle) {
					var modalInstance = $modal.open({
						templateUrl: 'myModalContent.html',
						controller: ModalInstanceCtrl,
						resolve: {
							circle: function () {
								return circle;
							}
						}
					});
				};

				var ModalInstanceCtrl = function ($scope, $modalInstance, circle) {
					$scope.circle = circle;
				};

				self.edit = function editCircle(circle, index) {
					var req = {
						method: 'PUT',
						url: 'http://127.0.0.1:8000/api/circle',
						data: circle,
					}
					$http(req).then(function (response) {
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
