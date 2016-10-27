app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("closure", {
		url: '/closure',
		templateUrl: "views/closure/closure.html",
		controller: 'closureController',
		resolve: {
			loadMyRes: ["$ocLazyLoad", function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files: [{
						type: "js",
						path: "views/closure/closure.controller.js"
					}, {
						type: 'css',
						path: 'views/closure/closure.css'
					}]
				});
			}]
		}
	});
}]);