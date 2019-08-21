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
		    component: 'login'
	    })	    
	    .state('base', {
		    url: '/',
		    abstract: true,
		    component: 'base'
		})
		.state('base.circle', {
			url: 'circle/list',
			component: 'circleList'
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
		});

	    $urlRouterProvider.otherwise("/login");
    }
  ])
 .run(['$state', '$rootScope', 'AuthenticationService', function($state, $rootScope, AuthenticationService){
	 $rootScope.$on('$stateChangeStart', 'editableOptions', function (event, toState, toParams, fromState, fromParams, editableOptions) {
		editableOptions.theme = 'bs3';
		mapboxgl.accessToken = 'pk.eyJ1IjoicGl5dXNoYWVraGUiLCJhIjoiY2p2ZjM5aTlmMjgybzQ0bXkzemllMm0yNSJ9.iOWtU4HZwizXqr3CCKH7vg';
		 var authToken = AuthenticationService.isAuthenticated();
		 if (!authToken && toState !== 'login') {
			 //not logged in, so redirect to the login view instead of the view
			 //the user was attempting to load
			 event.preventDefault();
			 $state.go('login');
		 }
	 })
 }
]);
