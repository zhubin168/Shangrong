/**
 * Created by tianxc on 16-7-29.
 */
define([
    'angular',
    'angularAMD',
    'file-upload',
    'ngFile',
    'bindonce',
    'ui-bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ui-router',
    'directive/directives',
    'filters/filters',
    'services/common/commonService',
    'jquery',
    'localStorageUsage',
    'angular-loading',
    'spinjs',
    'angular-toastr',
    'dateTimePicker',
    'angular-zh-cn',
], function(angular, angularAMD) {
    'use strict';
    var serviceUrl = 'http://localhost:47426/';  //zhubin
    var picterServiceURL="http://10.10.11.95:9008/onLine/";

    var app = angular.module('app', [
         'ui.router', 'ui.bootstrap','ui.bootstrap.datetimepicker','ngAnimate', 'ngSanitize','ngFileUpload', 'app.directives', 'app.filters', 'app.commonService','localStorageUsage','darthwade.dwLoading','toastr'
    ]);

    //全局常量
    app.constant('Settings', {
        apiServiceBaseUrl: serviceUrl,
        picterServiceURL:picterServiceURL,
        clientId: 'CollectionPC',
        version: '1.0.0',
        deBug: false
    });

    // 配置
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        
        //判断是否登录
        var authData = null;
        authData = localStorage.getItem('onLineauthorization');
        if(authData != undefined && authData != null)
        {
            authData = eval('(' + authData + ')');
        }
        if (authData === null) {
            $urlRouterProvider.otherwise('/login');
        } else {
            $urlRouterProvider.otherwise('/home');
        }
        $stateProvider
            .state('home', angularAMD.route({
                url: '/home',
                templateUrl:  'templates/home/index.html',
                resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var homeCtrl = "app/controllers/home/homeCtr.js";
		                        var homeService = "app/services/home/homeService.js";
		                        var accountService = "app/services/account/accountService.js";
		                        var deferred = $q.defer();
		                        require([homeCtrl, homeService, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		        controllerProvider: function($stateParams) {
		                return "homeCtrl";
		            }
            }))
            .state('login', angularAMD.route({ //登录
		            url: '/login',
		            templateUrl: 'templates/account/login.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "LoginCtrl";
		            }
		    }))
            
            .state('forgetPwd', angularAMD.route({ //忘记密码
		            url: '/forgetPwd',
		            templateUrl: 'templates/account/forgetPwd.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "forgetPwdCtrl";
		            }
		    }))
            
            .state('home.modifPwd', angularAMD.route({ //修改密码
		            url: '/modifPwd',
		            templateUrl: 'templates/account/modifPwd.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "modifPwdCtrl";
		            }
		    }))
            
            .state('home.getConfigs', angularAMD.route({ //数据字典
		            url: '/getConfigs',
		            templateUrl: 'templates/config/getConfigs.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var configCtr = "app/controllers/config/configCtr.js";
		                        var configService = "app/services/config/configService.js";
		
		                        var deferred = $q.defer();
		                        require([configCtr, configService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "configCtrl";
		            }
		    }))
            
            .state('home.getUsers', angularAMD.route({ //理财师管理列表
		            url: '/getUsers',
		            templateUrl: 'templates/account/getUsers.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "weixinUserCtrl";
		            }
		    }))
            
            .state('home.getArticles', angularAMD.route({ //资讯管理列表
		            url: '/getArticles',
		            templateUrl: 'templates/account/getArticles.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "articlesCtrl";
		            }
		    }))
            
            .state('home.getOrders', angularAMD.route({ //订单管理列表
		            url: '/getOrders',
		            templateUrl: 'templates/account/getOrders.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "ordersCtrl";
		            }
		    }))
            
             .state('home.getProducts', angularAMD.route({ //产品管理列表
		            url: '/getProducts',
		            templateUrl: 'templates/account/getProducts.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "productsCtrl";
		            }
		    }))
             
             .state('home.getCourses', angularAMD.route({ //课程管理列表
		            url: '/getCourses',
		            templateUrl: 'templates/account/getCourses.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "coursesCtrl";
		            }
		    }))
             
               .state('home.getActives', angularAMD.route({ //活动管理列表
		            url: '/getActives',
		            templateUrl: 'templates/account/getActives.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "activesCtrl";
		            }
		    }))
               
                 .state('home.getTools', angularAMD.route({ //获客助手管理列表
		            url: '/getTools',
		            templateUrl: 'templates/account/getTools.html',
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		                        var accountCtrl = "app/controllers/account/accountCtr.js";
		                        var accountService = "app/services/account/accountService.js";
		
		                        var deferred = $q.defer();
		                        require([accountCtrl, accountService], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            },
		            controllerProvider: function($stateParams) {
		                return "toolsCtrl";
		            }
		    }))
    }]);

    return angularAMD.bootstrap(app);
});
