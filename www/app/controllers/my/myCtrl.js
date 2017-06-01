define(['app'], function(app) {
    app.controller('myCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService','$ionicPopup',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService,$ionicPopup) {

			var info=CommonService.getStorageItem('authorizationData');
			$scope.userInfo=JSON.parse(info);
			$scope.headImg=$scope.userInfo.headImg;
			$scope.roleId=$scope.userInfo.roleId;
			$rootScope.userName=$scope.userInfo.name;

            //获取个人信息
				MyService.GetPersonCenter({'uid':$scope.userInfo.uId}, function(data) { //{"uid":2}
					if(data==null){
						CommonService.showToast('暂无个人信息', 2000);
					}else{
						$scope.personInfo =data;
					}
				}, function(error) {
					CommonService.showToast('获取个人信息异常', 2000);
				});    	            	

            $scope.getplannerInfo =function(){
				MyService.GetMineParent({'uid':$scope.userInfo.uId}, function(data) { //{"uid":2}
					console.log(data);
					if(data==null){
					   CommonService.showToast("暂无上级理财师", 2000); 
					}else{
						$scope.myPlannerItem =data;
						$scope.showMyPlanner();
					}
				}, function(error) {
					CommonService.showToast('获取我的理财师异常', 2000);
				});    	            	
            }

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
		         window.location.href = 'tel:'+$scope.myPlannerItem.telePhone;
		       }
		     });
		   };
    }]);
//  理财师认证（客户）
    app.controller('plannerCertifCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService) {
			var info=CommonService.getStorageItem('authorizationData');
			$scope.userInfo=JSON.parse(info);
    	   $scope.param ={
    	   	'name':'',
    	   	'phone':'',
    	   	'uid':$scope.userInfo.uId
//          'uid':2
    	   }
            $scope.save=function(){
            	
			if(UtilService.isNull($scope.param.name)){
				CommonService.showToast("请输入姓名",2000);
				return;
			}else if(UtilService.isNull($scope.param.phone)){
				CommonService.showToast("请输入手机号",2000);
				return;
			}else if(UtilService.isMobile($scope.param.phone)){
				CommonService.showToast("手机号的格式不正确",2000);
				return;
			}       	
            	
 				MyService.ApplyManager($scope.param, function(data) { 
					console.log(data);
					if(data.state==1){
					   CommonService.showToast("申请提交成功！", 2000); 
					   $timeout(function(){
					   	   $state.go("app.my");
					   },2000)
					}else{
                       CommonService.showToast(data.message, 2000); 
					}
				}, function(error) {
					CommonService.showToast(error, 2000);
				});    	            	
            }
    }]);
    app.controller('orderRecordCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService) {
            
    }]);
    //销售记录
    app.controller('saleRecordCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService) {
            
    }]);
    //销售收益明细
    app.controller('incomeDetailsCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService) {
            
    }]);
     //  绑定银行卡
    app.controller('bindCardCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService) {
            
    }]);
     //  关于我们
    app.controller('myAboutCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','MyService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,MyService,UtilService) {
            
    }]);
});
