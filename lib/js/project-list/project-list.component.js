// Register `projectList` component, along with its associated controller and template
angular.
	module('projectList').
	component('projectList', {  // This name is what AngularJS uses to match to the `<photo-list>` element.
		templateUrl: 'lib/js/project-list/project-list.template.html',
		controller: ['$http', '$filter', '$state', 'ProjectService',
			function projectListController($http, $filter, $state, ProjectService) {
				var $ctrl = this;

				ProjectService.getProjects().then(function (data) {
					$ctrl.projects = data;
				});	
				
				$ctrl.showDetails = function(project){
					$state.go('base.project.detail', {'project': project})
				}
			}
		]
	});

