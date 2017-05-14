/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('TurnBillService',['$http','CommonService',function($http,CommonService) {
        return {
        	getSales:function(par,callback,callbackError){ //获取销售代表
        	    CommonService.getJsonData('api/single/getSales',par).then(function(data){
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	getSingles:function(par,callback,callbackError){ //获取待转单列表
        	    CommonService.getJsonData('api/single/getSingles',par).then(function(data){
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	getHistorySingle:function(par,callback,callbackError){ //获取已转单记录
        	    CommonService.getJsonData('api/single/getHistorySingle',par).then(function(data){
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
            saveSingle:function(par,callback,callbackError){ //设置转单信息
                CommonService.getJsonData('api/single/saveSingle',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getStayInterviews:function(par,callback,callbackError){ //设置转单信息
                CommonService.getJsonData('api/salesManager/getStayInterviews',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }
        }
    }]);
});
