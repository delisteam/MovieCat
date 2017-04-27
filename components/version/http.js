/**
 * Created by Administrator on 2017/3/31 0031.
 */
'use strict';
(function(angular){
	var http=angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp=function(url,data,callback){
			//if(typeof data=='function'){
			//	callback=data
			//}
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;
			// 不推荐
			//在WINDOW里放一个全局变量callback
			$window[cbFuncName] = callback;
			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
			}
			querystring += 'callback=' + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			$document[0].body.appendChild(scriptElement);
		}
	}])
})(angular)
