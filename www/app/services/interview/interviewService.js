/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('InterviewService',['$http','CommonService',function($http,CommonService) {
        return {
        	getToSigns: function(par,callback,callbackError) { //获取待面签列表
        	    CommonService.getJsonData('api/Interview/getToSigns', par).then(function(data) {
                    //console.log(data);
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	saveSign: function(par,callback,callbackError) { //提交面签信息
                ///console.log(par);
        	    CommonService.getJsonData('api/Interview/saveSign', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
        	updateSign: function(par,callback,callbackError) { // 修改面签信息
                ///console.log(par);
        	    CommonService.getJsonData('api/Interview/updateSign', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
            getBanks: function(par,callback,callbackError) { //获取银行卡列表
                CommonService.getJsonData('api/common/getBanks', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            UploadImg:function(filePath,par,callback){//上传证件图片
                CommonService.upload('api/common/UploadImg',filePath,par).then(function(data) {
                    callback(data);
                });
            },
            getAllAreas: function(par,callback,callbackError) { //获取所有城市区域
                CommonService.getJsonData('api/common/getAllAreas', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getDictionary:function(par,callback,callbackError){//获取字典表数据
                CommonService.getJsonData('api/common/getDictionary',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getStayInterviews:function(par,callback,callbackError){//获取待面签的单据
                CommonService.getJsonData('api/salesManager/getStayInterviews',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getSignInfo:function(par,callback,callbackError){//查看用户面签信息
                CommonService.getJsonData('api/interview/getSignInfo',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }
        }
    }]);
});
