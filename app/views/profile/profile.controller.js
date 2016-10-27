(function() {
	angular.module('angularMobileApp').controller("profileController", ['$scope', function($scope) {
		console.log("this is my profile controller");
		var text='<c>asdfasdf</c><b>asdfasdf</b><b>asdfasdf</b>这是文字<b>asdfasdf</b>123';
		var str= removeHTMLTag(text);
		"这是文字123"
		console.log("xxx")
		console.log(str);
	}]);

	function removeHTMLTag(str) {
		var RegExp =  /<[a-zA-Z]+>([\s\S])*<\/[a-zA-Z]+>?/
		str = str.replace(RegExp, '');
		return str;
	}
})();
//var RegExp = / <  [^>]+ >   /g;