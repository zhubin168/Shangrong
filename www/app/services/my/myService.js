/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('MyService',['$http','CommonService',function($http,CommonService) {
        return {
        	GetMineParent: function(par,callback,callbackError) { //我的理财师
        	    CommonService.getJsonData('api/AppMine/GetMineParent', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},     
        	ApplyManager: function(par,callback,callbackError) { //理财师认证
        	    CommonService.getJsonData('api/AppMine/ApplyManager', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},    
        	GetPersonCenter: function(par,callback,callbackError) { //获取个人信息
        	    CommonService.getJsonData('api/AppMine/GetPersonCenter', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	}        	
        }
    }]);
});
