'use strict';

// Declare app level module which depends on views, and components
var myapp=angular.module('moviecat', [
    'ngRoute',
	'moviecat.movie_detail',
	'moviecat.movie_list',
	
])
myapp.constant('Appconfig',{
	pageSize:10,
	listApiAddress:'https://api.douban.com/v2/movie/',
	detailApiAddress:'https://api.douban.com/v2/movie/subject/'
})
myapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
myapp.controller('SearchController', [
		'$scope',
		'$route',
		function($scope, $route) {
			$scope.input = ''; // 取文本框中的输入
			$scope.search = function() {
				$route.updateParams({ category: 'search', q: $scope.input });
			};
		}
	])
myapp.controller('NavController',['$scope','$location',function($scope,$location){
	$scope.$location=$location;
	$scope.$watch('$location.path()',function(now){
		//startWith检测一个字符串是否以。。开头
		if(now.startsWith('/in_theaters')){
			$scope.type='in_theaters';
		}else if(now.startsWith('/coming_soon')){
			$scope.type='coming_soon';
		}else if(now.startsWith('/top250')){
			$scope.type='top250';
		}
		console.log($scope.type)
	})

}]);
