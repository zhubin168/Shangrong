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
        	}, 
        	GetUserInfo: function(par,callback,callbackError) { //获取用户信息
        	    CommonService.getJsonData('api/AppFind/GetUserInfo', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},   
        	SaveUserInfo: function(par,callback,callbackError) { //保存用户信息
        	    CommonService.getJsonData('api/AppFind/SaveUserInfo', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},        
        	GetArticles: function(par,callback,callbackError) { //发文章
        	    CommonService.getJsonData('api/AppFind/GetArticles', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},   
        	GetArticleDetail: function(par,callback,callbackError) { //发文章详情
        	    CommonService.getJsonData('api/AppFind/GetArticleDetail', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	}        	
        }
    }]);
});
