(function() {
	app.controller("carouselCtrl", ["$scope", "myAjax", function($scope, myAjax) {
		console.log("this is carouselCtrl");
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		var slides = $scope.slides = [];
		var currIndex = 0;

		$scope.addSlide = function() {
			var newWidth = 600 + slides.length + 1;
			slides.push({
				image: '//unsplash.it/' + newWidth + '/300',
				text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
				id: currIndex++
			});
		};

		$scope.randomize = function() {
			var indexes = generateIndexesArray();
			assignNewIndexesToSlides(indexes);
		};

		for(var i = 0; i < 4; i++) {
			$scope.addSlide();
		}

		// Randomize logic below

		function assignNewIndexesToSlides(indexes) {
			for(var i = 0, l = slides.length; i < l; i++) {
				slides[i].id = indexes.pop();
			}
		}

		function generateIndexesArray() {
			var indexes = [];
			for(var i = 0; i < currIndex; ++i) {
				indexes[i] = i;
			}
			return shuffle(indexes);
		}

		// http://stackoverflow.com/questions/962802#962890
		function shuffle(array) {
			var tmp, current, top = array.length;

			if(top) {
				while(--top) {
					current = Math.floor(Math.random() * (top + 1));
					tmp = array[current];
					array[current] = array[top];
					array[top] = tmp;
				}
			}

			return array;
		}
		console.log($scope.config);
		$scope.config.squartList = $scope.config.server + '/user/square/getTop5'; //首页
		myAjax.get($scope.config.squartList)
		console.log("xxxxx");
	}]);

})();

/*//接口url
		var config = {};
		config.server = location.protocol + '//' + location.host;
		//会员广场
		config.squartList = config.server + '/user/square/getTop5'; //首页
		
		config.aboutDesc = config.server + '/global/getRuleDesc';
		config.acceptMsgList = config.server + '/user/msg/getReList'
		$.ajax({
			type: 'get',
			dataType: 'json',
			url: config.acceptMsgList,
			global: false,
			success: function(data) {
				console.log(data);
			}
		});
		//http://localhost:88/topic/getViewInfo?tId=390
		var url=config.server+'/topic/getViewInfo?tId=390';
		$.ajax({
			type: 'get',
			dataType: 'json',
			url: url,
			global: false,
			success: function(data) {
				console.log(data);
			}
		});*/