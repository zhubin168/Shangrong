/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('HomeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService','$ionicPopup','$ionicSlideBoxDelegate',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService,$ionicPopup,$ionicSlideBoxDelegate) {
    	//获取banners
    	HomeService.GetBanners({"visiableUid": "0"},function(data){
    		console.log(data.data.list);
    		if(data.state==1){
    			$scope.bannerItem =data.data.list;
    			$ionicSlideBoxDelegate.update();
    		}else{
    			CommonService.showToast(data.message, 2000);
    		}
    	},function(error){
           	  CommonService.showToast(error, 2000);
           })
        //获取热门产品
    	HomeService.GetBanners({"visiableUid": "0"},function(data){
    		console.log(data.data.list);
    		if(data.state==1){
    			$scope.bannerItem =data.data.list;
    			$ionicSlideBoxDelegate.update();
    		}else{
    			CommonService.showToast(data.message, 2000);
    		}
    	},function(error){
           	  CommonService.showToast(error, 2000);
           })

    	//获取资讯
    	HomeService.GetInformations({"pageIndex": 1,"pageSize": 3},function(data){
    		if(data.state==1){
    			console.info("获取资讯");
    			$scope.newsItem =data.data.list;
    			console.log($scope.newsItem);
    		}else{
    			CommonService.showToast(data.message, 2000);
    		}
    	},function(error){
           	  CommonService.showToast(error, 2000);
           })
	
         //跳转banner的详情
         $scope.getBannerDetails =function(index){
         	console.log(index);
         	$state.go("app.bannerDetails",{"index":index});
         }
         
         $scope.getProductList =function(){
         	$state.go("app.productList");
         }
         $scope.getProductDels =function(){
         	$state.go("app.productDetails");
         }
         $scope.getNewsList =function(){
         	$state.go("app.newsList");
         }
         //跳转资讯详情
         $scope.goNewsDetails =function(item){
         	$state.go("app.newsDetails",{"isSx":Math.random()*10});
         	CommonService.setStorageItem("newsDetails",JSON.stringify(item));
         }
         $scope.goFinancial =function(){
         	$state.go("app.fncList");
         }
         $scope.goFinancialDetails =function(){
         	$state.go("app.fncDetails");
         }        
         $scope.aboutSR =function(){
         	$state.go("app.about");
         }

           // 确认拨打电话
		   $scope.showCall = function() {
		     var confirmCall = $ionicPopup.confirm({
		       title: '提示',
		       templateUrl: 'call.html',
		       cssClass: 'srPopup',
		       scope: $scope,
		       cancelText:"取消",
		       cancelType:"bg-grey sub-ft",
		       okText:"确定",
		       okType:"linearRight"
		     });
		     confirmCall.then(function(res) {
		       if(res) {
		         console.log('You are sure');
		       } else {
		         console.log('You are not sure');
		       }
		     });
		   };         
    }]);
    
//  banner详情页
    app.controller('bannerDetailsCtrl', ['$rootScope','$scope','$state','$stateParams','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$stateParams,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
    	//获取banners详情
    	HomeService.GetBanners({"visiableUid": "0"},function(data){
    		if(data.state==1){
    			$scope.bannerItem =data.data.list[$stateParams.index];
    			console.log($scope.bannerItem);
    		}else{
    			CommonService.showToast(data.message, 2000);
    		}
    	},function(error){
           	  CommonService.showToast(error, 2000);
           })    	
    }]);
//  资讯列表
    app.controller('newsListCtrl', ['$rootScope','$scope','$state','$stateParams','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$stateParams,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
	    	//获取资讯
		$scope.parameter = {
		    pageIndex: 1,
		    pageSize: 8,
		};
		$scope.newsList = [];
		$scope.more=true;	    	
	    $scope.getNewsList = function(){
	    	HomeService.GetInformations($scope.parameter,function(data){
		        if (data.data != null && data.state== 1) {
		            if (data.data.total <= $scope.parameter.pageSize){
		                $scope.more = false;
		                if($scope.parameter.pageIndex==1) $scope.newsList=[];
		            }else if (parseInt($scope.newsList.length) >= data.data.total) {
		                $scope.more = false;
		            }else if(data.data.list.length<=0){
		            	$scope.more = false;
		            }
		            else {
		                $scope.more = true;
		                $scope.parameter.pageIndex++;
		            }
					if(data.data.list.length>0){
                        Array.prototype.push.apply($scope.newsList, data.data.list);
                    }
		        } else {
		            $scope.more = false;
		        }
		        console.log($scope.newsList);
	    	},function(error){
	           	  CommonService.showToast(error, 2000);
	           })    	    	
	    }
	    $scope.getNewsList();
		//加载更多
		$scope.loadMore = function() {
		    $scope.getNewsList();
		    $timeout(function() {
			       $scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
	    // 下拉刷新
		$scope.doRefresh = function() {
		    $scope.parameter.pageIndex = 1;
		    $scope.newsList = [];
		    $scope.getNewsList();
		    $timeout(function() {
		       $scope.$broadcast('scroll.refreshComplete');
		    }, 1000);
		};
         //跳转资讯详情
         $scope.goNewsDetails =function(item){
         	$state.go("app.newsDetails",{"isSx":Math.random()*10});
         	CommonService.setStorageItem("newsDetails",JSON.stringify(item));
         }		
	           
    }]);
//  首页资讯详情页
    app.controller('newsDetailsCtrl', ['$rootScope','$scope','$state','$stateParams','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$stateParams,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
 	         $scope.newsDetails = JSON.parse(CommonService.getStorageItem("newsDetails"));
 	         console.info("资讯详情页：");
 	         console.log($scope.newsDetails);
 	         var content =document.getElementById("content");
 	         angular.element(content).html($scope.newsDetails.content);
    }]);
    
//  理财知识列表
    app.controller('fncListCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
         $scope.goFncList =function(){
         	$state.go("app.fncDetails");
         }     
    }]);
//  理财知识详情
    app.controller('fncDetailsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {

    }]);
//  产品列表
    app.controller('productListCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
         $scope.getProductDels =function(){
         	$state.go("app.productDetails");
         }
    }]);
//  产品详情
    app.controller('productDetailsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService','$ionicPopup',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService,$ionicPopup) {
           // 确认拨打电话
		   $scope.showCall = function() {
		     var confirmCall = $ionicPopup.confirm({
		       title: '提示',
		       templateUrl: 'call.html',
		       cssClass: 'srPopup',
		       scope: $scope,
		       cancelText:"取消",
		       cancelType:"bg-grey sub-ft",
		       okText:"确定",
		       okType:"linearRight"
		     });
		     confirmCall.then(function(res) {
		       if(res) {
		         console.log('You are sure');
		       } else {
		         console.log('You are not sure');
		       }
		     });
		   };
           // 预约购买
		   $scope.showBuy = function() {
		     var confirmBuy = $ionicPopup.confirm({
		       title: '预约信息',
		       templateUrl: 'buy.html',
		       cssClass: 'srPopup',
		       scope: $scope,
		       cancelText:"取消",
		       cancelType:"bg-grey sub-ft",
		       okText:"确定",
		       okType:"linearRight"
		     });
		     confirmBuy.then(function(res) {
		       if(res) {
		         console.log('You are sure');
		       } else {
		         console.log('You are not sure');
		       }
		     });
		   };
    }]);
});
