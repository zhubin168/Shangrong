/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('findCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService) {
		//获取热门理财师充电站
		FindService.GetHotCourse({}, function(data) {
			console.log(data.data);
			if (data.state == 1) {
				$scope.hotChargelist = data.data;
			} else {
				CommonService.showToast(data.message, 2000);
			}
		}, function(error) {
			CommonService.showToast(error, 2000);
		});    	
    	$scope.goChargeStation=function(){ 
    		$state.go("app.chargeStation");
    	}
		//跳转资讯详情
		$scope.goChargeDetails = function(item) {
			$state.go("app.chargeDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.clearStorage("chargeDetails");
			CommonService.setStorageItem("chargeDetails", JSON.stringify(item));
		}    	
    	$scope.goHelper=function(){
    		$state.go("app.helper");
    	}   
    	
    }]);
    //理财师充电站
    app.controller('chargeStationCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService) {

		//获取资讯
		$scope.parameter = {
			pageIndex: 1,
			pageSize: 8,
		};
		$scope.chargeList = [];
		$scope.more = true;
		$scope.GetCourses = function() {
			FindService.GetCourses($scope.parameter, function(data) {
				if (data.data != null && data.state == 1) {
					if (data.data.total <= $scope.parameter.pageSize) {
						$scope.more = false;
						if ($scope.parameter.pageIndex == 1) $scope.chargeList = [];
					} else if (parseInt($scope.chargeList.length) >= data.data.total) {
						$scope.more = false;
					} else if (data.data.list.length <= 0) {
						$scope.more = false;
					} else {
						$scope.more = true;
						$scope.parameter.pageIndex++;
					}
					if (data.data.list.length > 0) {
						Array.prototype.push.apply($scope.chargeList, data.data.list);
					}
				} else {
					$scope.more = false;
				}
				console.log($scope.chargeList);
			}, function(error) {
				CommonService.showToast(error, 2000);
			})
		}
		$scope.GetCourses();
		//加载更多
		$scope.loadMore = function() {
			$scope.GetCourses();
			$timeout(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
		// 下拉刷新
		$scope.doRefresh = function() {
			$scope.parameter.pageIndex = 1;
			$scope.chargeList = [];
			$scope.GetCourses();
			$timeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};
		//跳转资讯详情
		$scope.goChargeDetails = function(item) {
			$state.go("app.chargeDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.clearStorage("chargeDetails");			
			CommonService.setStorageItem("chargeDetails", JSON.stringify(item));
		}
    }]);
    //理财师充电站详情
    app.controller('chargeDetailsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','UtilService','FindService','CommonService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,UtilService,FindService,CommonService) {
		$scope.chargeDetails = JSON.parse(CommonService.getStorageItem("chargeDetails"));
		console.log($scope.chargeDetails);
		var content = document.getElementById("content");
		angular.element(content).html($scope.chargeDetails.content);           
    }]);
    //获客助手
    app.controller('helperCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService','$ionicPopup','$ionicModal',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService,$ionicPopup,$ionicModal) {
		// 确认设置个人信息
		$scope.confirmSetInfo = function() {
			var confirmSetInfo = $ionicPopup.confirm({
				title: '设置个人信息',
				templateUrl: 'setInfo.html',
				cssClass: 'srPopup',
				scope: $scope,
				cancelText: "稍后设置",
				cancelType: "bg-grey sub-ft",
				okText: "立即设置",
				okType: "linearRight"
			});
			confirmSetInfo.then(function(res) {
				if (res) {
					$scope.modal.show();
				}
			});
		};   
		//获取用户信息
		    $scope.userInfo={};
//		    $scope.userInfo.uid=JSON.parse(CommonService.getStorageItem('authorizationData')).uId;
		    $scope.userInfo.uId=6;
			FindService.GetUserInfo({"uId":$scope.userInfo.uId}, function(data) {
				console.log(data);
				if (data.data != null && data.state == 1) {
                      $scope.userInfo=data.data;
//                    $scope.userInfo.uId=JSON.parse(CommonService.getStorageItem('authorizationData')).uId;
                      $scope.userInfo.uId=6;
				} else {
					CommonService.showToast(data.message, 2000);
				}
			}, function(error) {
				CommonService.showToast(error, 2000);
			})		
		//保存用户信息
		$scope.SaveUserInfo= function(){
			
			if(UtilService.isNull($scope.userInfo.userName)){
				CommonService.showToast("请输入姓名",2000);
				return;
			}else if(UtilService.isMobile($scope.userInfo.phone)){
				CommonService.showToast("手机号的格式不正确",2000);
				return;
			}else if(!UtilService.isNull($scope.userInfo.rank) && $scope.userInfo.rank.length>10){
				CommonService.showToast("职级不超过10字..",2000);
				return;
			}else if(!UtilService.isNull($scope.userInfo.remark) && $scope.userInfo.remark.length>30){
				CommonService.showToast("签名不超过30字..",2000);
				return;
			}
			
			FindService.SaveUserInfo($scope.userInfo, function(data) {
				console.log(data);
				if (data.state == 1) {
					  CommonService.showGoToast(data.message, 2000);
					  $timeout(function(){
					  	$scope.closeModal();
					  },2000)
				} else {
					CommonService.showToast(data.message, 2000);
				}
			}, function(error) {
				CommonService.showToast(error, 2000);
			})					
		}
		//设置个人信息模态框
		$ionicModal.fromTemplateUrl('modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });	
		//关闭模态框
		  $scope.closeModal = function() {
		    $scope.modal.hide();
		  };
		  //当我们用到模型时，清除它！
		  $scope.$on('$destroy', function() {
		    $scope.modal.remove();
		  });
		$scope.confirmSetInfo();

        //发文章
        $scope.sendNews = function(type){
        	$state.go("app.sendNews",{"type":type});
        }

             $scope.goHotDetails =function(){
             	$state.go("app.helpHotDetails");
             }          
    }]);
    //发资讯
    app.controller('sendNewsCtrl', ['$rootScope','$scope','$state','$stateParams','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService',function($rootScope, $scope,$state,$stateParams,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService) {
            //获取资讯列表
		$scope.parameter = {
			pageIndex: 1,
			pageSize: 8,
			type:$stateParams.type
		};
		$scope.newsList = [];
		$scope.more = true;
		$scope.GetArticles = function() {
			FindService.GetArticles($scope.parameter, function(data) {
				console.log($scope.parameter);
				console.log(data);
				if (data.list != null && data.total > 0) {
					if (data.total <= $scope.parameter.pageSize) {
						$scope.more = false;
						if ($scope.parameter.pageIndex == 1) $scope.newsList = [];
					} else if (parseInt($scope.newsList.length) >= data.total) {
						$scope.more = false;
					} else if (data.list.length <= 0) {
						$scope.more = false;
					} else {
						$scope.more = true;
						$scope.parameter.pageIndex++;
					}
					if (data.list.length > 0) {
						Array.prototype.push.apply($scope.newsList, data.list);
					}
				} else {
					$scope.more = false;
				}
               console.log($scope.newsList);
			}, function(error) {
				CommonService.showToast(error, 2000);
			})
		}
		$scope.GetArticles();      
		//加载更多
		$scope.loadMore = function() {
			$scope.GetArticles();
			$timeout(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
		// 下拉刷新
		$scope.doRefresh = function() {
			$scope.parameter.pageIndex = 1;
			$scope.newsList = [];
			$scope.GetArticles();
			$timeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};
		//跳转资讯详情
		$scope.goNewsDetails = function(item) {
			$state.go("app.helperNewsDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.clearStorage("articlesDetails");			
			CommonService.setStorageItem("articlesDetails", JSON.stringify(item));
		}

    }]);
    //文章详情
    app.controller('helperNewsDlsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','UtilService','FindService','CommonService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,UtilService,FindService,CommonService) {
		$scope.chargeDetails = JSON.parse(CommonService.getStorageItem("articlesDetails"));
		console.log($scope.chargeDetails);
		var content = document.getElementById("content");
		angular.element(content).html($scope.chargeDetails.content);           
    }]);    
    //发图片
    app.controller('sendImageCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService) {

    }]);
//  //发鸡汤
//  app.controller('sendJiTangCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService) {
//           $scope.goNewsDetails =function(){
//           	$state.go("app.jiTangDetails");
//           }
//  }]);
//  //发小知识
//  app.controller('sendKnowledgeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','FindService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,FindService,UtilService) {
//           $scope.goKnowledegDetails =function(){
//           	$state.go("app.knowledgeDetails");
//           }
//  }]);
});
