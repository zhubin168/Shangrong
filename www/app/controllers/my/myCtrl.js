define(['app'], function(app) {
    app.controller('myCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService','$ionicPopup',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService,$ionicPopup) {

			var info=CommonService.getStorageItem('authorizationData');
			$scope.userInfo=JSON.parse(info);
			$scope.headImg=$scope.userInfo.headImg;
			$rootScope.userName=$scope.userInfo.name;

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
