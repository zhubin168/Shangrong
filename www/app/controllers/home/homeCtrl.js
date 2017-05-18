/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('HomeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
         $scope.getProductList =function(){
         	$state.go("app.productList");
         }
    }]);
});
