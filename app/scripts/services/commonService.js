var commonModule = angular.module("commonModule", []);
commonModule.config(["$provide", "$httpProvider", function($provide, $httpProvider) {
	console.log("this is commonConfig")
	$provide.factory("testService", ["$http", function($http) {
		console.log("this is test server");
		var userINfo = {
			"name": "yijiaqing",
			"age": '22',
			"sex": '1'
		}
		return userINfo;
	}]);

	$provide.service("getJsonService", ["$http", "$q", function($http, $q) {
		return {
			query: function() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: 'json/test1.json',

				}).success(function(data, status, headers, config) {
					console.log("success");
					console.log(data);
					deferred.resolve(data)
				}).error(function() {
					console.log("error")
				});
				return deferred.promise;
			},
			asyncGreet: function(name) {
				// perform some asynchronous operation, resolve or reject the promise when appropriate.
				return $q(function(resolve, reject) {
					setTimeout(function() {
						if(true) {
							resolve('Hello, ' + name + '!');
						} else {
							reject('Greeting ' + name + ' is not allowed.');
						}
					}, 1000);
				});
			}
		}
	}]);

	$provide.service("myAjax", ["$http", myAjax]);

	function myAjax($http) {
		return {
			get: function(url, params) {
				$http({
					url: url,
					method: 'get',
					data: params
				}).then(function(response) {
					console.log(response);
				}).then(function(response) {
					console.log(response);
				})
			}
		}
	}

	$provide.service("httpInterceptor" ["$q", httpInterceptor]);

	function httpInterceptor($q) {
		
		return {
			'request': function(config) {

				console.group("开始请求");
				return config;
			},
			'requestError': function(rejection) {
				console.log("请求  报错");
				
				return $q.reject(rejection);
			},
			'response': function(response) {
				console.log("成功返回");
				return response;

			},
			'responseError': function(rejection) {
				console.log("请求 返回 报错");
				switch(rejection.status) {
					case 404:
						console.log("this is  404");
						break;
					default:
						break;
				}
				return $q.reject(rejection);
			}

		}
	}

	$httpProvider.interceptors.push(httpInterceptor);

}]);