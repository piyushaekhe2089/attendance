// Register `employeeList` component, along with its associated controller and template
angular.
	module('approvalsList').
	component('approvalsList', {  // This name is what AngularJS uses to match to the `<employee-list>` element.
		templateUrl: 'lib/js/approvals-list/approvals-list.template.html',
		controller: ['$http', '$filter', '$localStorage', 'ApprovalsService', 'EmployeeService',
			function ApprovalsListController($http, $filter, $localStorage, ApprovalsService, EmployeeService) {
				var $ctrl = this;
/*
				$ctrl.enabledEdit = [];

				$ctrl.cancelEnabledEdit = function (index){
					$ctrl.enabledEdit[index] = false;
				}
*/	
				$ctrl.enableUpdate = function (claim){
					if($localStorage.currentUser.employee.id == claim.first_level_approver.id){
						if(claim.approved_first_level == '' && claim.approved_assigned_by != ''){
							return false;
						}
					}
					else if($localStorage.currentUser.employee.id == claim.second_level_approver.id){
						if(claim.approved_second_level == '' && claim.approved_first_level != ''){
							return false;
						}
					}
					else {
						if(claim.approved_assigned_by == '' && claim.status != ''){
							return false;
						}
					}
					return true;
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
							for(i=0; i<$ctrl.approvals.length; i++){
								if($ctrl.approvals[i].id == response.data.id){
									$ctrl.approvals[i] = response.data;
									break;
								}
							}

						}
					});
				};
			}
		]
	});

