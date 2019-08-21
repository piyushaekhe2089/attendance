// Register `employeeList` component, along with its associated controller and template
angular.
	module('approvalsList').
	component('approvalsList', {  // This name is what AngularJS uses to match to the `<employee-list>` element.
		templateUrl: 'lib/js/approvals-list/approvals-list.template.html',
		controller: ['$http', '$filter', 'ApprovalsService', 'EmployeeService',
			function ApprovalsListController($http, $filter, ApprovalsService, EmployeeService) {
				var $ctrl = this;
				$ctrl.enabledEdit = [];

				$ctrl.cancelEnabledEdit = function (index){
					$ctrl.enabledEdit[index] = false;
				}

				ApprovalsService.getApprovals().then(function (data) {
					$ctrl.approvals = data;
				});

				$ctrl.approveRejectExpense = function(claim, index, status){
					console.log(claim);
					claim.status = status;
					//angular.extend(claim, {'status': status});
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/approvals/',
						data: claim,
					};

					$http(req).then(function(response){
						console.log(response);
						if (response.status == 200) {
							angular.forEach($ctrl.approvals, function (c) {
								if (c.id == response.data.id) {
									c = response.data;
								}
							});
						}
						$ctrl.cancelEnabledEdit(index);
					});
				};
			}
		]
	});

