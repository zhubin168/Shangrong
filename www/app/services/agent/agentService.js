/**
 * Created by tianxc on 16-10-12.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('AgentService',['$http','$ionicLoading','CommonService',function($http,$ionicLoading,CommonService) {
        return {
        	saveAgentApply: function(par,callback,callbackError) { //代理人申请数据保存
        	    CommonService.getJsonData('api/agent/saveAgentApply', par).then(function(data) {
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
            getFactorys:function(par,callback,callbackError){//查询工厂列表
                CommonService.getJsonData('api/agent/getFactorys', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            saveAgentActivate:function(par,callback,callbackError){//代理人激活接口
                CommonService.getJsonData('api/agent/saveAgentActivate',par).then(function(data){
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
            saveBankInfo:function(par,callback,callbackError){//新增银行卡
                CommonService.getJsonData('api/agent/saveBankInfo',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getMyBanks:function(par,callback,callbackError){//获取我的银行卡列表
                CommonService.getJsonData('api/agent/getMyBanks',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error)
                });
            },
            setDefalutBank:function(par,callback,callbackError){//设置默认银行卡
                CommonService.getJsonData('api/agent/setDefaultBank',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            deleteMyBanksById:function(par,callback,callbackError){//删除银行卡
                CommonService.getJsonData('api/agent/deleteMyBanks',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            checkClientInfo:function(par,callback,callbackError){//客户代表信息校验
                CommonService.getJsonData('api/agent/checkClientInfo',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getApplyProgress:function(par,callback,callbackError){//查看申请进度
                CommonService.getJsonData('api/agent/getApplyProgress',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getAgentApplys:function(par,callback,callbackError){//查看申请代表人详情
                CommonService.getJsonData('api/agent/getAgentApplys',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }
        }
    }]);
});