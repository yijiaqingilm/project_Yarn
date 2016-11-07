app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    var myRes = [
        {type: 'js', path: 'views/profile/profile.controller.js'},
        {type: 'css', path: 'views/profile/profile.css'}];
    $stateProvider.state("profile", {
        url: '/profile',
        views: {
            '': {
                templateUrl: 'views/profile/profile.html',
                controller: 'profileController'
            }
        },
        resolve: {
            loadMyRes: ['$ocLazyLoad', function ($ocLazyLoad) {
                //return $ocLazyLoad.load('views/profile/profile.controller.js');
                return $ocLazyLoad.load([/*{type: 'js', path: 'scripts/lib/underscore.js'}*/].concat(myRes));
            }],
            test: function () {
                console.log("this  is   profile  test ")
            }
        }
    }).state("profile.usercenter", {
        url: '/usercenter/{sort}?from&to',
        templateUrl: 'views/profile/usercenter.html',
        controller: 'usercenterControler',
        resolve: {
            loadMyRes: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([/*{type: 'js', path: 'scripts/lib/myUnderscore.js'}*/].concat(myRes));
            }]
        }
    });
}]);