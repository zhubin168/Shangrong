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
        $urlRouterProvider.otherwise('/app/home/0');

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

        .state('login', angularAMD.route({ //登录
            url: '/login',
            templateUrl: 'templates/account/login.html',
            css:'css/account/login.css',
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
                return "LoginCtrl";
            }
        }))

        .state('app.home', angularAMD.route({ //首页
            url: '/home/:isSx',
            views: {
                'app-home': {
                    templateUrl: 'templates/tab-home.html',
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
        
        .state('app.createQR', angularAMD.route({ //生成二维码
            url: '/createQR/:module/:isSx',
            views: {
                'app-home': {
                    templateUrl: 'templates/invite/createQR.html',
                    controller: 'createQRCtrl',
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
        
        .state('app.QRdetails', angularAMD.route({ //二维码信息详情
            url: '/QRdetails/:par',
            views: {
                'app-home': {
                    templateUrl: 'templates/invite/QRdetails.html',
                    controller: 'QRdetailsCtrl',
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
        
        .state('app.invitePro', angularAMD.route({ //邀请进度
            url: '/invitePro/:module/:isSx',
            views: {
                'app-home': {
                    templateUrl: 'templates/invite/invitePro.html',
                    controller: 'inviteProCtrl',
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

        .state('app.interview', angularAMD.route({ //面签管理
            url: '/interview/:isSx',
            css:['css/interview/interview.css','lib/ionic-filter-bar/dist/ionic.filter.bar.min.css'],
            views: {
                'app-interview': {
                    templateUrl: 'templates/interview/tab-interview.html',
                    controller: 'InterviewCtrl',
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var filterBar = "lib/ionic-filter-bar/dist/ionic.filter.bar.min.js"
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService,filterBar], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.customerInfo', angularAMD.route({ //客户信息
            url: '/customerInfo/:par/:module',
            css:'css/interview/interview.css',
            views: {
                'app-interview': {
                    templateUrl: 'templates/interview/customerInfo.html',
                    controller: 'customerInfoCtrl',
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
       
        .state('app.address', angularAMD.route({ //地址和联系方式
            url: '/address/:module',
            css:'css/interview/interview.css',
            views: {
                'app-interview': {
                    templateUrl: 'templates/interview/address.html',
                    controller: 'addressCtrl',
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.upload', angularAMD.route({ //附件上传
            url: '/upload/:module',
            css:['css/interview/interview.css','lib/animate.css/animate.min.css'],
            views: {
                'app-interview': {
                    templateUrl: 'templates/interview/upload.html',
                    controller: 'uploadCtrl',
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.turnBill', angularAMD.route({ //我要转单
            url: '/turnBill/:isSx',
            css:['css/interview/interview.css','lib/animate.css/animate.min.css'],
            views: {
                'app-turnBill': {
                    templateUrl: 'templates/turnBill/tab-turnBill.html',
                    controller: 'TurnBillCtrl'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var turnBillService = "app/services/turnBill/turnBillService.js";
                        var turnBillCtrl = "app/controllers/turnBill/turnBillCtrl.js";
                        var deferred = $q.defer();

                        require([turnBillService,turnBillCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.managerToInterview', angularAMD.route({ //销售经理转单
            url: '/managerToInterview/:isSx',
            css:['css/interview/interview.css','lib/animate.css/animate.min.css'],
            views: {
                'app-managerToInterview': {
                    templateUrl: 'templates/interview/tab-managerToInterview.html',
                    controller: 'MToInterviewCtrl'
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var turnBillService = "app/services/turnBill/turnBillService.js";
                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var deferred = $q.defer();

                        require([turnBillService,interviewCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.history', angularAMD.route({ //转单历史记录
            url: '/history',
            css:'css/interview/interview.css',
            views: {
                'app-turnBill': {
                    templateUrl: 'templates/turnBill/history.html',
                    controller: 'HisTurnBillCtrl'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var turnBillService = "app/services/turnBill/turnBillService.js";
                        var turnBillCtrl = "app/controllers/turnBill/turnBillCtrl.js";
                        var deferred = $q.defer();

                        require([turnBillService,turnBillCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
		.state('app.sendHistory', angularAMD.route({ //销售经理派单历史记录
		            url: '/sendHistory',
		            css:'css/interview/interview.css',
		            views: {
		                'app-managerToInterview': {
		                    templateUrl: 'templates/interview/sendHistory.html',
		                    controller: 'sendHistroyCtrl'
		                }
		            },
		            resolve: {
		                loadController: ['$q', '$stateParams',
		                    function($q, $stateParams) {
		
		                        var turnBillService = "app/services/turnBill/turnBillService.js";
		                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
		                        var deferred = $q.defer();
		
		                        require([turnBillService,interviewCtrl], function() {
		                            deferred.resolve();
		                        });
		                        return deferred.promise;
		                    }
		                ]
		            }
		}))
		 
        .state('app.account', angularAMD.route({ //用户中心
            url: '/account',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/tab-account.html',
                    controller: 'AccountCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.accountCustomerInfo', angularAMD.route({ //个人中心客户信息
            url: '/accountCustomerInfo/:par/:module',
            css:'css/interview/interview.css',
            views: {
                'app-account': {
                    templateUrl: 'templates/interview/customerInfo.html',
                    controller: 'customerInfoCtrl',
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        
        .state('app.accountAddress', angularAMD.route({ //地址和联系方式
            url: '/accountAddress/:module',
            css:'css/interview/interview.css',
            views: {
                'app-account': {
                    templateUrl: 'templates/interview/address.html',
                    controller: 'addressCtrl',
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.accountUpload', angularAMD.route({ //附件上传
            url: '/accountUpload/:module',
            css:'css/interview/interview.css',
            views: {
                'app-account': {
                    templateUrl: 'templates/interview/upload.html',
                    controller: 'uploadCtrl',
                }
            },
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var interviewCtrl = "app/controllers/interview/interviewCtrl.js";
                        var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([interviewCtrl, interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.agentManage', angularAMD.route({ //客户代表>代理人管理
            url: '/agentManage/:module/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/agentManage.html',
                    controller: 'WsaByAgentsCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.developInfo', angularAMD.route({ //客户代表>代理人管理>每月开发统计
            url: '/developInfo/:wagtId',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/developInfo.html',
                    controller: 'AgentsByMonthsCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.agentActive', angularAMD.route({ //客户代表>代理人激活
            url: '/agentActive/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/agentActive.html',
                    controller: 'NoActiveCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.activeCode', angularAMD.route({ //客户代表>激活码页面
            url: '/activeCode/:activationCode/:agentName',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/activeCode.html',
                    controller: 'ActiveCodeCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.setting', angularAMD.route({ //设置
            url: '/setting',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/setting.html',
                    controller: 'SettingCtrl'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.myInterview', angularAMD.route({ //我的面签
            url: '/myInterview/:module/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/myInterview.html',
                    controller: 'SignListCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.myRecommend', angularAMD.route({ //客户代表_我的推荐
            url: '/myRecommend',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/myRecommend.html',
                    controller: 'RecommendListCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.AgentRecommend', angularAMD.route({ //代理人_我的推荐
            url: '/AgentRecommend',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/AgentRecommend.html',
                    controller: 'AgentRecommendListCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.factoryList', angularAMD.route({ //客户经理_管理工厂信息
            url: '/factoryList/:module/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/factoryList.html',
                    controller: 'factoryListCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.factorySales', angularAMD.route({ //客户经理_工厂对应的客户代表
            url: '/factorySales/:factoryId',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/factorySales.html',
                    controller: 'factroyBySalesCtrl',
                    css: 'css/account/account.css'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.dsmBySales', angularAMD.route({ //客户经理_管理的客户代表
            url: '/dsmBySales/:module/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/dsmBySales.html',
                    controller: 'dsmBySalesCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
          
        .state('app.agentList', angularAMD.route({ //客户代表对应代理人信息
            url: '/agentList/:saleId',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/agentList.html',
                    controller: 'agentListCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
          
        .state('app.code', angularAMD.route({ //我的推荐码
            url: '/code/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/code.html',
                    controller: 'CodeListCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache: false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {

                        var accountService = "app/services/account/accountService.js";
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.feedback', angularAMD.route({ //意见反馈
            url: '/feedback',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/feedback.html',
                    controller: 'FeedBackCtrl',
                    css: 'css/account/account.css'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var accountService = "app/services/account/accountService.js";

                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.feedbackList', angularAMD.route({ //反馈列表
            url: '/feedbackList/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/feedbackList.html',
                    controller: 'FeedBackListCtrl',
                    css: 'css/account/account.css'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var accountCtrl = "app/controllers/account/accountCtrl.js";
                        var accountService = "app/services/account/accountService.js";

                        var deferred = $q.defer();

                        require([accountService, accountCtrl], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))

        .state('app.updatePassword', angularAMD.route({ //修改密码
            url: '/updatePassword',
            views: {
                'app-account': {
                    templateUrl: 'templates/account/updatePassword.html',
                    controller: 'UpdatePasswordCtrl',
                    css: 'css/account/account.css'
                }
            },
            //cache:false,
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
            }
        }))
        
        .state('changePwd', angularAMD.route({ //忘记密码
            url: '/changePwd',
            templateUrl: 'templates/account/changePwd.html',
            css: 'css/account/account.css',
            //cache:false,
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
                return "ForgetPasswordCtrl";
            }
        }))
        //代理人申请HTML start
        .state('agreement', angularAMD.route({ //签订协议
            url: '/agreement/:parm',
            templateUrl: 'templates/agent/agreement.html',
            css:'css/account/account.css',
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "agreementCtrl";
            }
        }))   
        
        .state('applyPlan', angularAMD.route({ //申请进度
            url: '/  ',
            cache:false,            
            templateUrl: 'templates/agent/applyPlan.html',
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentActivateCtrl";
            }
        }))     
        
        .state('agentInfo', angularAMD.route({ //代理人信息
            url: '/agentInfo/:par',
            templateUrl: 'templates/agent/agentInfo.html',
            css:'css/interview/interview.css',
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentInfoCtrl";
            }
        }))

        .state('agentAddress', angularAMD.route({ //代理人地址信息
            url: '/agentAddress',
            templateUrl: 'templates/agent/agentAddress.html',
            css:'css/interview/interview.css',
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentAddressCtrl";
            }
        }))

        .state('agentJobs', angularAMD.route({ //代理人工作信息
            url: '/agentJobs',
            templateUrl: 'templates/agent/agentJobs.html',
            css:'css/interview/interview.css',
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentJobsCtrl";
            }
        }))

        .state('agentContactInfo', angularAMD.route({ //代理人紧急联系人信息
            url: '/agentContactInfo',
            templateUrl: 'templates/agent/agentContactInfo.html',
            css:'css/interview/interview.css',
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";

                         var interviewService = "app/services/interview/interviewService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService,interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentContactInfoCtrl";
            }
        }))

        .state('agentAttachment', angularAMD.route({ //代理人附件上传
            url: '/agentAttachment',
            templateUrl: 'templates/agent/attachment.html',
            css:'css/interview/interview.css',
            cache:false,
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentAttachmentCtrl";
            }
        }))

        .state('agentActivate', angularAMD.route({ //代理人账号激活
            url: '/agentActivate',
            templateUrl: 'templates/agent/agentActivate.html',
            css:'css/account/account.css',
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var deferred = $q.defer();

                        require([agentCtrl, agentService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            },
            controllerProvider: function($stateParams) {
                return "AgentActivateCtrl";
            }
        }))

        .state('app.agentBanks', angularAMD.route({ //代理人银行卡管理
            url: '/agentBanks/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/agent/agentBanks.html',
                    controller: 'AgentBanksCtrl',
                    css:'css/account/account.css'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var interviewService = "app/services/interview/interviewService.js";

                        var deferred = $q.defer();

                        require([agentCtrl, agentService,interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }))
        
        .state('app.agentAward', angularAMD.route({ //代理人奖励明细
            url: '/agentAward/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/agent/agentAward.html',
                    controller: 'AgentRewardCtrl',
                    css:'css/account/account.css'
                }
            },
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
            }
        }))
        
        .state('app.addAgentBank', angularAMD.route({ //代理人添加银行卡
            url: '/addAgentBank/:isSx',
            views: {
                'app-account': {
                    templateUrl: 'templates/agent/agentAddBank.html',
                    controller: 'AgentAddBankCtrl',
                    css:'css/interview/interview.css'
                }
            },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function($q, $stateParams) {
                        var agentCtrl = "app/controllers/agent/agentCtrl.js";
                        var agentService = "app/services/agent/agentService.js";
                        var interviewService = "app/services/interview/interviewService.js";

                        var deferred = $q.defer();

                        require([agentCtrl, agentService,interviewService], function() {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                ]
            }
        }));

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
