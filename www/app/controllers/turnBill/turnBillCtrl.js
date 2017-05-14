/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('TurnBillCtrl', ['$rootScope','$scope', '$ionicPopup','$stateParams','$ionicLoading','$timeout','TurnBillService', 'CommonService','UtilService',function($rootScope, $scope, $ionicPopup,$stateParams,$ionicLoading,$timeout,TurnBillService, CommonService,UtilService) {
			$scope.isSx=$stateParams.isSx;

			$scope.parameter = {
			    name:'',
			    pageIndex: 1,
			    pageSize: 8,
			    saleId:0
			};
			$scope.singlesList = [];
			$scope.more=true;

			//获取待转单列表
		 	$scope.getSingles=function() {
				// if($scope.isSx!=''){
				// 	$scope.singlesList=[];
				// }
			    //$ionicLoading.show();
			    TurnBillService.getSingles($scope.parameter, function(data) {
	
			        if (data != null && data.result== true) {
			            if (data.data.total <= $scope.parameter.pageSize){
			                $scope.more = false;
			                if($scope.parameter.pageIndex==1) $scope.singlesList=[];
			            }else if (parseInt($scope.singlesList.length) >= data.data.total) {
			                $scope.more = false;
			            }else if(data.data.list.length<=0){
			            	$scope.more = false;
			            }else {
			                $scope.more = true;
			                $scope.parameter.pageIndex++;
			            }

			            if(data.data.list.length>0){
                        	Array.prototype.push.apply($scope.singlesList, data.data.list);
                    	}
			        } else {
			            $scope.more = false;
			        }
			        //$ionicLoading.hide();
			    },function(error){
			    	//$ionicLoading.hide();
		    		$scope.more = false;
		    	});
			}
			$scope.getSingles();
			//加载更多
			$scope.loadMore = function() {
			    $scope.getSingles();
			    $timeout(function() {
			       $scope.$broadcast('scroll.infiniteScrollComplete');
			    }, 1000);
			}
			//下拉刷新
			$scope.doRefresh = function() {
			    $scope.parameter.pageIndex = 1;
			    $scope.singlesList = [];
			    $scope.getSingles();
			    $timeout(function() {
			       $scope.$broadcast('scroll.refreshComplete');
			    }, 1000);
			}
			$scope.salesList=[];
			$scope.salesModel={idPerson:0,saleId:'',remark:''};

			//获取销售代表列表
			$scope.getSalesList=function(factoryId){
				$ionicLoading.show();
				TurnBillService.getSales({'factoryId':factoryId}, function(data) {
				    if (data != null && data.data.length>0) {
				        $scope.salesList = data.data;
				    }
				    $ionicLoading.hide();
				},function(error){
					$ionicLoading.hide();
		    		$scope.more = false;
		    	});
			}

			$scope.showPopup = function(idPerson,factoryId) {		
				$scope.getSalesList(factoryId);
				$scope.salesModel.idPerson=idPerson;

				var singlePopup=$ionicPopup.show({
					title:"我要转单",
					templateUrl: "ModelContent.html",
					cssClass: 'animated5 fadeInUp',
					scope: $scope,
					buttons: [
						{ 
							text: "取消", 
							type: "radius-button"
						},
						{
							text: "<b>确定</b>",
							type: "radius-button",
							onTap: function(e) {

								if (UtilService.isNull($scope.salesModel.saleId)) {
								   CommonService.showToast('请选择转单人!', 2000);
								   e.preventDefault();
								 } else if(UtilService.isNull($scope.salesModel.remark)){
								 	CommonService.showToast('请输入备注信息!', 2000);
								 	e.preventDefault();
								 }else if(UtilService.isLength($scope.salesModel.remark,1,200)){
								 	CommonService.showToast('备注信息最多输入200个字!', 2000);
								 	e.preventDefault();
								 }else{
								     return true;
								 }
							}
						}
					]
				});
				singlePopup.then(function(res) {
					if(res){
						$scope.singleModel={
							customeId:$scope.salesModel.idPerson,
							ordersId:$scope.salesModel.saleId,
							remark:$scope.salesModel.remark,
							singleId:0,
							sigType:0
						};

						$ionicLoading.show();
						TurnBillService.saveSingle($scope.singleModel, function(data) {
							//console.log(data);
						    if (data != null && data.result==true) {
						        CommonService.showToast(data.message, 2000);
						        $scope.doRefresh();
						    }else{
						    	CommonService.showToast(data.message, 2000);
						    }
						    $ionicLoading.hide();
						},function(error){
		    				CommonService.showToast(error, 2000);
		    			});
					}
				});
			};
			$scope.callPhone=function(val){   //拨打电话
				window.location.href='tel:'+val;
			}
			// if($scope.isSx==1){
			// 	$scope.doRefresh();
			// }
    }])
	.controller('HisTurnBillCtrl', ['$rootScope','$scope', '$ionicPopup','$stateParams','$ionicLoading','$timeout','TurnBillService', 'CommonService', function($rootScope, $scope, $ionicPopup,$stateParams,$ionicLoading,$timeout,TurnBillService, CommonService) {
		$scope.parameter = {
		    pageIndex: 1,
		    pageSize: 8,
		    saleId:0,
		    sigType:0
		};
		$scope.historySingleList = [];
		$scope.more=true;

		//获取待转单列表
		$scope.getHistorySingles=function() {
		    //$ionicLoading.show();
		    TurnBillService.getHistorySingle($scope.parameter, function(data) {
		    	//console.log(data);
		        if (data != null && data.data.list != null) {
		            if (data.data.total <= $scope.parameter.pageSize){
		                $scope.more = false;
		                //$scope.historySingleList=[];
		            }else if (parseInt($scope.historySingleList.length) >= data.data.total) {
		                $scope.more = false;
		            }else if(data.data.list.length<=0){
			            	$scope.more = false;
			        }else {
		                $scope.more = true;
		                $scope.parameter.pageIndex++;
		            }
		            if(data.data.list.length>0){
                        Array.prototype.push.apply($scope.historySingleList, data.data.list);
                    }
		            //$scope.historySingleList = data.data.list;
		            // angular.forEach(data.data.list,function(value,key){
		            // 	$scope.historySingleList.push(data.data.list[key]);
		            // });
		        } else {
		            $scope.more = false;
		        }
		        //$ionicLoading.hide();
		    },function(error){
		    	$scope.more = false;
		    });
		}
		$scope.getHistorySingles();
		//加载更多
		$scope.loadMore = function() {
		    $scope.getHistorySingles();
		    $timeout(function() {
			    $scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		}
		//下拉刷新
		$scope.doRefresh = function() {
		    $scope.parameter.pageIndex = 1;
		    $scope.historySingleList = [];
		    $scope.getHistorySingles();
		    $timeout(function() {
		       $scope.$broadcast('scroll.refreshComplete');
		    }, 1000);
		}
	}]);
});
