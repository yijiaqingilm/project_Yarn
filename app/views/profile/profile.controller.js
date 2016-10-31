(function () {
    angular.module('angularMobileApp').controller("profileController", ['$scope', function ($scope) {
        console.log("this is my profile controller");
        console.log("我的天");
        $scope.myName="what   yi";
    }]);
    angular.module("angularMobileApp").controller("usercenterControler", ["$scope", function ($scope) {
        console.log("this is my  user center controller");
    }]);

})();