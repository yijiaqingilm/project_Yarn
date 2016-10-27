(function() {
	app.controller("flexCtrl", ["$scope", "$timeout", function($scope, $timeout) {
		console.log("this is flexCtrl");
		console.log($scope);
		var $ctrl = this;
		$ctrl.items = ['itme1', 'item2'];
		console.log($ctrl);
		$scope.msg = "hello word";
		$scope.testClick = function() {
				$scope.msg = "hello word yijiaqing";
				console.log("xx");
			}
			/*$timeout(function() {
				$scope.msg = "hello word yijiaqing";
				console.log("xx");
			}, 5000);*/
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.msg = "hello word yijiaqing";
				console.log("xx");
			});
		}, 5000);

		$scope.deleteNotice = function(i) {
			console.log("this is del node")
			console.log(i);
		}

		$scope.list = ['index 1', 'index 2', 'index 3', 'index 4', 'index 5'];

		$scope.getJson1 = function() {
			console.log("getJson1");
		}
		$scope.getJson2 = function() {
			console.log("getJson 2");
		}

		$scope.getName = function() {
			console.log($scope.userName);
		}
		$scope.ctrlFlavor = "百事";

		$scope.sayHello = function(myName, Myage) {
			console.log("hello : " + myName, Myage);
		}
	}]);

	app.directive("dragToDismiss", function($drag, $timeout, $parse) {
		return {
			/*restrict:'A',*/
			restrict: 'A',
			/*compile: function(elm, attr) {
				console.log("drag-to dismiss")
				console.log(elm);
				var dismissFn = $parse(attr.dragToDismiss);
				console.log(dismissFn);
				
				return function(scope,elm) {
					
					
					elm.bind("click",function(){
						console.log("return :::")
						dismissFn(scope);
					});
				}
			}
			,*/
			link: function(scope, elm, attrs, controller) {

				elm.bind("click", function() {
					console.log("我自己的link 函数")
					console.log(scope);
					console.log(elm);
					console.log(attrs);
					console.log(controller);
					var dismissFn = $parse(attrs.dragToDismiss);
					dismissFn(scope);
				});
			}
		}
	})

	app.directive("hello", ["$templateCache", hello]);

	function hello($templateCache) {
		return {
			restrict: 'AEM',
			/*template:'<div>heollo  what</div>',*/
			template: $templateCache.get("hello.html") + '<div ng-transclude ></div>',
			/*replace:false,*/
			transclude: true,
			/*templateUrl:'views/template/hello.html'*/
		}
	}
	app.directive("loader", ["$parse", loader]);

	function loader($parse) {
		return {
			restrict: 'AC',
			link: function(scope, elm, attr) {
				console.log(elm);
				console.log(attr);

				elm.bind("click", function() {
					console.log("我自己的link 函数")
					var dismissFn = $parse(attr.getjson);
					dismissFn(scope);
				});

			}
		}
	}

	app.directive("testScope", ["$parse", testScope]);

	function testScope($parse) {
		return {
			restrict: 'AE',
			scope: {},
			template: "<div><input type='text' ng-model='userName'  />{{userName}}</div>",
			link: function(scope, elm, atts) {
				console.log("testScope link")
			}
		}
	}

	app.directive("drink", drink);

	function drink() {
		return {
			restrict: 'AE',
			scope: {
				flavor: '=',
				greeting: '&'
			},
			template: '<div><input ng-model="flavor"/>{{flavor}}换行<input ng-model="myName"/><input ng-model="age"/><input type="button" ng-click="greeting({name:myName,age:age})"/></div>',
			link: function(scope, elm, attrs, supperScope) {
				console.log("drink link")
				console.log(attrs.greeting);
			}
		}
	}

})()