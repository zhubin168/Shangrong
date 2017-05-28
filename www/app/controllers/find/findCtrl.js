/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('findCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
    	$scope.goChargeStation=function(){ 
    		$state.go("app.chargeStation");
    	}
    	$scope.goChargeDetails=function(){
    		$state.go("app.chargeDetails");
    	}    	
    	$scope.goHelper=function(){
    		$state.go("app.helper");
    	}    	
    }]);
    //理财师充电站
    app.controller('chargeStationCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
    	$scope.goChargeDetails=function(){
    		$state.go("app.chargeDetails");
    	}
    }]);
    //理财师充电站详情
    app.controller('chargeDetailsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {

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
