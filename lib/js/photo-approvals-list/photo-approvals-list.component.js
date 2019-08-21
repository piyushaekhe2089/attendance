// Register `photoApprovalsList` component, along with its associated controller and template
angular.
	module('photoApprovalsList').
	component('photoApprovalsList', {  // This name is what AngularJS uses to match to the `<photo-list>` element.
		templateUrl: 'lib/js/photo-approvals-list/photo-approvals-list.template.html',
		controller: ['$http', '$filter', 'ApprovalsService', 'EmployeeService',
			function PhotoApprovalsListController($http, $filter, ApprovalsService, EmployeeService) {
				var $ctrl = this;
				$ctrl.enabledEdit = [];

				$ctrl.cancelEnabledEdit = function (index){
					$ctrl.enabledEdit[index] = false;
				}

				ApprovalsService.getPhotoApprovals().then(function (data) {
					$ctrl.employees = data;
				});

				$ctrl.approveRejectPhoto = function(emp, index, status){
					console.log(emp);
					emp.image_approved = status;
					//angular.extend(claim, {'status': status});
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/photo_approvals/',
						data: emp,
					};

					$http(req).then(function(response){
						console.log(response);
						if (response.status == 200) {
							angular.forEach($ctrl.employees, function (e) {
								if (e.id == response.data.id) {
									e = response.data;
								}
							});
						}
					});
				};
			}
		]
	});

