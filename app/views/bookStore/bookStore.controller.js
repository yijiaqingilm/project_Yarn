(function() {
	"use strict";
	angular.module("angularMobileApp").controller("bookStoreController", ["$scope", function($scope) {
		console.log("this is my  booke  home  controller")
	}]);

	//书籍类型控制器
	app.controller("bookTypeController", ["$scope", "SharedState", function($scope, SharedState) {

		console.log("this is my booke type list  controller");
		
		console.log($scope.stateParams)
		$scope.booktype = ["全部", "计算机", "金融", "治学", "高端办公"];
		SharedState.initialize($scope, "curType");
		SharedState.setOne("curType",$scope.stateParams.bookType);
		console.log("为什么不行"+$scope.stateParams.bookType)
		console.log("??/")
		console.log(SharedState.get("curType"));

	}]);

	//书籍列表控制器
	app.controller("booksController", ['$scope',function($scope) {
		console.log("this is my booke type list  booksController yijiaqingilm 一家亲");
		console.log($scope.stateParams)
	}]);

})();