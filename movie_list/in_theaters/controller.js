(function(angular){
  'use strict';
 var module= angular.module('moviecat.in_theaters', [
    'ngRoute',
	 'moviecat.services.http',
  ])
  module.config(['$routeProvider', function($routeProvider) {
	  //:page匹配页码
        $routeProvider.when('/in_theaters/:page', {
          templateUrl: 'in_theaters/view.html',
          controller: 'InTheatersController'
        });
      }])
  module.controller('InTheatersController', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
        //控制器，分为两步：1.设计暴露的数据。2.设计暴露的行为
        //$scope.subjects=data;
	  var count=10; //每一页的条数
	  var page=parseInt($routeParams.page); //接受的当前第几页
	  var start=(page-1)*count; //当前页从哪里开始
        $scope.subjects=[];
        $scope.message='';
	    $scope.totalCount=0;
	    $scope.title='';
	    $scope.totalPages=0;
	    $scope.loading=true;
	  $scope.currentPage = page;
	    HttpService.jsonp('https://api.douban.com/v2/movie/in_theaters',{start:start,count:count},function(data){
			$scope.subjects=data.subjects;
			$scope.title=data.title;
			$scope.totalCount=data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.loading=false;
			$scope.$apply('subjects')
			//apply只要调用一次就可以传递所以数据，所以放在最后
		})
		$scope.go=function(page){
			//传过来第几页就跳转到第几页
			if(page>=1&&page<=$scope.totalPages)
				$route.updateParams({page:page})
		}





        //var doubanApiAddress='https://api.douban.com/v2/movie/in_theaters'
        ////请求本地文件
        //$http.jsonp(doubanApiAddress).then(function (res) {
        //  if(res.status==200){
        //    //res里面还包涵了一层data,如果用data传递则是data.data
        //    //console.log(res)
        //    $scope.subjects=res.data.subjects;
        //  }else{
        //    $scope.message='获取数据错误,错误信息：'+res.statusText;
        //  }
        //  //console.log(234)
        //},function(err){
        //  console.log(err)
        //  $scope.message='获取数据错误,错误信息：'+err.statusText;
        //})
      }]);
})(angular)
