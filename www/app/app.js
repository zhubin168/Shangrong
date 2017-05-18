/**
 * Created by tianxc on 16-7-29.
 */
define([
    'angular',
    'angularAMD',
    'ngCordova',
    'angularCss',
    'ionic',
    'lazy-image',
    'bindonce',
    'signalR',
    'tooltips',
    'identCheck',
    'localStorageUsage',
    'directive/directives',
    'filters/filters',
    'services/common/commonService',
    'selcity',
], function(angular, angularAMD) {
    'use strict';

    var serviceUrl = 'http://120.132.178.72/'; 

    var devUploadImgUrl = 'http://10.10.72.35:8047/Upload/'; //测试
    var imgUrl = 'http://photo.dafysz.cn:8081/';

    var app = angular.module('app', [
        'ionic','ngCordova', 'ngLocale', 'door3.css', 'afkl.lazyImage','720kb.tooltips','check.identCheck','pasvaz.bindonce', 'localStorageUsage', 'app.directives', 'app.filters', 'app.commonService','ionic-selcity'
    ]);

    app.config(['$httpProvider', '$ionicConfigProvider', function($httpProvider, $ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');

        $ionicConfigProvider.views.forwardCache(true); //开启全局缓存
        //$ionicConfigProvider.views.maxCache(0); //关闭缓存
        $httpProvider.defaults.headers.put['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

    }]);
    //全局常量
    app.constant('Settings', {
        apiServiceBaseUrl: serviceUrl,
        devUploadImgUrl: devUploadImgUrl,
        imgUrl: imgUrl,
        clientId: 'srhApp',
        version: '1.0.0',
        deBug: true
    });
    // app.constant('$ionicLoadingConfig', {
    //     template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner><div style="color:#ccc;">加载中，请稍候…</div>'
    // });
    // 配置
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

        var authData = null;
       // var RoleId=window.localStorage.getItem("cnlRoleId");
        for (var key in window.localStorage) {
            if (key.indexOf('authorizationData') > 0) {
                authData = window.localStorage.getItem(key);

                authData = eval('(' + authData + ')');
                break;
            }
        }
        // $localStorageUsage.getItem('authorizationData');
        $httpProvider.interceptors.push(function($q) {
            return {
                // request: function(config) {
                //     config.headers = config.headers || {};
                //     if (authData) {
                //         //console.log('authData.token='+authData.token);
                //         config.headers.Authorization = 'Bearer ' + authData.token;
                //     }
                //     return config;
                // },
                requestError: function(rejection) {
                    console.log(rejection);
                    return $q.reject(rejection);
                },
                response: function(response) {
                    //console.log(response);
                    //console.log(response);
                    return response;
                },
                responseError: function(rejection) {
                    //console.log(rejection.status);
                    if (rejection.status === 401||rejection.status === 500) {
                        $location.path('login');
                    }
                    return $q.reject(rejection);
                }
            };
        });
        // default
        $urlRouterProvider.otherwise('/app/home');

        $stateProvider

       .state('app', angularAMD.route({
            url: '/app',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
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
                return "tabCtrl";
            }
        }))

        .state('app.home', angularAMD.route({ //首页
            url: '/home',
            views: {
                'app-home': {
                    templateUrl: 'templates/home/tab-home.html',
                    controller: 'HomeCtrl',
                }
            },
            //cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var homeCtrl = "app/controllers/home/homeCtrl.js";
                        var homeService = "app/services/home/homeService.js";

                        var deferred = $q.defer();

                        require([homeCtrl,homeService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.find', angularAMD.route({ //发现
            url: '/find',
            views: {
                'app-find': {
                    templateUrl: 'templates/find/find.html',
                    controller: 'HomeCtrl',
                }
            },
            //cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var homeCtrl = "app/controllers/home/homeCtrl.js";
                        var homeService = "app/services/home/homeService.js";

                        var deferred = $q.defer();

                        require([homeCtrl,homeService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.my', angularAMD.route({ //我的
            url: '/my',
            views: {
                'app-my': {
                    templateUrl: 'templates/my/my.html',
                    controller: 'HomeCtrl',
                }
            },
            //cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var homeCtrl = "app/controllers/home/homeCtrl.js";
                        var homeService = "app/services/home/homeService.js";

                        var deferred = $q.defer();

                        require([homeCtrl,homeService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
 
        .state('app.productList', angularAMD.route({ //产品列表
            url: '/productList',
            views: {
                'app-productList': {
                    templateUrl: 'templates/home/productList.html',
                    controller: 'HomeCtrl',
                }
            },
            //cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var homeCtrl = "app/controllers/home/homeCtrl.js";
                        var homeService = "app/services/home/homeService.js";

                        var deferred = $q.defer();

                        require([homeCtrl,homeService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))       

    }]);

    app.run(['$ionicPlatform','$state', '$ionicPopup', '$rootScope', '$location', '$timeout', '$ionicHistory', '$cordovaToast','$cordovaInAppBrowser','CommonService', 'NetworkService', '$localStorageUsage', 'JPushService',function($ionicPlatform,$state, $ionicPopup, $rootScope, $location, $timeout, $ionicHistory, $cordovaToast,$cordovaInAppBrowser,CommonService, NetworkService, $localStorageUsage, JPushService) {

        $ionicPlatform.ready(function() {
            
            var authData = $localStorageUsage.getItem("authorizationData");

            if (authData != null) {
                authData = eval('(' + authData + ')');

                $rootScope.token = authData.data.token;
                $rootScope.roleId=authData.data.role;
            }
        });
    }]);

    return angularAMD.bootstrap(app);
});
