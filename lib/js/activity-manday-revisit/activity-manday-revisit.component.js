// Register `projectList` component, along with its associated controller and template
angular.
	module('activityManDayRevisit').
	component('activityManDayRevisit', {  // This name is what AngularJS uses to match to the `<photo-list>` element.
		templateUrl: 'lib/js/activity-manday-revisit/activity-manday-revisit.template.html',
		controller: ['$http', '$filter', '$stateParams', 'ManDayRevisitActivityService', 'ProjectService', 'CircleService', 'SiteService',
			function activityManDayRevisitController($http, $filter, $stateParams, ManDayRevisitActivityService, ProjectService, CircleService, SiteService) {
				var $ctrl = this;
				$ctrl.project = $stateParams.project;
				
				$ctrl.activities = {};
				$ctrl.activity = {};
				$ctrl.circles = {};
				$ctrl.sites = {};

				ManDayRevisitActivityService.getActivities().then(function(data){
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
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/Project/api/project/mandayrevisitactivity/',
						data: $ctrl.activity,
					};

					$http(req).then(function (response) {
						console.log(response);
						$ctrl.activities.push(response.data);
						angular.element('#mediumManDayRevisitActivityModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});
				}
/*				ProjectService.getProjects().then(function (data) {
					$ctrl.projects = data;
				});				
*/				
				$ctrl.updateManDayRevisitActivity = function (act, field, field_data) {
					var updated_data = {};
					updated_data[field] = field_data;
					var data = {
						'activity': act,
						'updated_data': updated_data
					};
					var req = {
						method: 'PUT',
						url: 'http://127.0.0.1:8000/Project/api/project/mandayrevisitactivity/',
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

