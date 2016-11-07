'use strict';

/**
 * @ngdoc overview
 * @name angularMobileApp
 * @description
 * # angularMobileApp
 *
 * Main module of the application.
 */

window.app = angular
	.module('angularMobileApp', [
		/*'ngRoute',*/
		'ui.router',
		'mobile-angular-ui',
		'mobile-angular-ui.gestures',
		"ngAnimate",
		'ui.bootstrap',
		"commonModule",
		"oc.lazyLoad"

	]);
app.config(function() {
		/*$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/test', {
				templateUrl: 'views/iscoll.html',
				controller: 'mainCtrl',
				controllerAs: 'mainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});*/
	})
	.run(["$rootScope", "$state", "$urlRouter", "$stateParams", "$templateCache", function($rootScope, $state, $urlRouter, $stateParams, $templateCache) {
		console.log("run ...")
		$templateCache.put("hello.html", "<div>this is hello .html</div>");
		var config = {};
		config.server = location.protocol + '//' + location.host;
		$rootScope.config=config;
		$rootScope.stateParams=$stateParams;

	}])
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when("","/home");
        $urlRouterProvider.otherwise("/404");
		$stateProvider.state("home", {
			url: '/home',
			templateUrl: 'views/main.html'
		}).state("tabs", {
			url: "/tabs",
			templateUrl: 'views/tab.html'
		}).state("index", {
			url: '/index',
			views: {
				'': {
					templateUrl: 'views/main.html'
				}
			}
		}).state("iscoll", {
			url: '/iscoll',
			templateUrl: 'views/iscoll.html',
			controller: 'mainCtrl'
		}).state("toggle", {
			url: '/toggle',
			templateUrl: 'views/toggle.html'
		}).state("overlay", {
			url: '/overlay',
			templateUrl: 'views/overlay.html',
			controller: 'overlayCtrl'
		}).state("forms", {
			url: '/forms',
			templateUrl: 'views/forms.html',
			controller: 'flexCtrl'
		}).state('flex', {
			url: '/flex',
			templateUrl: 'views/flex.html',
			controller: 'flexCtrl'
		}).state('404', {
			url: '/404',
			templateUrl: 'views/404.html'
		}).state('carousel', {
			url: '/carousel',
			templateUrl: 'views/carousel_tep.html',
			controller: 'carouselCtrl'
		}).state("modal", {
			url: '/modal',
			templateUrl: 'views/modal.html'
		}).state("user",{
			url:"/user",
			templateUrl:'views/user.html'
		});
	}]);
	
app.config(['$ocLazyLoadProvider',function($ocLazyLoadProvider){
	$ocLazyLoadProvider.config({
		loadedModules:['angularMobileApp']
	})
}]);