/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('HomeService',['$http','CommonService',function($http,CommonService) {
        return {
             GetOAuth: function(par,callback,callbackError) { //认证
                CommonService.getJsonData('api/AppHome/oAuth', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },    	       	
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
        	},
        	GetHotProduct: function(par,callback,callbackError) { //获取热门产品
        	    CommonService.getJsonData('api/AppHome/GetHotProduct', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	GetKnowledges: function(par,callback,callbackError) { //获取理财知识
        	    CommonService.getJsonData('api/AppHome/GetKnowledges', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	GetProducts: function(par,callback,callbackError) { //获取产品列表
        	    CommonService.getJsonData('api/AppHome/GetProducts', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	GetDetailProduct: function(par,callback,callbackError) { //获取产品详情
        	    CommonService.getJsonData('api/AppFind/GetDetailProduct', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	GetOrder: function(par,callback,callbackError) { //获取预约信息
        	    CommonService.getJsonData('api/AppFind/GetOrder', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	AddOrder: function(par,callback,callbackError) { //提交预约信息
        	    CommonService.getJsonData('api/AppFind/AddOrder', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	}
        }
    }]);
});
