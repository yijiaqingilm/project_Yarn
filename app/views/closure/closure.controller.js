(function() {
	"use strict";
	angular.module("angularMobileApp").controller("closureController", ["$scope", function($scope) {

		/*function init(){
			var name="what";
			function displayName(){
				alert(name);
			}
			displayName();
		}
		init();*/
		function makeFunc() {
			var name = "yijaiqing";

			function displayName() {
				//	alert(name);
			}
			return displayName;
		}
		var myFun = makeFunc();
		console.log(myFun);
		myFun();


	}]);
})();