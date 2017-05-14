/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
    app.controller('HomeCtrl', ['$rootScope','$scope','$state','$ionicHistory','$ionicLoading','$timeout','CommonService','HomeService','UtilService',function($rootScope, $scope,$state,$ionicHistory,$ionicLoading,$timeout,CommonService,HomeService,UtilService) {
    	// $css.add('./css/home/index.css');
        //$rootScope.hideTabs = '';

    	// $scope.roleId=$rootScope.roleId;
     //    if(UtilService.isNull($scope.roleId)){
     //        CommonService.removeStorageItem('authorizationData');
     //        $ionicHistory.clearCache().then(function(){ 
     //            $state.go('login'); 
     //        });
     //        return;
     //    }

     //    var authenticationData = CommonService.getAuthorizationData();
     //    if(!UtilService.isNull(authenticationData))
     //    {
     //    	$scope.roleId = authenticationData.data.role;
     //    }
    	// $scope.initData=function(){

     //        switch($scope.roleId){
     //            case "WAGT":
     //            {
     //                //$ionicLoading.show();
     //                HomeService.getAgentBills({'saleId':0},function(data){
     //                    if (data != null && data.result == true) {
     //                        $scope.agentBillModel= data.data;
     //                        //$ionicLoading.hide();
     //                    }else{
     //                        CommonService.showToast(data.message, 2000);
     //                    }
     //                },function(error){
     //                    //$ionicLoading.hide();
     //                });
     //                break;
     //            }
     //            case "WSA":
     //            {
     //                //$ionicLoading.show();
     //                HomeService.getBills({'saleId':0},function(data){
     //                    if (data != null && data.result == true) {
     //                        $scope.billModel= data.data;
     //                        //$ionicLoading.hide();
     //                    }else{
     //                        CommonService.showToast(data.message, 2000);
     //                    }
     //                },function(error){
     //                    //$ionicLoading.hide();
     //                });
     //                break;
     //            }
     //            case "WDSM":
     //            {
     //                //$ionicLoading.show();
     //                HomeService.getDsmBills({'saleId':0},function(data){
     //                    if (data != null && data.result == true) {
     //                        $scope.dsmBillModel= data.data;
     //                        //$ionicLoading.hide();
     //                    }else{
     //                        CommonService.showToast(data.message, 2000);
     //                    }
     //                },function(error){
     //                    //$ionicLoading.hide();
     //                });
     //                break;
     //            }
     //        }
    	// }
    	// $scope.initData();
    	// // // 下拉刷新
    	// $scope.doRefresh = function() {
    	//     $scope.initData();
     //        $timeout(function() {
     //                $scope.$broadcast('scroll.refreshComplete');
     //        }, 1000);
    	// };

     //    $scope.openUrl=function(url,module){//打开面签管理
     //        if(module==null){
     //            $state.go(url,{'isSx':Math.random()*10});
     //        }else{
     //            $state.go(url,{'module':module,'isSx':Math.random()*10});
     //        }
     //    }
    }]);
    //生成二维码
  app.controller('createQRCtrl', ['$rootScope','$scope','$state','$ionicLoading','CommonService','HomeService','AccountService','UtilService','$ionicActionSheet','Settings','$interval',function($rootScope, $scope,$state,$ionicLoading,CommonService,HomeService,AccountService,UtilService,$ionicActionSheet,Settings,$interval) {
		var authenticationData = CommonService.getAuthorizationData();  //获取userId
		if(authenticationData != null) {
			$rootScope.userId = authenticationData.data.saleId;
    	}  		  
    	$scope.imgUrl='';
        $scope.qrModel={  //生成二维码参数
        	'userName':'',
        	'mobile':'',
        	'factoryName':'',
        	'filePath':'',
        	'wsaId':$rootScope.userId,
        	'internalCode':'',
        	'smsCode':''
        }    	
		$scope.selInterCode=[
			{value:"",text:"请选择"},
			{value:"1",text:"1"},
			{value:"2",text:"2"},
			{value:"3",text:"3"},
			{value:"12",text:"12"}
		];        
  	    $scope.GetSalesFactorys = function(){ //获取工厂列表
  	    HomeService.GetSalesFactorys({'wsaId':$rootScope.userId},function(data){
  	    	var dataLength =data.data.length;
	    	  $scope.factoryList = [];
  	    	if(data.result == true && dataLength>0){
	    	    for(i=0;i<dataLength;i++){
	    	       $scope.factoryList.push({'factoryName':data.data[i]});
	    	    }
	    	    console.log($scope.factoryList);
	    	    $scope.qrModel.factoryName=$scope.factoryList[0].factoryName; //设置默认展示第一个工厂
  	    	}else{
  	    		CommonService.showToast("获取用户所绑定的工厂失败！", 3000);
  	    	}
  	    },function(error){
//	    	CommonService.showToast(error, 3000);
  	    	console.log(error);
  	    })
  	    };
  	    $scope.GetSalesFactorys();

			$scope.codeContent = "获取验证码";
			$scope.paraevent = true;

			$scope.getVerifyCode = function() { ///获取验证码

				if($scope.paraevent === false) {
					return;
				}
				if(UtilService.isNull($scope.qrModel.mobile)) {
					CommonService.showToast('请输入手机号码!', 2000);
					return;
				} else if(UtilService.isMobile($scope.qrModel.mobile)) {
					CommonService.showToast('手机格式号码错误,请重新输入!', 2000);
					return;
				} else {
					$ionicLoading.show();
					var second = 60,timePromise = undefined;
                    var parm ={
						"mobile": $scope.qrModel.mobile,
						"userId": $rootScope.userId,
						"type":2
					};
					AccountService.getVerifyCode(parm, function(data) {
						console.log(parm);
						console.log(data);
						$ionicLoading.hide();
						if(data != null && data.result ==true) {
							timePromise = $interval(function() {
								if(second <= 0) {
									$interval.cancel(timePromise);
									timePromise = undefined;

									second = 60;
									$scope.codeContent = "重发验证码";
									$scope.paraevent = true;
								} else {
									$scope.codeContent = second + "秒后可重发";
									$scope.paraevent = false;
									second--;
								}
							}, 1000, 100);

							CommonService.showToast(data.message, 2000);
						} else {
							CommonService.showToast(data.message, 2000);
						}
					},function(error){
						$ionicLoading.hide();
					});
				}
			};

		$scope.createQR = function(){  //生成二维码
			
				if(UtilService.isNull($scope.qrModel.userName)) {
					CommonService.showToast('用户名不能为空!', 2000);
					return
				}else if(UtilService.isName($scope.qrModel.userName)){
					CommonService.showToast('用户名格式不正确!', 2000);
					return
				}
				
				if(UtilService.isNull($scope.qrModel.mobile)) {
					CommonService.showToast('手机号不能为空!', 2000);
					return
				}else if(UtilService.isMobile($scope.qrModel.mobile)){
					CommonService.showToast('手机号格式不正确!', 2000);
					return
				}

				if(UtilService.isNull($scope.qrModel.smsCode)) {
					CommonService.showToast('验证码不能为空或只能为数字!', 2000);
					return
				}else if(UtilService.isNumber($scope.qrModel.smsCode)){
					CommonService.showToast('验证码只能输入数字!', 2000);
					return
				}

				 if(UtilService.isNull($scope.qrModel.factoryName)){
					CommonService.showToast("请选择工厂！", 3000);
					return;				
				}else if(UtilService.isNull($scope.qrModel.internalCode)){
					CommonService.showToast("请选择内部代码！", 3000);
					return;				
				}else if(UtilService.isNull($scope.qrModel.filePath)){
					CommonService.showToast("请上传用户合照！", 3000);
					return;				
				}
//			alert(JSON.stringify($scope.qrModel));
			HomeService.MakeQrCode($scope.qrModel,function(data){
//				alert(JSON.stringify(data));
				if(data.result==true && data.data !==null){
				var par ={"codeId":data.data,"userName":$scope.qrModel.userName,"mobile":$scope.qrModel.mobile};
			      $state.go("app.QRdetails",{ 'par': JSON.stringify(par)});
				}else{
	    		CommonService.showToast(data.message, 3000);
				}
			},function(error){
				CommonService.showToast(error, 3000);
			})
//           $state.go("app.QRdetails");
		};
       $scope.showActionSheet = function(type,width,height) {  //上传图片
                $scope.returnedText = '';
                var msg="";


                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        { text: '选择图片' },
                        { text: '拍照' }
                    ],
                    cancelText: '取消',
                    cancel: function() {
                        return true;
                    },
                    buttonClicked: function(index) {
                        var params = {};
                        var hideActionSheet=true;   
                        if (index == 0) { //选择图片
                            CommonService.getPicture(width,height).then(function(imageURI) {
                                if (imageURI != undefined) {
                                    HomeService.uploadPhoto(imageURI, params, function(result) {
                                        var data = JSON.parse(result.response);

                                        if (data.result ==true) {
                                            CommonService.showToast(data.message, 2000);
                                            $scope.imgUrl =Settings.deBug==true? data.photoUrl:data.data.photoUrl;
                                            $scope.FSImgUrl =Settings.deBug==true? data.photoUrl:data.data.fsPathUrl;
                                            var saveImgUrl=Settings.deBug==true?data.photo:data.data.fsPath;
                                                var image = document.getElementById(type);

                                                if(Settings.deBug==true)
                                                    image.src=Settings.devUploadImgUrl+data.photoUrl;
                                                else
                                                    image.src =$scope.imgUrl;
                                                    $scope.qrModel.filePath = saveImgUrl;

                                        } else {
                                            hideActionSheet=false;
                                            CommonService.showToast(data.message, 3000);
                                        }
                                    });
                                }
                            }).catch(function(err) {
                                hideActionSheet=false;
                                CommonService.showToast('选择图片出错了!' + err, 2000);
                            });
                        } else {

                            CommonService.getCamera(width,height).then(function(imageURI) {
                                if (imageURI != undefined) {
                                    HomeService.uploadPhoto(imageURI, params, function(result) {
                                        var data = JSON.parse(result.response);

                                        if (data.result ==true) {
                                            CommonService.showToast(data.message, 2000);
                                            $scope.imgUrl =Settings.deBug==true? data.photoUrl:data.data.photoUrl;
                                            $scope.FSImgUrl =Settings.deBug==true? data.photoUrl:data.data.fsPathUrl;
                                            var saveImgUrl=Settings.deBug==true?data.photo:data.data.fsPath;
                                                var image = document.getElementById(type);

                                                if(Settings.deBug==true)
                                                    image.src=Settings.devUploadImgUrl+data.photoUrl;
                                                else
                                                    image.src =$scope.imgUrl;
                                                    $scope.qrModel.filePath = saveImgUrl;

                                        } else {
                                            hideActionSheet=false;
                                            CommonService.showToast(data.message, 3000);
                                        }
                                    });
                                }
                            }).catch(function(err) {
                                hideActionSheet=false;
                                CommonService.showToast('拍照获取图片出错了!' + err, 2000);
                            });
                        }
                        
                        return hideActionSheet;
                    }
                });
        }
       
  	}]);
  	//二维码详情
  app.controller('QRdetailsCtrl', ['$rootScope','$scope','$state','$stateParams','$ionicLoading','CommonService','HomeService','UtilService','Settings','$http','md5','$timeout',function($rootScope, $scope,$state,$stateParams,$ionicLoading,CommonService,HomeService,UtilService,Settings,$http,md5,$timeout) {
	    $scope.qrInfoModel = JSON.parse($stateParams.par);
         	$scope.initData=function(){
         		var serviceBase = Settings.apiServiceBaseUrl;
				var parm = {};
				parm.codeId = $scope.qrInfoModel.codeId;
//				parm.ticket = encode(parm);       		
                HomeService.CreateQrcode(parm,function(data){
                	if(data.result==true && data.data != null){
                	    $scope.imgCode =data.data;
                	}else{
                		CommonService.showToast('生成二维码失败，请稍后重试!', 2000);
                	}
                },function(error){
                	CommonService.showToast('生成二维码异常，请稍后重试!', 2000);
                })
         	}
         	$scope.initData();

         	$scope.doRefresh=function(){
         		$scope.initData();
         		$timeout(function() {
         			$scope.$broadcast('scroll.refreshComplete');
         		}, 1000);
         	}  	    
  	}]);
  	//邀请进度
  app.controller('inviteProCtrl', ['$rootScope','$scope','$state','$ionicLoading','CommonService','HomeService','UtilService','$timeout','$ionicScrollDelegate',function($rootScope, $scope,$state,$ionicLoading,CommonService,HomeService,UtilService,$timeout,$ionicScrollDelegate) {
			var authenticationData = CommonService.getAuthorizationData();
			if(authenticationData != null) {
				$rootScope.userId = authenticationData.data.saleId;
			}  	
			$scope.invitesList = [];
			$scope.parameter = {
				pageIndex: 1,
				pageSize: 8,
				status: 1,
				saleId:$rootScope.userId
			};  	
			$scope.audit = "active";
			$scope.more = true;		
			$scope.getInvitesList = function() {  //获取列表
				//$ionicLoading.show();
				HomeService.GetMyInvite($scope.parameter, function(data) {
					console.log($scope.parameter);
                    console.log(data);
					if(data != null && data.data.list != null) {
						if(data.data.total <= $scope.parameter.pageSize){
							$scope.more = false;
							if($scope.parameter.pageIndex==1) $scope.invitesList = [];
						}else if(parseInt($scope.invitesList.length) >= data.data.total) {
							$scope.more = false;
						} else {
							$scope.more = true;
							$scope.parameter.pageIndex++;
						}
						if(data.data.list.length>0){
							Array.prototype.push.apply($scope.invitesList, data.data.list);
						}
					} else {
						$scope.more = false;
					}
					//$ionicLoading.hide();
				}, function(error) {
					$scope.more = false;
					//$ionicLoading.hide();
				});
			};		
			$scope.getInvitesList();
			//加载更多
			$scope.loadMore = function() {
				$scope.getInvitesList();
				$timeout(function() {
			    	$scope.$broadcast('scroll.infiniteScrollComplete');
				}, 1000);
			};
			// // 下拉刷新
			$scope.doRefresh = function() {
				$scope.parameter.pageIndex = 1;
				$scope.invitesList = [];
				$scope.getInvitesList();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			};			
			//查询数据
			$scope.seachByStatus = function(type) {
				$scope.invitesList = [];
				$scope.audit = "";
				$scope.adopt = "";
				$scope.refuse = "";
				$scope.cancel = "";
				$scope.toSumbit = "";
				$scope.parameter.pageIndex = 1;
				if(type == "toSumbit") {
					$scope.toSumbit = "active";
					$scope.parameter.status = 0;
				}
				if(type == "audit") {
					$scope.audit = "active";
					$scope.parameter.status = 1;
				}
				if(type == "adopt") {
					$scope.adopt = "active";
					$scope.parameter.status = 2;
				}
				if(type == "refuse") {
					$scope.refuse = "active";
					$scope.parameter.status = 3;
				}
				if(type == "cancel") {
					$scope.cancel = "active";
					$scope.parameter.status = 4;
				}
				$ionicScrollDelegate.scrollTop();
				$scope.getInvitesList();
			};  	
  	}]);
});
