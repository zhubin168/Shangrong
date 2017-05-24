/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('HomeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
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
});
