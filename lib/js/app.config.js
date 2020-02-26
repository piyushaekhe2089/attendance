angular.
  module('stcsApp')
  .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', 
	  'cfpLoadingBarProvider', //, '$locationProvider',
    function config($routeProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) { //, $locationProvider) {
      //$locationProvider.html5Mode(true);
	    //
	    
	    cfpLoadingBarProvider.includeSpinner = true;
	    cfpLoadingBarProvider.includeBar = true;

	    $stateProvider
	    .state('login', {
		    url: '/login',
			component: 'login',
			resolve: {
				access: ["Access", function (Access) {
					return Access.isAnonymous();
				}]
			}
	    })	    
	    .state('base', {
		    url: '/',
		    abstract: true,
			component: 'base',
			resolve: {
				access: ["Access", function (Access) {
					return Access.isAuthenticated();
				}]
			}
		})
		.state('base.circle', {
			url: 'circle/list',
			component: 'circleList'
		})
		.state('base.site', {
			url: 'site/list',
			component: 'siteList'
		})		
	    .state('base.employee', {
		    url: 'employee',
		    component: 'employee'
	    })
	    .state('base.employee.list', {
		    url: '/list',
	            component: 'employeeList'
	    })
	    .state('base.employee.detail', {
		    url: '/:id',
		    component: 'employeeDetail'
	    })
	    .state('base.employee.profile', {
		    url: '/',
		    component: 'employeeProfile'
	    })
	    .state('base.employee.add', {
		    url: '/add',
		    component: 'employeeAdd'
	    })
	    .state('base.employee.edit', {
		    url: '/edit/:id',
		    component: 'employeeEdit'
	    })
	    .state('base.employee.profile_photo', {
		    url: '/profile_photo/:id',
		    component: 'employeeProfilePhoto'
	    })
	    .state('base.dashboard', {
		    url: 'dashboard',
		    component: 'dashboard'
	    })
	    .state('base.dashboard.dashboard-data', {
		    url: '/data',
		    component: 'dashboardData'
		})
		.state('base.expense', {
			url: 'expense',
			component: 'expense'
		})
		.state('base.expense.list', {
			url: '/list',
			component: 'expenseList'
		})
		.state('base.approvals', {
			url: 'approvals',
			component: 'approvals'
		})
		.state('base.approvals.list', {
			url: '/list',
			component: 'approvalsList'
		})
		.state('base.approvals.photo-list', {
			url: '/photo_list',
			component: 'photoApprovalsList'
		})
		.state('base.project', {
			url: 'project',
			component: 'project'
		})
		.state('base.project.add', {
			url: '/add',
			component: 'projectAdd'
		})
		.state('base.project.list', {
			url: '/list',
			component: 'projectList'
		})
	    .state('base.project.detail', {
		    url: '/:id',
			component: 'projectDetail',
			params: { 
				project: null, 
				id: null 
			},
		})
		.state('base.project.nodeactivity', {
			url: '/nodeactivity',
			component: 'activityNodeDeployment',
			params: {
				project: null,
			}
		})
		.state('base.project.linkatpactivity', {
			url: '/linkatpactivity',
			component: 'activityLinkAtp',
			params: {
				project: null,
			}
		})
		.state('base.project.cardadditionactivity', {
			url: '/cardadditionactivity',
			component: 'activityCardAddition',
			params: {
				project: null,
			}
		})
		.state('base.project.dinstallationactivity', {
			url: '/dinstalltionactivity',
			component: 'activityDInstallation',
			params: {
				project: null,
			}
		})
		.state('base.project.mandayrevisitactivity', {
			url: '/mandayrevisitactivity',
			component: 'activityManDayRevisit',
			params: {
				project: null,
			}
		});

	    $urlRouterProvider.otherwise("/login");
    }
  ])
.run(['$state', '$rootScope', 'AuthenticationService', 'Access', function($state, $rootScope, AuthenticationService, Access) {
	$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
		switch (error){
			case Access.UNAUTHORIZED:
				console.log("Unauthorised")
				$state.go("login");
				break;

			case Access.FORBIDDEN:
				console.log("Forbidden")
				$state.go("login");
				break;

			default:
				console.log("default")
				$log.warn("$stateChangeError event catched");
				break;
		}
	})
}]);
