app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("touch", {
		url: '/touch',
		templateUrl: 'views/touch/touch.html',
		controller: 'touchController',
		resolve: {
			loadMyRes: ["$ocLazyLoad", function($ocLoazyLoad) {
				return $ocLoazyLoad.load({
					files: [{
						type: "js",
						path: 'views/touch/touch.controller.js'
					}, {
						type: 'css',
						path: 'views/touch/touch.css'
					}]
				});
			}]
		}
	});
}]);