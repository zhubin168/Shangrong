/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('HomeService',['$http','CommonService',function($http,CommonService) {
        return {
        	getBills: function(par,callback,callbackError) { //获取我的单量
        	    CommonService.getJsonData('api/Account/getBills', par).then(function(data) {
                    //console.log(data);
        	        callback(data);
        	    },function(error){
                    callbackError(error);
                });
        	},
            getAgentBills:function(par,callback,callbackError){ //代理人获取单量
                CommonService.getJsonData('api/Agent/getAgentBills',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            getDsmBills:function(par,callback,callbackError){ //客户经理获取单量
                CommonService.getJsonData('api/salesManager/getDsmBills',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            GetSalesFactorys:function(par,callback,callbackError){ //获取销售代表绑定的工厂
                CommonService.getJsonData('api/account/GetSalesFactorys',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            MakeQrCode:function(par,callback,callbackError){ //生成二维码Id
                CommonService.getJsonData('api/account/MakeQrCode',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            CreateQrcode:function(par,callback,callbackError){ //生成二维码java
                CommonService.getJsonData('api/account/CreateQrcode',par).then(function(data){
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            },
            uploadPhoto:function(filePath,par,callback){//上传合照图片
                CommonService.upload('api/common/UploadImg',filePath,par).then(function(data) {
                    callback(data);
                });
            },
            GetMyInvite:function(par, callback,callbackError) { //邀请进度
                CommonService.getJsonData('api/account/GetMyInvite', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }      
            
        }
    }]);
});
