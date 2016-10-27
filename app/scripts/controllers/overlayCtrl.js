(function() {
	console.log('xxx');
	app.controller('overlayCtrl', ["$scope","$urlRouter","$stateParams","SharedState",function($scope,$urlRouter,$stateParams,SharedState){
		console.log("this is overlayCtrtl 123 123")
		console.log($urlRouter);
		console.log("=========")
		console.log($scope.$stateParams);
		console.log(SharedState);
		$scope.what=" this is  overlay";
		$scope.myalert=function(){
			console.log("xxx");
			//ui-turn-on=
			SharedState.turnOn("modal1");
		}
	}]);

	
})();