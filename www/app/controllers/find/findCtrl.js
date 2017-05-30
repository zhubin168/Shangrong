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
    app.controller('helperCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
             $scope.goHotDetails =function(){
             	$state.go("app.helpHotDetails");
             }          
    }]);
    //发资讯
    app.controller('sendNewsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
             $scope.goNewsDetails =function(){
             	$state.go("app.helperNewsDetails");
             }
    }]);
    //发图片
    app.controller('sendImageCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {

    }]);
    //发鸡汤
    app.controller('sendJiTangCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
             $scope.goNewsDetails =function(){
             	$state.go("app.jiTangDetails");
             }
    }]);
    //发小知识
    app.controller('sendKnowledgeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
             $scope.goKnowledegDetails =function(){
             	$state.go("app.knowledgeDetails");
             }
    }]);
});
