define(['app'], function(app) {
    app.controller('myCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService','$ionicPopup',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService,$ionicPopup) {

         var code =UtilService.getUrlParam("code");
         var state =UtilService.getUrlParam("state");
         $scope.oAuthPar={'code':code,'state':state};

         $scope.initOAuth=function(){
            MyService.GetOAuth($scope.oAuthPar,function(data){
                if(data != null && data.state ==1) {
                  CommonService.setStorageItem('authorizationData',JSON.stringify(data.data));
                   //alert(CommonService.getStorageItem('authorizationData'));
                 } else {
                   CommonService.showToast(data.message, 2000);
                 }
             },function(error){

             });
         };
         $scope.initOAuth();
			

           // 确认拨打电话
		   $scope.showMyPlanner = function() {
		     var alertPlanner = $ionicPopup.alert({
		       title: '我的理财师',
		       templateUrl: 'myPlanner.html',
		       cssClass: 'myPlannerPopup',
		       scope: $scope,
		       okText:"电话咨询",
		       okType:"linearRight"
		     });
		     alertPlanner.then(function(res) {
		       if(res) {
		         console.log('You are sure');
		       } else {
		         console.log('You are not sure');
		       }
		     });
		   };
    }]);
    app.controller('orderRecordCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
            
    }]);
    //销售记录
    app.controller('saleRecordCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
            
    }]);
    //销售收益明细
    app.controller('incomeDetailsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
            
    }]);
     //  绑定银行卡
    app.controller('bindCardCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
            
    }]);
});
