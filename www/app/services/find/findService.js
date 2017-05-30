/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('FindService',['$http','CommonService',function($http,CommonService) {
        return {
        	GetHotCourse: function(par,callback,callbackError) { //获取热门充电站
        	    CommonService.getJsonData('api/AppFind/GetHotCourse', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},   
        	GetCourses: function(par,callback,callbackError) { //获取充电站列表
        	    CommonService.getJsonData('api/AppFind/GetCourses', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	}        	
        }
    }]);
});
