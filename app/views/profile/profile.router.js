app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("profile", {
		url: '/profile',
		views:{
			
			'aaa':{
				templateUrl:'views/aaa.html'
			},
			'':{
				templateUrl: 'views/profile/profile.html'
			}
		},
		controller: 'profileController',
		resolve: {
			loadMyRes: ['$ocLazyLoad', function($ocLazyLoad) {
				//return $ocLazyLoad.load('views/profile/profile.controller.js');
				return $ocLazyLoad.load([{
					type: 'js',
					path: 'views/profile/profile.controller.js'
				}, {
					type: 'css',
					path: 'views/profile/profile.css'
				}]);
			}],
			test: function() {
				console.log("this  is   profile  test ")
			}
		}
	});
}]);