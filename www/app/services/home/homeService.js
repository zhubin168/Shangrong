/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('HomeService',['$http','CommonService',function($http,CommonService) {
        return {
        	GetBanners: function(par,callback,callbackError) { //获取banner
        	    CommonService.getJsonData('api/AppHome/GetBanners', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},   
        	GetInformations: function(par,callback,callbackError) { //获取资讯
        	    CommonService.getJsonData('api/AppHome/GetInformations', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	}    	
        }
    }]);
});
