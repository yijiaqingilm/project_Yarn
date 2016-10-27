(function() {
	"use strict";
	angular.module("angularMobileApp");

	app.config(["$anchorScrollProvider", function($anchorScrollProvider) {
		//console.log($anchorScrollProvider);
		//$anchorScrollProvider.disableAutoScrolling();
	}]);
	var module2 = angular.module("module2", []);
	var ctr2 = module2.controller("controller2", function($scope) {
		$scope.name = "yijiaiqng";
	});
	app.controller("angular_ng_controller", ["$scope", "$location", "$anchorScroll", angular_ng_controller]);

	function angular_ng_controller($scope, $location, $anchorScroll) {
		console.log("this si angular ng controller");

		$scope.addAnimate = function() {
			$scope.test_an = "slideInLeft  animated";
		};
		$scope.items = ['settings', 'home', 'options', 'other'];
		$scope.selection = $scope.items[0];

		$scope.arr = ['123', "asdf"];
		$scope.a = function(i, j) {
			console.log("xxxyyy");
			console.log(i + j);
		};
		$scope.b = function() {

		};
		angular.bind("xxx", $scope.a, 4, 4)();

		$scope.user_1 = {
			name: 'yijiaqing',
			age: '18',
			my_date: new Date('2008', '08', "08"),
			user3: {
				name: 'lanlan',
				age: '12',
				wode: 'wode'
			}
		};
		$scope.user_2 = {
			name: 'yijiaqing',
			age: '19',
			user3: {
				name: 'lanlan',
				age: '18',
				xx: 'yy'
			}
		};

		var obj = angular.extend({}, $scope.user_1, $scope.user_2);
		console.log(angular.equals($scope.user_1, $scope.user_2));
		console.log($scope.user_1 == $scope.user_2);
		console.log(obj);

		var obj_2 = angular.merge({}, $scope.user_1, $scope.user_2);
		console.log(obj_2);
		console.log($scope.user_1);

		console.log("==========================");

		angular.forEach(obj, function(key, value) {
			console.log("key:" + key);
			console.log("value:" + value);
		});

		var json = '{"body":[{"itemId":"37356","title":"磨光技工15年经验","content":"你好！我是恒冠金属制品厂魏文彬。有15年工作经验很高兴认识你","advertiser":"魏文彬","totalMoney":"1.00","income":"0.80","exchangeRate":"10","addtime":"1474973451"},{"itemId":"36974","title":"耐二次阳极氧化、耐喷砂油墨","content":"万佳原耐二次阳极氧化、耐喷砂油墨是国内最早、最成熟的功能油墨，在苹果5，小米4手机中框、乐视手机中框、魅族手机、OPPO手机等已大量应用。有需求联系杨先生 15986615006","advertiser":"杨威  ","totalMoney":"1.00","income":"0.80","exchangeRate":"0","addtime":"1475059914"}],"code":0,"message":"操作成功"}';
		console.log(json);
		json = JSON.parse(json);
		console.log(json);
		var json_to = angular.fromJson(obj);
		console.log(json_to);

		console.log(angular.toJson(json_to));

		var y = undefined;
		var x = (y || angular.identity)(obj);
		console.log(x);

		console.log(angular.isObject($scope.user_1));
		console.log(angular.isArray($scope.arr));

		var myDate = new Date();
		console.log(angular.isDate(myDate));

		console.log(angular.isFunction($scope.b));
		var my_null;
		console.log(my_null);
		console.log(angular.isDefined(my_null));
		console.log(angular.version);

		$scope.go_anchor = function() {
			console.log("什么鬼？？");
			$location.hash("test_anchorScroll");

		}

	}

	//angular.bootstrap(document.getElementById("div2"), ["module2"]);

	app.directive("pend", [pend]);

	function pend() {
		console.log("this is pend");
		return {
			restrict: "EA",
			transclude: 'true',
			scope: {
				title: '@',
				text: '='
			},
			template: '<ng-transclude></ng-transclude><div>hellose {{title}} 看看text{{text}}</div><ng-transclude></ng-transclude>'

		};
	}

	app.directive("myDirective", [myDirective]);

	function myDirective() {
		console.log("在 这里我 创建 一个 自己的 自定义指令 用于测试");
		return {
			restrict: 'AE',
			scope: {
				action: '&',
				textName: '='
			},
			template: '<div>{{textName}}<input type="text" ng-model="textName" /> <input type="button" value="click me" ng-click="action()"> lorem 10  lfjadgg,sadfgopjdf</div>',
			link: function() {
				console.log("这是我 传的 自动以指令的 link");
			},
			controller: function() {
				console.log("这是我 传的 自动以指令的 控制器");
			}
		}
	}

	app.directive("supperNum", [supperNum]);

	function supperNum() {
		return {
			restrict: "AE",
			template: '<div>我是 超级 num</div>',
			link: function(scope, elem, attr, controller) {
				console.log("这是我的超级 num的 link");
			},
			controller: function($scope, $element, $attrs, $transclude) {
				console.log("这是我的超级 num的 控制器");
				$scope.myNum = function() {
					console.log("调动 我的 my Num 方法");
				};
				this.a = "a";
				this.method1 = function() {
					console.log("wodetian")
				};
				this.myArr = [];
			}

		}
	}

	app.directive("fractionNum", [fractionNum]);

	function fractionNum() {
		return {
			restrict: 'A',
			require: ['?^supperNum', 'fractionNum'],
			controller: function($scope) {
				this.myCtrl = "我的 ctrl";
				console.log("那么 我的 的 controller  是否没用")
			},
			link: function(scope, elem, attrs, superCtrl) {
				console.log(elem);
				console.log("我调用了 supper NUm controller 吗");
				console.log(superCtrl);
				superCtrl[0].myArr.push("red");
				elem.addClass("xx");
				elem.bind("keyup", function() {
					console.log(this.value);
					console.log(this.value < 1 || this.value > 10)
					if(this.value < 1 || this.value > 10) {
						console.log("数字 不符合");
						elem.addClass("border-bottom-red");
					} else {
						elem.removeClass("border-bottom-red");
					}
				});
			}
		}
	};

	app.directive("test_d", [function() {

	}]);
})();