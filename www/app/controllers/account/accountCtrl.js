/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
	app.controller('AccountCtrl', ['$scope', '$rootScope', '$state','$ionicHistory','$window', '$ionicPopup','$css','CommonService', 'Settings', function($scope, $rootScope, $state, $ionicHistory,$window,$ionicPopup,$css,CommonService, Settings) {
			// $css.add('./css/account/account.css');

			$scope.version = 'V' + Settings.version;

			//清除所有缓存
			$scope.clearAllCache = function() {
					var confirmPopup = $ionicPopup.confirm({
						title: '<strong>清除缓存</strong>',
						template: '清除缓存会把应用所有缓存数据清除,你确定要清除吗?',
						okText: '清除',
						cancelText: '取消'
					});
					confirmPopup.then(function(res) {
						if(res) {
							CommonService.clearStorage('authorizationData');
							CommonService.showToast('清除缓存成功!', 2000);
							// $ionicHistory.clearCache().then(function(){ 
							// 	//$state.go('login'); 
							// 	CommonService.showToast('清除缓存成功!', 2000);
							// 	return;
							// });
							//$state.go('login');
						}
					});
			}
				//检测版本
			$scope.checkVersion = function() {
				$rootScope.checkUpdateVersion(true);
			}

			$scope.exitConfirm = function() { //退出APP
				var confirmPopup = $ionicPopup.confirm({
					title: '<strong>退出应用?</strong>',
					template: '你确定要退出应用吗?',
					okText: '退出',
					cancelText: '取消'
				});
				confirmPopup.then(function(res) {
					if(res) {
						CommonService.removeStorageItem('authorizationData');
						$ionicHistory.clearHistory();
						$ionicHistory.clearCache().then(function(){ 
							$state.go('login'); 
						});
						// if (ionic.Platform.isIOS()){
						// 	$ionicHistory.clearHistory();
						// 	$ionicHistory.clearCache().then(function(){ 
						// 		$state.go('login'); 
						// 	});
						// }else{
						// 	ionic.Platform.exitApp();
						// }
					}
				});
			};
			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				$window.location = '#/app/account';
				//$window.location='#/app/home';
				//$state.go('app.home',{'module':'home','isSx':Math.random()*10});
			}
			// $scope.openUrl=function(url){//打开面签管理
			//     $state.go(url,{'isSx':Math.random()*10});
			// }
			$scope.openUrl=function(url,module){//打开面签管理
			    if(module==null || module=='home'){
			        $state.go(url,{'isSx':Math.random()*10});
			    }else{
			        $state.go(url,{'module':module,'isSx':Math.random()*10});
			    }
			}
		}])
		.controller('tabCtrl', ['$css', '$scope', '$rootScope', '$state', '$ionicActionSheet', '$ionicLoading', 'CommonService', 'AccountService', 'Settings', function($css, $scope, $rootScope, $state, $ionicActionSheet, $ionicLoading, CommonService, AccountService, Settings) {
			$rootScope.roleId = ""
			var authenticationData = CommonService.getAuthorizationData();
			if(authenticationData != null) {
				$rootScope.roleId = authenticationData.data.role;
			}
		}])
		//登录
		.controller('LoginCtrl', ['$rootScope', '$ionicHistory', '$scope', '$state', '$ionicLoading', 'CommonService', 'AccountService', 'NetworkService', 'JPushService','UtilService',function($rootScope,$ionicHistory, $scope, $state, $ionicLoading, CommonService, AccountService, NetworkService, JPushService,UtilService) {
			var authenticationData = CommonService.getAuthorizationData();
			if(authenticationData === null) {
				$rootScope.isLogin = false;
			} else {
				$rootScope.isLogin = true;
				$state.go('app.home',{'isSx':Math.random()*10});
				return;
			}

			$scope.user = {
                userId: '',
                password: '',
                roleId:"",
                uuId:''
            };
            
            $rootScope.role=window.localStorage.getItem("cnlRoleId"); //选择的通道
            $scope.login = function(user) { //登录
            	// user.userId='90000055';
            	// user.password='test111111';

                if (UtilService.isNull(user.userId)) {
                    CommonService.showToast('请输入用户名!', 2000);
                    return;
                } else if (UtilService.isNumber(user.userId)) {
                    CommonService.showToast('用户名只能输入数字!', 2000);
                    return;
                }
                if (UtilService.isNull(user.password)) {
                    CommonService.showToast('请输入密码!', 2000);
                    return;
                }
                //添加角色判断
                user.uuId=NetworkService.getUUID();

                $ionicLoading.show();
                AccountService.login(user, function(data) {
                    if (data != null && data.result == true) {
                        CommonService.setStorageItem('authorizationData', JSON.stringify(data));
                        $rootScope.token = data.data.token;
                        $rootScope.roleId=data.data.role;

                        $ionicLoading.hide();

                        $rootScope.userId=user.userId;
//                      if (!ionic.Platform.isIOS()) {
//                      	JPushService.setTagsWithAlias(data.data.role,user.uuid);
//                  	}

                        user.userId='';
                        user.password='';
                        console.log(data.data);
                        
                        if(data.data.activate==0 && data.data.role=='WAGT'){//代理人未激活状态
                        	$rootScope.agentUser=data.data.saleId;
                        	$state.go('agreement',{"parm":JSON.stringify(data.data)});
                        }else{
                        	//$state.go('app.home');
                        	$ionicHistory.clearCache().then(function(){ 
								$state.go('app.home',{'isSx':Math.random()*10}); 
							});
                        }
                    } else {
                        CommonService.removeStorageItem('authorizationData');
                        CommonService.showToast(data.message, 2000);
                    }
                },function(error){
                	$ionicLoading.hide();
                });
            };
            
            $scope.changePwd=function(){//忘记密码
            	$state.go('changePwd');
            };
            
            $scope.applyAgent=function(){//申请代理人
            	$state.go('agentInfo',{'par':null});
            };
            
            //通道也显示
            $scope.setChannel=function(roleId){
            	//跳转页面
            	$state.go('login');
            	$rootScope.role =roleId;
            	window.localStorage.setItem("cnlRoleId",roleId) ;
            };

            //代理人申请查看进度
            $scope.viewProgress=function(){
            	$state.go('applyPlan');
            };
        }])
		//通道页面
		.controller('ChannelCtrl',['$rootScope','$scope','$state',function($rootScope,$scope,$state){
			//通道也显示
			$scope.setChannel=function(roleId){
				//跳转页面
				$state.go('login');
				$rootScope.role =roleId;
				window.localStorage.setItem("cnlRoleId",roleId);
			}
		}])
		//客户代表对应的代理人管理
		.controller('WsaByAgentsCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$stateParams', '$window', '$ionicHistory','$state', 'AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $stateParams, $window, $ionicHistory,$state,  AccountService, CommonService) {
			$scope.wsaByAgents = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				saleId: 0
			};
			$scope.module=$stateParams.module;
			$scope.more = true;

			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				//$window.location = '#/app/account';
				if($scope.module==null || $scope.module=='home')
					$state.go('app.'+$scope.module,{'isSx':Math.random()*10});
				else
					$state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
			}
			$scope.goMonths=function(wagtId){
				$state.go('app.developInfo',{'wagtId':wagtId});
			}

			$scope.getWsaByAgents = function() {
				//$ionicLoading.show();
				AccountService.getWsaByAgents($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.wsaByAgents = [];
						}else if(parseInt($scope.wsaByAgents.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
                        	Array.prototype.push.apply($scope.wsaByAgents, data.data.list);
                    	}
					} else {
						$scope.more = false;
					}
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getWsaByAgents();
			//加载更多
			$scope.loadMore = function() {
				$scope.getWsaByAgents();
			    $timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
			}
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.wsaByAgents = [];
				$scope.getWsaByAgents();
				$scope.$broadcast('scroll.refreshComplete');
			}
		}])
        //代理人每月的情况统计
        .controller('AgentsByMonthsCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$stateParams', '$window', '$ionicHistory','$state','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $stateParams, $window, $ionicHistory,$state,AccountService, CommonService) {
			$scope.agentsByMonths = [];
			var wagtId = $stateParams.wagtId;
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				wagtId: wagtId
			};

			// $scope.goBack = function() { //返回
			//    $ionicHistory.clearHistory();
			//    $state.go('app.account'); 
			//    //$window.location = '#/app/account';
			// }

			$scope.more = true;
			$scope.getAgentsByMonths = function() {
				//$ionicLoading.show();
				AccountService.getAgentsByMonth($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1)  $scope.agentsByMonths = [];
						}else if(parseInt($scope.agentsByMonths.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}

						if(data.data.list.length>0){
                        	Array.prototype.push.apply($scope.agentsByMonths, data.data.list);
                    	}
					} else {
						$scope.more = false;
					}
					
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getAgentsByMonths();
			//加载更多
			$scope.loadMore = function() {
				$scope.getAgentsByMonths();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
				
			}
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.agentsByMonths = [];
				$scope.getAgentsByMonths();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
		}])
        //未激活的代理人列表
        .controller('NoActiveCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$stateParams', '$window', '$ionicHistory', 'AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $stateParams, $window, $ionicHistory, AccountService, CommonService) {
			$scope.noActives = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				saleId: 0
			};
			$scope.more = true;
			$scope.getNoActive = function() {
				//$ionicLoading.show();
				AccountService.getNoActive($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.noActives = [];
						}else if(parseInt($scope.noActives.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
                        	Array.prototype.push.apply($scope.noActives, data.data.list);
                    	}
					} else {
						$scope.more = false;
					}
					
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getNoActive();
			//加载更多
			$scope.loadMore = function() {
				$scope.getNoActive();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
				
			}
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.noActives = [];
				$scope.getNoActive();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
		}])
        //生成代理人激活二维码
        .controller('ActiveCodeCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$stateParams', '$window', '$ionicHistory', 'Settings', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $stateParams, $window, $ionicHistory, Settings, CommonService) {
            $scope.agentName=$stateParams.agentName; 
            //var serviceBase = Settings.apiServiceBaseUrl;
         	//$scope.imgCode=serviceBase+"api/Common/getActiveCode?activationCode="+$stateParams.activationCode;
         	
         	$scope.initData=function(){
         		var serviceBase = Settings.apiServiceBaseUrl;
         		try{
         			$scope.imgCode=serviceBase+"api/Common/getActiveCode?activationCode="+$stateParams.activationCode+'&r='+(Math.random()*10);
         		}catch(e){
         			CommonService.showToast('获取二维码异常,请下拉刷新重试!', 2000);
         		}
         	}
         	$scope.initData();

         	$scope.doRefresh=function(){
         		$scope.initData();
         		$timeout(function() {
         			$scope.$broadcast('scroll.refreshComplete');
         		}, 1000);
         	}
         	
         }])
		//我的面签记录
		.controller('SignListCtrl', ['$rootScope', '$scope','$state', '$ionicLoading', '$timeout', '$window', '$ionicHistory','$stateParams','$ionicScrollDelegate','AccountService', 'CommonService', function($rootScope, $scope,$state,$ionicLoading, $timeout, $window, $ionicHistory,$stateParams,$ionicScrollDelegate,AccountService, CommonService) {
			$scope.signList = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				status: 1
			};
			$scope.module=$stateParams.module;

			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				//$window.location = '#/app/account';
				//$state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
				if($scope.module==null || $scope.module=='home')
				  $state.go('app.'+$scope.module,{'isSx':Math.random()*10});
				else
				  $state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
			}

			$scope.audit = "active";
			$scope.more = true;
			$scope.getSingList = function() {
				//$ionicLoading.show();
				AccountService.getMySigns($scope.parameter, function(data) {
                       console.log(data);
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.signList = [];
						}else if(parseInt($scope.signList.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.signList, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getSingList();
			//加载更多
			$scope.loadMore = function() {
				$scope.getSingList();
			    $scope.$broadcast('scroll.infiniteScrollComplete');
			}
			// // 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.signList = [];
				$scope.getSingList();
				$scope.$broadcast('scroll.refreshComplete');
			}
			//修改资料
			$scope.upPerson=function(id,idPerson,name,phone,ident,factoryName){
				$rootScope.InterviewCacheName="InterviewInfo_"+id;
				var par={id:id,idPerson:idPerson,name:name,mobile:phone,ident:ident,factoryName:factoryName,isCancel:1};
			    $state.go('app.accountCustomerInfo', { 'par': JSON.stringify(par),'module':"account"});
			}
			//查询数据
			$scope.seachByStatus = function(type) {
				$scope.signList = [];
				$scope.audit = "";
				$scope.adopt = "";
				$scope.refuse = "";
				$scope.cancel = "";
				$scope.parameter.pageIndex = 1;
				if(type == "audit") {
					$scope.audit = "active";
					$scope.parameter.status = 1;
				}
				if(type == "adopt") {
					$scope.adopt = "active";
					$scope.parameter.status = 2;
				}
				if(type == "refuse") {
					$scope.refuse = "active";
					$scope.parameter.status = 3;
				}
				if(type == "cancel") {
					$scope.cancel = "active";
					$scope.parameter.status = 4;
				}
				$ionicScrollDelegate.scrollTop();
				$scope.getSingList();
			}
		$scope.callPhone=function(val){  //拨打电话
			window.location.href='tel:'+val;
		}			
		}])
		//我的推荐记录
		.controller('RecommendListCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$window', '$ionicHistory','$ionicScrollDelegate','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $window, $ionicHistory,$ionicScrollDelegate,AccountService, CommonService) {
			$scope.recommendList = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				status: 1,
				recommendType: 3
			};
			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				$window.location = '#/app/account';
			}

			$scope.audit = "active";
			$scope.more = true;
			$scope.getRecommendList = function() {
				//$ionicLoading.show();
				AccountService.getMyRecommend($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.recommendList = [];
						}else if(parseInt($scope.recommendList.length) >= data.data.total) {
							$scope.more = false;
						} else if(data.data.list.length <= 0) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.recommendList, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getRecommendList();
			//加载更多
			$scope.loadMore = function() {
				$scope.getRecommendList();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
				
			}
			// // 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.recommendList = [];
				$scope.getRecommendList();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
			$scope.seachByStatus = function(type) {
				$scope.recommendList = [];
				$scope.audit = "";
				$scope.adopt = "";
				$scope.refuse = "";
				$scope.cancel = "";
				$scope.parameter.pageIndex = 1;
				if(type == "audit") {
					$scope.audit = "active";
					$scope.parameter.status = 1;
				}
				if(type == "adopt") {
					$scope.adopt = "active";
					$scope.parameter.status = 2;
				}
				if(type == "refuse") {
					$scope.refuse = "active";
					$scope.parameter.status = 3;
				}
				if(type == "cancel") {
					$scope.cancel = "active";
					$scope.parameter.status = 4;
				}
				$ionicScrollDelegate.scrollTop();
				$scope.getRecommendList();
			}
		}])
		//代理人的推荐记录
		.controller('AgentRecommendListCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$window', '$ionicHistory','$ionicScrollDelegate','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $window, $ionicHistory,$ionicScrollDelegate,AccountService, CommonService) {
			$scope.recommendList = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				status: 0,
				recommendType: 1
			};
			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				$window.location = '#/app/account';
			}

			$scope.audit = "active";
			$scope.more = true;
			$scope.getRecommendList = function() {
				//$ionicLoading.show();
				AccountService.getAgentRecommend($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.recommendList = [];
						}else if(parseInt($scope.recommendList.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.recommendList, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getRecommendList();
			//加载更多
			$scope.loadMore = function() {
				$scope.getRecommendList();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
				
			}
			// // 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.recommendList = [];
				$scope.getRecommendList();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
			$scope.seachByStatus = function(type) {
				$scope.recommendList = [];
				$scope.audit = "";
				$scope.adopt = "";
				$scope.refuse = "";
				$scope.cancel = "";
				$scope.parameter.pageIndex = 1;
				if(type == "audit") {
					$scope.audit = "active";
					$scope.parameter.status = 0;
				}
				if(type == "adopt") {
					$scope.adopt = "active";
					$scope.parameter.status = 1;
				}
				$ionicScrollDelegate.scrollTop();
				$scope.getRecommendList();
			}
		}])
		//代理人的奖励明细
		.controller('AgentRewardCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$window', '$ionicHistory','$ionicScrollDelegate','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $window, $ionicHistory,$ionicScrollDelegate,AccountService, CommonService) {
			$scope.agentRewards = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				typeId: 1,
				wagtId: 0
			};
			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				$window.location = '#/app/account';
			}

			$scope.recommend = "active";
			$scope.more = true;
			$scope.getAgentReward = function() {
				//$ionicLoading.show();
				AccountService.getAgentReward($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.agentRewards = [];
						}else if(parseInt($scope.agentRewards.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.agentRewards, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getAgentReward();
			//加载更多
			$scope.loadMore = function() {
				$scope.getAgentReward();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
			}
			// // 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.agentRewards = [];
				$scope.getAgentReward();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
			$scope.seachByStatus = function(type) {
				$scope.agentRewards = [];
				$scope.recommend = "";
				$scope.referral = "";
				$scope.parameter.pageIndex = 1;
				if(type == "recommend") {
					$scope.recommend = "active";
					$scope.parameter.typeId = 1;
				}
				if(type == "referral") {
					$scope.referral = "active";
					$scope.parameter.typeId = 2;
				}
				$ionicScrollDelegate.scrollTop();
				$scope.getAgentReward();
			}
		}])
		//我的推荐码
		.controller('CodeListCtrl', ['$rootScope', '$scope', '$ionicLoading','$timeout','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading,$timeout,AccountService, CommonService) {
			$scope.codeList = [];
			var parm = {
				recommendType: 1
			}
			var authenticationData = CommonService.getAuthorizationData();
			if(authenticationData.data.role == "WAGT")
				parm.recommendType = 1;
			if(authenticationData.data.role == "WSA")
				parm.recommendType = 3;
			//刷新验证码
			$scope.onRefreshers = function() {
				$scope.codeList = [];
				$scope.getCodes();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			};
			$scope.getCodes = function() {
				//$ionicLoading.show();
				AccountService.getCodes(parm, function(data) {
					if(data != null && data.result == true) {
						$scope.codeList = data.data.list;
					}
					//$ionicLoading.hide();
				}, function(error) {
					//$ionicLoading.hide();
				});
			};
			//初始加载验证码
			$scope.getCodes();
		}])
		//添加反馈信息
		.controller('FeedBackCtrl', ['$rootScope', '$scope', '$ionicLoading','$state', 'AccountService', 'CommonService','UtilService',function($rootScope, $scope, $ionicLoading,$state, AccountService, CommonService,UtilService) {
			$scope.user = {
				feedback: '',
				saleId:0
			};

			$scope.goFeedbackList=function(){
				$state.go('app.feedbackList',{'isSx':Math.random()*10});
			}

			$scope.addFeedback = function(user) {
				if(UtilService.isNull(user.feedback)) {
					CommonService.showToast('反馈意见不能为空!', 2000);
					return;
				}
				if(UtilService.isLength(user.feedback,10,200)){
					CommonService.showToast('反馈意见必须大于10小于200个字符!', 2000);
					return;
				}

				$ionicLoading.show();
				AccountService.saveMyBack(user, function(data) { //userId: $scope.user.userId, 
					if(data != null && data.result == true) {
						user.feedback='';
						CommonService.showGoToast(data.message, 2000, 'app.account', {});
					} else {
						CommonService.showToast(data.message, 2000);
					}
				},function(error){
					$ionicLoading.hide();
				});
			}
		}])
		//反馈列表
		.controller('FeedBackListCtrl', ['$rootScope', '$scope', '$ionicLoading','$timeout','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading,$timeout,AccountService, CommonService) {
			$scope.backList = [];

			$scope.initData=function(){
				//$ionicLoading.show();
				AccountService.getBacks({'saleId':0}, function(data) {
					//console.log(data);
					if(data != null && data.result == true) {
						$scope.backList = data.data.list;

					}
					//$ionicLoading.hide();
				}, function(error) {
					//$ionicLoading.hide();
				});
			}
			$scope.initData();

			$scope.doRefresh=function(){
				$scope.backList = [];
				$scope.initData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
		}])
		.controller('SettingCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', 'CommonService', 'Settings', function($scope, $rootScope, $state, $ionicPopup, CommonService, Settings) {
			$scope.version = 'V' + Settings.version;

			//清除所有缓存
			$scope.clearAllCache = function() {
					var confirmPopup = $ionicPopup.confirm({
						title: '<strong>清除缓存</strong>',
						template: '清除缓存会把应用所有缓存数据清除,你确定要清除吗?',
						okText: '清除',
						cancelType: 'button-energized',
						cancelText: '取消'
					});
					confirmPopup.then(function(res) {
						if(res) {
							CommonService.clearStorage();
							$state.go('login');
						}
					});
				}
				//检测版本
			$scope.checkVersion = function() {
				$rootScope.checkUpdateVersion(true);
			}

			$scope.exitConfirm = function() { //退出APP

				var confirmPopup = $ionicPopup.confirm({
					title: '<strong>退出应用?</strong>',
					template: '你确定要退出应用吗?',
					okText: '退出',
					cancelText: '取消'
				});
				confirmPopup.then(function(res) {
					if(res) {
						CommonService.removeStorageItem('authorizationData');
						$state.go('login');
						//ionic.Platform.exitApp();
					}
				});
			};

		}])
		//销售经理管理工厂信息
		.controller('factoryListCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory', '$window','$ionicLoading','$timeout','$stateParams','AccountService', 'CommonService', function($rootScope, $scope, $state, $ionicHistory, $window, $ionicLoading,$timeout,$stateParams,AccountService, CommonService) {
			$scope.factoryList = [];

			$scope.module=$stateParams.module;

			$scope.initData=function(){
				//$ionicLoading.show();
				AccountService.getFactorys({"saleId": 0}, function(data) {
					if(data != null && data.result == true) {
						$scope.factoryList = data.data.list;
					}
					//$ionicLoading.hide();
				},function(error){
					//$ionicLoading.hide();
				});
			}
			$scope.initData();
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.factoryList = [];
				$scope.initData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			};
			//查看工厂对应的销售代表
			$scope.openfactroyBySales = function(factoryId) {
					$state.go('app.factorySales', {
						'factoryId': factoryId
					});
				}
				//返回上一级
			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				//$state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
				//$window.location = '#/app/account';
				if($scope.module==null || $scope.module=='home')
				  $state.go('app.'+$scope.module,{'isSx':Math.random()*10});
				else
				  $state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
			}
		}])
		//工厂对应的销售代表
		.controller('factroyBySalesCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$stateParams', '$window', '$ionicHistory','$ionicScrollDelegate','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $stateParams, $window, $ionicHistory,$ionicScrollDelegate,AccountService, CommonService) {
			$scope.factroyBySales = [];
			$scope.factroyByAgents=[];
			var factoryId = $stateParams.factoryId;
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				factoryId: factoryId
			};
			$scope.more = true;
			$scope.getfactroyBySales = function() {
				//$ionicLoading.show();
				AccountService.getSalesByFactroy($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.factroyBySales = [];
						}else if(parseInt($scope.factroyBySales.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.factroyBySales, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getfactroyBySales();

			$scope.getWagentByFactroy = function() {
				//$ionicLoading.show();
				AccountService.getWagentByFactroy($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.factroyByAgents = [];
						}else if(parseInt($scope.factroyByAgents.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.factroyByAgents, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			//加载更多
			$scope.loadMore = function() {
				if($scope.wsa == "active")
				    $scope.getfactroyBySales();
				if($scope.wagt == "active")
				    $scope.getWagentByFactroy();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
				
			}
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				if($scope.wsa == "active")
				{
					$scope.factroyBySales = [];
				    $scope.getfactroyBySales();
				}
				if($scope.wagt == "active")
				{
					$scope.factroyByAgents = [];
				    $scope.getWagentByFactroy();
				}
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
			//设置选中
			$scope.wsa = "active";
			$scope.seachByType = function(type) {
				$scope.wsa = "";
				$scope.wagt = "";
				$scope.parameter.pageIndex = 1;
				$ionicScrollDelegate.scrollTop();
				
				if(type == "wsa") {
					$scope.wsa = "active";
					$scope.factroyBySales = [];
					$scope.getfactroyBySales();
				}
				if(type == "wagt") {
					$scope.wagt = "active";
					$scope.factroyByAgents = [];
				    $scope.getWagentByFactroy();
				}
			}
		}])
		//客户经理对应的客户代表
		.controller('dsmBySalesCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$state', '$window', '$ionicHistory','$stateParams','AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $state, $window, $ionicHistory,$stateParams,AccountService, CommonService) {
			$scope.dsmBySales = [];
			$scope.module=$stateParams.module;

			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				dsmId: 1
			};
			//查看销售代表对应的代理人信息
			$scope.openAgentList = function(saleId) {
					$state.go('app.agentList', {
						'saleId': saleId
					});
				}
				//返回上一级
			$scope.goBack = function() { //返回
				$ionicHistory.clearHistory();
				//$state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
				if($scope.module==null || $scope.module=='home')
				  $state.go('app.'+$scope.module,{'isSx':Math.random()*10});
				else
				  $state.go('app.'+$scope.module,{'module':$scope.module,'isSx':Math.random()*10});
			}
			$scope.more = true;
			$scope.getSales = function() {
				//$ionicLoading.show();
				AccountService.getSales($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.dsmBySales = [];
						}else if(parseInt($scope.dsmBySales.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.dsmBySales, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getSales();
			//加载更多
			$scope.loadMore = function() {
				$scope.getSales();
				
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
			};
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.dsmBySales = [];
				$scope.getSales();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			};
		}])
	  //客户代表对应代理人
		.controller('agentListCtrl', ['$rootScope', '$scope', '$ionicLoading', '$timeout', '$stateParams', '$window', '$ionicHistory', 'AccountService', 'CommonService', function($rootScope, $scope, $ionicLoading, $timeout, $stateParams, $window, $ionicHistory, AccountService, CommonService) {
			$scope.agentList = [];
			var saleId = $stateParams.saleId;
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				saleId: saleId
			};
			$scope.more = true;
			$scope.getAgents = function() {
				//$ionicLoading.show();
				AccountService.getAgents($scope.parameter, function(data) {
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.agentList = [];
						}else if(parseInt($scope.agentList.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}

						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.agentList, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			}
			$scope.getAgents();
			//加载更多
			$scope.loadMore = function() {
				$scope.getAgents();
				$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
			}
			// 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.agentList = [];
				$scope.getAgents();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}
		}])
		//找回密码
		.controller('UpdatePasswordCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$location', '$interval', 'CommonService', 'AccountService','UtilService',function($rootScope, $scope, $state, $stateParams, $ionicLoading, $location, $interval, CommonService, AccountService,UtilService) {

			$scope.user = {
				userId: '',
				mobile: '',
				verifyCode: '',
				password: ''
			};

			$scope.updatePassword = function(user) { //重置密码

				if(UtilService.isNull(user.mobile)) {
					CommonService.showToast('请输入手机号码!', 2000);
					return
				}else if(UtilService.isMobile(user.mobile)){
					CommonService.showToast('手机号码格式不正确!', 2000);
					return
				}

				if(UtilService.isNull(user.verifyCode)) {
					CommonService.showToast('验证码不能为空!', 2000);
					return
				}else if(UtilService.isNumber(user.verifyCode)){
					CommonService.showToast('验证码只能输入数字!', 2000);
					return
				}

				if(UtilService.isNull(user.password)) {
					CommonService.showToast('密码不能为空!', 2000);
					return
				}else if(UtilService.isLength(user.password,6,20)) {
					CommonService.showToast('密码长度必须大于6位小于20位!', 2000);
					return
				}
				
				$ionicLoading.show();
				AccountService.resetPwd({'verifyCode': user.verifyCode,'NewPasswrod': user.password,'saleId': 0,'phone':user.mobile}, function(data) {
					if(data != null && data.result == true) {
						var authData = window.localStorage.getItem('authorizationData');
						if(authData !== null) {
							CommonService.removeStorageItem('authorizationData');
						}
						user.mobile='';
						user.verifyCode='';
						user.password='';

						CommonService.showGoToast(data.message, 2000,"login",null);
						//$location.path('/login');
					} else {
						CommonService.showToast(data.message, 2000);
					}
				},function(error){
					$ionicLoading.hide();
				});
			};
			$scope.verifyContent = "获取验证码";
			$scope.paraevent = true;

			$scope.getVerifyCode = function(user) { ///获取验证码

				if($scope.paraevent === false) {
					return;
				}
				if(UtilService.isNull(user.mobile)) {
					CommonService.showToast('请输入手机号码!', 2000);

				} else if(UtilService.isMobile(user.mobile)) {
					CommonService.showToast('手机格式号码错误,请重新输入!', 2000);
					return;
				} else {
					$ionicLoading.show();
					var second = 60,timePromise = undefined;
					AccountService.getVerifyCode({
						userId: 0,
						mobile: user.mobile
					}, function(data) {
						$ionicLoading.hide();
						if(data != null && data.result ==true) {
							timePromise = $interval(function() {
								if(second <= 0) {
									$interval.cancel(timePromise);
									timePromise = undefined;

									second = 60;
									$scope.verifyContent = "重发验证码";
									$scope.paraevent = true;
								} else {
									$scope.verifyContent = second + "秒后可重发";
									$scope.paraevent = false;
									second--;

								}
							}, 1000, 100);

							CommonService.showToast(data.message, 2000);
						} else {
							CommonService.showToast(data.message, 2000);
						}
					},function(error){
						$ionicLoading.hide();
					});
				}
			};
		}])
		//忘记密码
		.controller('ForgetPasswordCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$location', '$interval', 'CommonService', 'AccountService','UtilService',function($rootScope, $scope, $state, $stateParams, $ionicLoading, $location, $interval, CommonService, AccountService,UtilService) {

			$scope.user = {
				userId: '',
				phone: '',
				code: '',
				password: ''
			};

			$scope.forgetPassword = function(user) { //重置密码

				if(UtilService.isNull(user.userId)) {
					CommonService.showToast('请输入工号!', 2000);
					return
				}else if(UtilService.isNumber(user.userId)){
					CommonService.showToast('工号只能输入数字!', 2000);
					return
				}

				if(UtilService.isNull(user.phone)) {
					CommonService.showToast('请输入手机号码!', 2000);
					return
				}else if(UtilService.isMobile(user.phone)){
					CommonService.showToast('手机号码格式不正确!', 2000);
					return
				}

				if(UtilService.isNull(user.code)) {
					CommonService.showToast('验证码不能为空!', 2000);
					return
				}else if(UtilService.isNumber(user.code)){
					CommonService.showToast('验证码只能输入数字!', 2000);
					return
				}

				if(UtilService.isNull(user.password)) {
					CommonService.showToast('密码不能为空!', 2000);
					return
				}else if(UtilService.isLength(user.password,6,20)) {
					CommonService.showToast('密码长度必须大于6位小于20位!', 2000);
					return
				}
				
				$ionicLoading.show();
				AccountService.forgetPassword(user, function(data) {
					if(data != null && data.result == true) {
						var authData = window.localStorage.getItem('authorizationData');
						if(authData !== null) {
							CommonService.removeStorageItem('authorizationData');
						}
						user.userId='';
						user.phone='';
						user.code='';
						user.password='';

						CommonService.showGoToast(data.message, 2000,"login",null);
					} else {
						CommonService.showToast(data.message, 2000);
					}
				},function(error){
					$ionicLoading.hide();
				});
			};
			$scope.codeContent = "获取验证码";
			$scope.paraevent = true;

			$scope.getVerifyCode = function(user) { ///获取验证码

				if($scope.paraevent === false) {
					return;
				}
				if(UtilService.isNull(user.userId)) {
					CommonService.showToast('请输入工号!', 2000);
					return;
				}
				if(UtilService.isNull(user.phone)) {
					CommonService.showToast('请输入手机号码!', 2000);
					return;
				} else if(UtilService.isMobile(user.phone)) {
					CommonService.showToast('手机格式号码错误,请重新输入!', 2000);
					return;
				} else {
					$ionicLoading.show();
					var second = 60,timePromise = undefined;

					AccountService.getVerifyCode({
						userId: user.userId,
						mobile: user.phone
					}, function(data) {
						$ionicLoading.hide();
						if(data != null && data.result ==true) {
							timePromise = $interval(function() {
								if(second <= 0) {
									$interval.cancel(timePromise);
									timePromise = undefined;

									second = 60;
									$scope.codeContent = "重发验证码";
									$scope.paraevent = true;
								} else {
									$scope.codeContent = second + "秒后可重发";
									$scope.paraevent = false;
									second--;
								}
							}, 1000, 100);

							CommonService.showToast(data.message, 2000);
						} else {
							CommonService.showToast(data.message, 2000);
						}
					},function(error){
						$ionicLoading.hide();
					});
				}
			};
		}]);
});