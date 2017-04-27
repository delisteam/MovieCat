(function(angular){
  'use strict';
 var module= angular.module('moviecat.movie_list', [
    'ngRoute',
	 'moviecat.services.http',
  ])
  module.config(['$routeProvider', function($routeProvider) {
  	//category为in_thearters或者comming_soon,top250
        $routeProvider.when('/:category/:page', {
          templateUrl: 'movie_list/view.html',
          controller: 'MovieListcontroller'
        });
      }])

  module.controller('MovieListcontroller', ['$scope','$route','$routeParams','HttpService','Appconfig',function($scope,$route,$routeParams,HttpService,Appconfig) {
   
	  var count=Appconfig.pageSize; 
	  var page=parseInt($routeParams.page); 
	  var start=(page-1)*count;
        $scope.subjects=[];
        $scope.message='';
	    $scope.totalCount=0;
	    $scope.title='';
	    $scope.totalPages=0;
	    $scope.loading=true;
	    $scope.currentPage = page;
	    HttpService.jsonp(Appconfig.listApiAddress+$routeParams.category,{start:start,count:count,q: $routeParams.q},function(data){
	    	
			$scope.subjects=data.subjects;
			$scope.title=data.title;
			$scope.totalCount=data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.loading=false;
			$scope.$apply('subjects')
		})
		$scope.go=function(page){
			if(page>=1&&page<=$scope.totalPages)
				$route.updateParams({page:page})
	
		}
      }]);
})(angular)
