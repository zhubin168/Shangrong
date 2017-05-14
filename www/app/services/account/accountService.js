/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('AccountService',['$http','CommonService',function($http,CommonService) {
        return {
            login: function(par,callback,callbackError) { //登录
                CommonService.getJsonData('api/account/GetToken', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            saveMyBack: function(par, callback,callbackError) { //保存反馈信息
                CommonService.getJsonData('api/account/saveMyBack', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getBacks:function(par, callback,callbackError) { //获取反馈列表
                CommonService.getJsonData('api/account/getBacks', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }, 
            getCodes:function(par, callback,callbackError) { //获取推荐码数据
                CommonService.getJsonData('api/account/getCodes', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getVerifyCode:function(par, callback,callbackError) { //获取验证码
                CommonService.getJsonData('api/account/verifyCode', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            //客户代表角色的个人中心
            getMySigns:function(par, callback,callbackError) { //我的面签记录
                CommonService.getJsonData('api/account/getMySigns', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getMyRecommend:function(par, callback,callbackError) { //我的推荐记录
                CommonService.getJsonData('api/account/getMyRecommend', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getAgentRecommend:function(par, callback,callbackError) { //代理人的推荐记录
                CommonService.getJsonData('api/agent/getAgentRecommend', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getAgentReward:function(par,callback,callbackError){//代理人的 查询奖励明细
                CommonService.getJsonData('api/agent/getAgentReward',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getWsaByAgents:function(par, callback,callbackError) { //客户代码代理人管理
                CommonService.getJsonData('api/Account/getAgents', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getAgentsByMonth:function(par, callback,callbackError) { //代理人每月统计情况
                CommonService.getJsonData('api/Account/getAgentsByMonth', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getNoActive:function(par, callback,callbackError) { //未激活代理人列表
                CommonService.getJsonData('api/Account/getNoActive', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getActiveCode:function(par, callback,callbackError) { //生成激活二维码
                CommonService.getJsonData('api/Common/getActiveCode', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            //销售经理角色的个人中心
            getSales:function(par, callback,callbackError) { //客户经理管理的销售代表
                CommonService.getJsonData('api/salesManager/getSales', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getAgents:function(par, callback,callbackError) { //客户代表管理的代理人
                CommonService.getJsonData('api/salesManager/getAgents', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getFactorys:function(par, callback,callbackError) { //客户经理管理工厂信息
                CommonService.getJsonData('api/salesManager/getFactorys', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getSalesByFactroy:function(par, callback,callbackError) { //工厂对应的客户代表
                CommonService.getJsonData('api/salesManager/getSalesByFactroy', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getWagentByFactroy:function(par, callback,callbackError) { //工厂对应的代理人信息
                CommonService.getJsonData('api/agent/getWagentByFactroy', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            resetPwd:function(par,callback,callbackError){//重置密码
                CommonService.getJsonData('api/account/updatePassword', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            forgetPassword:function(par,callback,callbackError){//忘记密码
                CommonService.getJsonData('/api/account/forgetPassword', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }
        }
    }]);
});