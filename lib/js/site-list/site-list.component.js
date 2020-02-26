// Register `circleList` component, along with its associated controller and template
angular.
	module('siteList').
	component('siteList', {  // This name is what AngularJS uses to match to the `<site-list>` element.
		templateUrl: 'lib/js/site-list/site-list.template.html',
		controller: ['$http', 'SiteService', function SiteListController($http, SiteService) {
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
				SiteService.getSites().then(function (data) {
					self.sites = data;
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
						url: 'http://127.0.0.1:8000/Project/api/project/site',
						data: self.site,
					}
					$http(req).then(function onSuccess (response) {
						console.log(response.data);
						self.sites.push(response.data);
						angular.element('#mediumSiteModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});					
				};

				self.edit = function editSite(data, id) {
					circle = {
						'id': id,
						'name': data
					}
					var req = {
						method: 'PUT',
						url: 'http://127.0.0.1:8000/Project/api/project/site',
						data: site,
					}
					$http(req).then(function onSuccess (response) {
						console.log(response.data);
						angular.forEach(self.sites, function(c) {
							if(c.id == response.data.id){
								c = response.data;
							}
						})
						angular.element('#mediumSiteModal').modal('hide');
					})
					.catch(function onError(error) {
						console.log(error);
					});					
				};

				self.delete = function deleteSite(id) {
					circle = {
						'id': id,
					};
					var req = {
						method: 'DELETE',
						url: 'http://127.0.0.1:8000/Project/api/project/site',
						data: site,
						headers: { 
							'Content-Type': 'application/json' 
						},
					};

					$http(req).then(function (response) {
						console.log(response.data);
						self.msg = "Site deleted successfully.";
						alert("Site deleted successfully.");
						for(i=0; i<self.sites.length; i++) {
							if(self.sites[i].id == id) {
								self.sites.splice(i, 1);
							}
						}
					})
					.catch(function onError(error) {
						console.log(error);
						alert("Error while deleting site.")
						self.msg = "Error while deleting site."
					});					
				};
			}
		]
	});

var EditSiteModal = function () {
	this.visible = false;
};

EditSiteModal.prototype.open = function (site) {
	this.person = site;
	this.visible = true;
};

EditSiteModal.prototype.close = function () {
	this.visible = false;
};
