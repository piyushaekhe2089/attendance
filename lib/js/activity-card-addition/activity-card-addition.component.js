// Register `projectList` component, along with its associated controller and template
angular.
	module('activityCardAddition').
	component('activityCardAddition', {  // This name is what AngularJS uses to match to the `<photo-list>` element.
		templateUrl: 'lib/js/activity-card-addition/activity-card-addition.template.html',
		controller: ['$http', '$filter', '$stateParams', 'CardAdditionActivityService', 'ProjectService', 'CircleService', 'SiteService',
			function activityNodeDeploymentController($http, $filter, $stateParams, CardAdditionActivityService, ProjectService, CircleService, SiteService) {
				var $ctrl = this;
				$ctrl.project = $stateParams.project;
				$ctrl.card_set = {};
				
				$ctrl.activities = {};
				$ctrl.equipments = [];
				$ctrl.activity = {};
				$ctrl.circles = {};
				$ctrl.sites = {};

				CardAdditionActivityService.getActivities().then(function(data){
					$ctrl.activities = data;
				})
				CircleService.getCircles().then(function(data) {
					$ctrl.circles = data;
				});
				SiteService.getSites().then(function(data){
					$ctrl.sites = data;
				});

				$ctrl.toggleEquipments = function(index){
					$ctrl.equipment_set[index].checked = !$ctrl.equipment_set[index].checked;
				}

				$ctrl.printQuote = function(){
					console.log($ctrl.activity.quote)
				}

				$ctrl.opened = {};
				$ctrl.isOpen = false;
				var today = new Date();
				$ctrl.today = today;

				$ctrl.save = function() {
/*					var eq_set = [];
					for(i=0; i<$ctrl.equipment_set.length;i++){
						if($ctrl.equipment_set[i].checked){
							eq_set.push($ctrl.equipment_set[i])
						}
					}
*/					
					$ctrl.activity.card_set = $ctrl.card_set;

					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/Project/api/project/cardadditionactivity/',
						data: $ctrl.activity,
					};

					$http(req).then(function (response) {
						console.log(response);
						$ctrl.activities.push(response.data);
						angular.element('#mediumCardAdditionActivityModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});
					
				}
/*				ProjectService.getProjects().then(function (data) {
					$ctrl.projects = data;
				});				
*/				
				$ctrl.updateCardAdditionWork = function (work, field, field_data) {
					var updated_data = {};
					updated_data[field] = field_data;
					var data = {
						'work': work,
						'updated_data': updated_data
					};
					var req = {
						method: 'PUT',
						url: 'http://127.0.0.1:8000/Project/api/project/updatecardadditionwork/',
						data: data
					};

					return $http(req).then(function (response) {
						console.log(response);
						for(i=0; i<$ctrl.activities.length; i++)  {
							if($ctrl.activities[i].id == response.data.id){
								$ctrl.activities[i] = response.data;
							}
						}
						return;
					})
					.catch(function onError(error) {
						console.log(error);
						return "error";
					});					
				}
			}
		]
	});

