(function() {
	/*var mainModule = angular.module("angularMobileApp", []);*/
	app.controller("mainCtrl", ["$scope", "$timeout", "testService", "getJsonService", "SharedState", function($scope, $timeout, testService, getJsonService, SharedState) {
		console.log("this is main ctrl");
		console.log(testService.name);
		$scope.demo = function() {
			this.items = [];
		}
		$scope.list = [];

		for(var i = 0; i < 100; i++) {
			$scope.list.push("item" + i);
		}
		$scope.demo.items = $scope.list;
		$scope.loadMove = function() {
			$timeout(function() {
				for(var i = 101; i < 130; i++) {
					$scope.demo.items.push("item" + i);
				}
			}, 2000);
		}

		var promise = getJsonService.query();
		promise.then(function(data) {
			console.log(data);
			$scope.data = data.body;
			console.log("lai  kankan")
		}, function(data) {
			console.log("kan  mao xian ")
		});

		var promise_test = getJsonService.asyncGreet("ronbin hello");
		promise_test.then(function(data) {
			console.log("sucess" + data);
		}, function(data) {
			console.log("eorr" + data);
		})
		console.log("test  我不是 最后打印的");
		console.log(SharedState);
		SharedState.initialize($scope, 'myId', {
			defaultValue: 'wodetian '
		});
		SharedState.initialize($scope, "myId2", {
			defaultValue: 'myid2'
		})
		var x = SharedState.get("myId");
		console.log(x);
		SharedState.setOne("myId", "xiug");
		console.log(SharedState.get("myId"));

		SharedState.setMany({
			myId: 'wocao',
			myId2: 'wocao2'
		});
		console.log(SharedState.get("myId"))

		SharedState.set({
			myId: '1'
		});
		console.log(SharedState.get("myId"))

		SharedState.turnOn("myId");
		console.log(SharedState.get("myId"))

		SharedState.turnOff("myId");
		console.log(SharedState.get("myId"))

		console.log(SharedState.active("myId"));

		console.log(SharedState.isUndefined("myId3"));

		console.log(SharedState.has("myId3"));

        console.log(SharedState.get("myId2"));
		console.log(SharedState.referenceCount("myId2") + "count");
        console.log(SharedState.get("myId2"));


		SharedState.setOne("myId", "test");
		console.log(SharedState.eq("myId", "test"))

		console.log(SharedState.values());

		SharedState.set("myId", false);
		$scope.$on('mobile-angular-ui.state.changed.myId', function(e, newVal, oldVal) {
			console.log(e);
			if(newVal === true) {
				console.log('sidebar opened');
			} else {
				console.log('sidebar closed');
			}
		});

		console.log("==================");
		SharedState.initialize($scope, "myId3");
		SharedState.setOne("myId3", "asdf")
		console.log(SharedState.get("myId3"));

		$scope.outerClick = function() {
			console.log("this is outer click ???");
		}
	}]);

})();