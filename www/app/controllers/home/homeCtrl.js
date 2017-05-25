/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('HomeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService','$ionicPopup',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService,$ionicPopup) {
         $scope.getProductList =function(){
         	$state.go("app.productList");
         }
         $scope.getProductDels =function(){
         	$state.go("app.productDetails");
         }
         $scope.getNewsList =function(){
         	$state.go("app.newsList");
         }
         $scope.goNewsDetails =function(){
         	$state.go("app.newsDetails");
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
