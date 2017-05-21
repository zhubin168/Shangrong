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
});
