/**
 * Created by tianxc on 16-8-3.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('AccountService', function($http,CommonService) {
        return {
            login: function(par,callback) { //登录
                CommonService.getJsonData('api/home/login', par).then(function(data) {
                    callback(data);
                });
            },
            updatePassword: function(par,callback) { //修改密码
                CommonService.getJsonData('api/home/updatePassword', par).then(function(data) {
                    callback(data);
                });
            },
            findPassword: function(par,callback) { //忘记密码
                CommonService.getJsonData('api/home/FindPassword', par).then(function(data) {
                    callback(data);
                });
            },
            verifyCode: function(par,callback) { //获取手机验证码
                CommonService.getJsonData('api/home/verifyCode', par).then(function(data) {
                    callback(data);
                });
            },
            getUsers: function(par,callback) { //理财师管理列表
                CommonService.getJsonData('api/Financial/GetUsers', par).then(function(data) {
                    callback(data);
                });
            }, 
            getArticles: function(par,callback) { //资讯管理列表
                CommonService.getJsonData('api/Article/getArticles', par).then(function(data) {
                    callback(data);
                });
            }, 
            getOrders: function(par,callback) { //订单管理列表
                CommonService.getJsonData('api/Order/GetOrders', par).then(function(data) {
                    callback(data);
                });
            }, 
            getProducts: function(par,callback) { //产品管理列表
                CommonService.getJsonData('api/Product/GetProducts', par).then(function(data) {
                    callback(data);
                });
            }, 
            getCourses: function(par,callback) { //课程管理列表
                CommonService.getJsonData('api/Course/GetCourses', par).then(function(data) {
                    callback(data);
                });
            }, 
            getActives: function(par,callback) { //活动管理列表
                CommonService.getJsonData('api/Active/GetActives', par).then(function(data) {
                    callback(data);
                });
            }, 
            getTools: function(par,callback) { //获客助手管理列表
                CommonService.getJsonData('api/Tool/GetTools', par).then(function(data) {
                    callback(data);
                });
            }, 
            delActives: function(par,callback) { //删除活动
                CommonService.getJsonData('api/Active/DelActives', par).then(function(data) {
                    callback(data);
                });
            }, 
            delArticles: function(par,callback) { //删除文章
                CommonService.getJsonData('api/Article/DelArticles', par).then(function(data) {
                    callback(data);
                });
            }, 
            delConfig: function(par,callback) { //删除字典
                CommonService.getJsonData('api/Config/DeleteConfig', par).then(function(data) {
                    callback(data);
                });
            }, 
            delCourses: function(par,callback) { //删除课程
                CommonService.getJsonData('api/Course/DelCourses', par).then(function(data) {
                    callback(data);
                });
            }, 
            delUsers: function(par,callback) { //删除用户
                CommonService.getJsonData('api/Financial/DelUsers', par).then(function(data) {
                    callback(data);
                });
            }, 
            delProducts: function(par,callback) { //删除产品
                CommonService.getJsonData('api/Product/DelProducts', par).then(function(data) {
                    callback(data);
                });
            }, 
            delTools: function(par,callback) { //删除助手
                CommonService.getJsonData('api/Tool/DelTools', par).then(function(data) {
                    callback(data);
                });
            }, 
            delOrders: function(par,callback) { //删除订单
                CommonService.getJsonData('api/Order/DelOrders', par).then(function(data) {
                    callback(data);
                });
            }, 
            saveActives: function(par,callback) { //保存活动信息
                CommonService.getJsonData('api/Active/SaveActives', par).then(function(data) {
                    callback(data);
                });
            }, 
            saveArticles: function(par,callback) { //保存资讯信息
                CommonService.getJsonData('api/Article/SaveArticles', par).then(function(data) {
                    callback(data);
                });
            }, 
            saveCourses: function(par,callback) { //保存课程信息
                CommonService.getJsonData('api/Course/SaveCourses', par).then(function(data) {
                    callback(data);
                });
            }, 
            saveUsers: function(par,callback) { //修改用户信息
                CommonService.getJsonData('api/Financial/SaveUsers', par).then(function(data) {
                    callback(data);
                });
            }, 
            saveProducts: function(par,callback) { //保存产品信息
                CommonService.getJsonData('api/Product/SaveProducts', par).then(function(data) {
                    callback(data);
                });
            }, 
            saveTools: function(par,callback) { //保存获客助手
                CommonService.getJsonData('api/Tool/SaveTools', par).then(function(data) {
                    callback(data);
                });
            }, 
            uploadImg: function(par,file, callback) { //上传模板
                CommonService.uploadFile('api/Common/UploadImg',file,par).then(function(data) {
                    callback(data);
                });
            }
        }
    });
});