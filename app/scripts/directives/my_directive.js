app.directive('myDirective', function() {
	return {
		link: function(scope, element) {}
	};
});

app.directive("touchslide", function() {
	return {
		restrict: 'AE',
		scope:{
			autoPlay:'@autoplay'
		},
		link: function(scope, elem, attrs) {
			console.log(scope);
			console.log("touch silide ")
			console.log(attrs);
			TouchSlide({
				slideCell: "#"+attrs.id,
				titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
				mainCell: ".bd ul",
				effect: "leftLoop",
				autoPlay: scope.autoPlay, //自动播放
				autoPage: true //自动分页
			});
		}
	}
});