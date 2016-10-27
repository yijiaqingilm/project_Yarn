app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("bookHome", {
		url: '/bookHome/{bookType:[0-9]{1,4}}',
		views: {
			'': {
				templateUrl: 'views/bookStore/bookHome.html'
			},
			'booktypelist@bookHome': {
				templateUrl: 'views/bookStore/template/bookTypeList.html',
				controller: 'bookTypeController'
			},
			'books@bookHome': {
				templateUrl: 'views/bookStore/template/book_list.html',
				controller: 'booksController'
			}
		},
		controller: 'bookStoreController',
		resolve: {
			loadMyRes: ['$ocLazyLoad', function($ocLazyLoad) {

				return $ocLazyLoad.load({
					files: [{
						type: 'js',
						path: 'views/bookStore/bookStore.controller.js'
					}]
				});
			}]
		}
	});
}]);