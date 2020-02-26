// Register `employeeDetail` component, along with its associated controller and template

angular.
	module('projectDetail').
	component('projectDetail', {
		templateUrl: 'lib/js/project-detail/project-detail.template.html',
		controller: ['$http', '$state', '$stateParams', 'ProjectService', 'fileUpload',
			function ProjectDetailController($http, $state, $stateParams, ProjectService, fileUpload) {
				var self = this;
				//var id = $stateParams.id;
				self.project = $stateParams.project;

				self.goTo = function (activity){
					switch (activity) {
						case "NodeActivity":
							$state.go('base.project.nodeactivity', { 'project': self.project });
							break;
						case "LinkAtp":
							$state.go('base.project.linkatpactivity', { 'project': self.project });
							break;
						case "CardAddition":
							$state.go('base.project.cardadditionactivity', { 'project': self.project });
							break;
						case "DInstallation":
							$state.go('base.project.dinstallationactivity', { 'project': self.project });
							break;
						case "ManDayRevisit":
							$state.go('base.project.mandayrevisitactivity', { 'project': self.project });
							break;							
					}
				}

				self.save_quote_docs = function (quote) {
					var file = quote.quote_file;
					var uploadUrl = 'http://127.0.0.1:8000/api/employee/upload_profile_photo/' + 1;
					var fieldName = "image";
					fileUpload.uploadFileToUrl(file, uploadUrl, fieldName, function (result, response) {

					});
				}
				//ProjectService.getProject(id).then(function(data){
				//    self.project = data;
				//});
				/*
				var req = {
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/employee/' + self.username,
				}
	  
				$http(req).then(function(response) {
					self.employee = response.data;
				})
				.catch(function onError(error) {
					console.log(error);
				});*/

			}
		]
	});
