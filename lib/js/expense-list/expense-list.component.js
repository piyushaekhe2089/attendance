// Register `employeeList` component, along with its associated controller and template
angular.
	module('expenseList').
	component('expenseList', {  // This name is what AngularJS uses to match to the `<employee-list>` element.
		templateUrl: 'lib/js/expense-list/expense-list.template.html',
		controller: ['$http', '$filter', 'ExpenseService', 'EmployeeService',
			function ExpenseListController($http, $filter, ExpenseService, EmployeeService) {
				var $ctrl = this;
				var selectedId = null;

				$ctrl.enabledEdit = [];
				$ctrl.travel_mode_array = [];

				$ctrl.travel_mode = ['Bus', 'Ricksaw', 'Cab', 'Train', 'Flight'];

				$ctrl.update_travel_mode = function (index, value) {
					var elm_id = "travel_mode_" + index;
					var elm = angular.element(document.getElementById(elm_id));
					var travel_modes = elm.val().length ? elm.val().split(",") : [];

					if (travel_modes.indexOf(value) != -1) {
						travel_modes.splice(travel_modes.indexOf(value), 1);
					} else {
						travel_modes.push(value);
					}
					$ctrl.claims[index].travel_mode = travel_modes.join();
				};

				ExpenseService.getClaims().then(function (data) {
					$ctrl.claims = data;
				});

				EmployeeService.getManagers().then(function (data) {
					$ctrl.rgm = data;
				});

				$ctrl.editClaim = function(index) {
					$ctrl.enabledEdit[index] = true;
				}

				$ctrl.cancelEnabledEdit = function (index){
					$ctrl.enabledEdit[index] = false;
				}
/*				
				$ctrl.showAssignedBy = function (claim) {
					var selected = [];
					if (claim.task.created_by) {
						selected = $filter('filter')($ctrl.rgm, claim.task.created_by);
					}
					return selected.length ? selected[0].name : 'Not Set';
				};

				$ctrl.showTravelMode = function(claim) {
					var selected = [];
					var travel_mode = (claim.travel_mode).split(",");
					angular.forEach($ctrl.travel_mode, function(t){
						if(travel_mode.indexOf(t) >= 0){
							selected.push(t);
						}
					});
					return selected.length ? selected.join(', ') : 'Not Set'
				};
*/
				$ctrl.submitExpense = function(claim, index){
					console.log(claim);
					//angular.extend(data, {'claim_id': claim});
					var req = {
						method: 'POST',
						url: 'http://127.0.0.1:8000/api/claim/',
						data: claim,
					};

					$http(req).then(function(response){
						console.log(response);
						for(i=0; i<$ctrl.claims.length; i++) {
							if($ctrl.claims[i].id == response.data.id) {
								$ctrl.claims[i] = response.data;
								break;
							}
						}
/*
						angular.forEach($ctrl.claims, function(c){
							if(c.id == response.data.id){
								c = response.data;
							}
						})
*/						
						$ctrl.cancelEnabledEdit(index);
					})
				};
			}
		]
	});

