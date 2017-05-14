/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
	app.controller('InterviewCtrl', ['$rootScope', '$scope', '$ionicFilterBar', '$ionicLoading','$stateParams','$state','$timeout','$ionicHistory','InterviewService', 'CommonService', function($rootScope, $scope, $ionicFilterBar, $ionicLoading, $stateParams,$state,$timeout,$ionicHistory,InterviewService, CommonService) {
		$scope.isSx=$stateParams.isSx;

		var filterBarInstance;
		$scope.parameter = {
		    name:'',
		    pageIndex: 1,
		    pageSize: 8,
		    phone:'',
		    saleId:0
		};
		$scope.interviewList = [];
		$scope.more=true;

		$scope.getToSigns=function() {
		    //$ionicLoading.show();
		    InterviewService.getToSigns($scope.parameter, function(data) {
		    	console.log(data);
		        if (data != null && data.result== true) {
		            if (data.data.total <= $scope.parameter.pageSize){
		                $scope.more = false;
		                if($scope.parameter.pageIndex==1) $scope.interviewList=[];
		            }else if (parseInt($scope.interviewList.length) >= data.data.total) {
		                $scope.more = false;
		            }else if(data.data.list.length<=0){
		            	$scope.more = false;
		            }
		            else {
		                $scope.more = true;
		                $scope.parameter.pageIndex++;
		            }
					if(data.data.list.length>0){
                        Array.prototype.push.apply($scope.interviewList, data.data.list);
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
		$scope.getToSigns();
		//加载更多
		$scope.loadMore = function() {
		    $scope.getToSigns();
		    $timeout(function() {
			       $scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		}
		// 下拉刷新
		$scope.doRefresh = function() {
		    $scope.parameter.pageIndex = 1;
		    $scope.interviewList = [];
		    $scope.getToSigns();
		    $timeout(function() {
		       $scope.$broadcast('scroll.refreshComplete');
		    }, 1000);
		}

		$scope.search = function () {
			filterBarInstance = $ionicFilterBar.show({
			  update: function (filteredItems, filterText) {
			    if (filterText!=undefined && filterText!='') {
			      	$scope.parameter.pageIndex=1;
			      	$scope.parameter.name=filterText;
			      	$scope.interviewList=[];
			      	$scope.getToSigns();
			    }
			  },
			  cancel:function(filteredItems, filterText){
			  	$scope.parameter.pageIndex=1;
			  	$scope.parameter.name=filterText;
			  	$scope.interviewList=[];
			  	$scope.getToSigns();
			  }
			});
		}
		$scope.isCheckCache=function(id){
			var cacheName='InterviewInfo_'+id;
			if(CommonService.getStorageItem(cacheName)!=null && CommonService.getStorageItem(cacheName)!=undefined){
			   return true;
			}else{
				return false;
			}
		}
		$scope.callPhone=function(val){  //拨打电话
			window.location.href='tel:'+val;
		}        		
		$scope.openUrl=function(id,idPerson,name,mobile,ident,factoryName,isCancel){
		    $rootScope.InterviewCacheName="InterviewInfo_"+id;
			var par={id:id,idPerson:idPerson,name:name,mobile:mobile,ident:ident,factoryName:factoryName,isCancel:isCancel};

			$state.go('app.customerInfo', { 'par': JSON.stringify(par)});
		}
	}])
	//客户信息控制器
	.controller('customerInfoCtrl', ['$rootScope','$state', '$scope', '$stateParams', '$ionicLoading','$filter','$cordovaInAppBrowser','InterviewService', 'CommonService','UtilService','Settings','$ionicHistory',function($rootScope,$state,$scope, $stateParams, $ionicLoading,$filter,$cordovaInAppBrowser,InterviewService, CommonService,UtilService,Settings,$ionicHistory) {
		 
		$scope.cusInfoModel = JSON.parse($stateParams.par);
		if($scope.cusInfoModel.mobile !=undefined)
            $rootScope.applyMoblie=$scope.cusInfoModel.mobile;
		$scope.zmVal=false;
		
		//芝麻信用授权
		$scope.checkZM=function(val){
			var url=Settings.zmAuthUrl;
			if(val==true){
				url+='?idenNo='+$scope.cusInfoModel.ident+'&name='+$scope.cusInfoModel.name;
				$scope.zmVal=true;
				var options = {
				    location: 'yes',
				    clearcache: 'yes',
				    toolbar: 'no'
				};
				$cordovaInAppBrowser.open(url, '_system', options).then(function(event) {

				}).catch(function(event) {

				});
			}else{
				$scope.zmVal=false;
			}
		}
		//获取用户面签信息
		$scope.getSignInfo=function(id,idPerson){
			var cacheName='InterviewInfo_'+id;
			$ionicLoading.show();
			InterviewService.getSignInfo({'idPerson':idPerson}, function(data) {
				console.log(data);
				$ionicLoading.hide();
			    if (data != null && data.result==true) {
			    	$scope.customerModel=data.data;
			    	$scope.zmVal=true;
			    	if(CommonService.getStorageItem(cacheName)!=null && CommonService.getStorageItem(cacheName)!=undefined){
			    		CommonService.removeStorageItem(cacheName);
			    	}
			    	CommonService.setStorageItem(cacheName,JSON.stringify(data.data));
			    }
			},function(error){
    			CommonService.showToast(error, 2000);
    			$ionicLoading.hide();
			});
		}
		if($scope.cusInfoModel.isCancel==1 && CommonService.getStorageItem($rootScope.InterviewCacheName)==null){
			$scope.getSignInfo($scope.cusInfoModel.id,$scope.cusInfoModel.idPerson);

		}else if(CommonService.getStorageItem($rootScope.InterviewCacheName)!=null){
			$scope.customerModel=[];
			//console.log('customerInfoCtrl');
			$scope.customerModel=JSON.parse(CommonService.getStorageItem($rootScope.InterviewCacheName));
		}
		else
		{
			$scope.customerModel={
				        source:'app',
						bankName:'',
						bankNo:'',
						currentAddress:{
			   				address:'',
			   				city:'',
			   				province:'',
			   				region:''
						},
						department:'',
						education:'',
						entryTime:'',
						groupPhoto:'',
						groupPhotoFS:'',
						holeWorkCard:'',
						holeWorkCardFS:'',
						socialCard:'',
						socialCardFS:'',
						workCardBack:'',
						workCardBackFS:'',
						homeContact:{
							name:'',
							phone:'',
							relationship:''
						},
						urgentContact:{
							name:'',
							phone:'',
							relationship:''
						},
						idPerson:$scope.cusInfoModel.idPerson,
						identBack:'',
						identBackFS:'',
						identFront:'',
						identFrontFS:'',
						interCode:'',
						latitude:'',
						longitude:'',
						otherContact:{
							name:'',
							phone:'',
							relationship:''
						 },
						 prove:'',
						 qq:'',
						 saleId:0,
						 weLiveAddres:{
							 address:'',
							 city:'',
							 province:'',
							 region:''
						 },
						 wkIncome:'',
						 remark:''
					};
		}

		$scope.bankList=[];
		$scope.eduList=[];

		//获取学历列表
		$scope.getEduList=function(){
			if(CommonService.getStorageItem('eduList')!=null && CommonService.getStorageItem('eduList')!=undefined)
			{
				var data=JSON.parse(CommonService.getStorageItem('eduList'));
				$scope.eduList=data;
			}
			else
			{
				$ionicLoading.show();
				InterviewService.getDictionary({'regType':'11'}, function(data) {
					//console.log(data);
				    if (data != null && data.result == true) {
				    	CommonService.setStorageItem('eduList',JSON.stringify(data.data.list));
				        $scope.eduList = data.data.list;
				    }
				    $ionicLoading.hide();
				},function(error){
					$ionicLoading.hide();
				});
			}
		}
		$scope.getEduList();

		//格式化银行卡号
		$scope.initBankNo=function(){

			var bankNo=$scope.customerModel.bankNo.replace(/\s+/g,"");
			// alert(event.keyCode+'$scope.customerModel.bankNo='+bankNo);
			if(event.keyCode==8)//|| $scope.customerModel.bankNo==''
			    return;
			if(bankNo.length%4==0)
			 	$scope.customerModel.bankNo+=' ';
		}
		$scope.selectDatePicker = function() {
		    CommonService.getDatePicker('date').then(function(date) {
		    	if(UtilService.isNull(date)) return;
		    	
		        $scope.customerModel.entryTime = $filter('date')(new Date(date), 'yyyy-MM-dd');
		        return true;
		    }).catch(function(err) {
		        CommonService.showToast('选择日期出错!' + err, 2000);
		    });
		}

		$scope.getBanks=function(){
			if(CommonService.getStorageItem('Banks')!=null && CommonService.getStorageItem('Banks')!=undefined)
			{
				var data=JSON.parse(CommonService.getStorageItem('Banks'));
				$scope.bankList=data;
			}
			else
			{
				//$ionicLoading.show();
				InterviewService.getBanks(null, function(data) {
					//console.log(data);
				    if (data != null && data.data.list != null) {
				    	CommonService.setStorageItem('Banks',JSON.stringify(data.data.list));
				        $scope.bankList = data.data.list;
				    }
				    //$ionicLoading.hide();
				});
			}
		}
		$scope.getBanks();

        $scope.module=$stateParams.module;
 
		$scope.next=function(customerModel){

			if(UtilService.isNull(customerModel.department)){
				CommonService.showToast('请输入所在部门!', 2000);
				return;
			}else if(UtilService.isName(customerModel.department)){
				CommonService.showToast('所在部门只能汉字与字母组成!', 2000);
				return;
			}

			if(UtilService.isNull(customerModel.entryTime)){
				CommonService.showToast('请输入入职时间!', 2000);
				return;
			}
			if(UtilService.isNull(customerModel.education)){
				CommonService.showToast('请选择教育程度!', 2000);
				return;
			}
			if(UtilService.isNull(customerModel.bankName)){
				CommonService.showToast('请选择开户行!', 2000);
				return;
			}
			customerModel.bankNo=customerModel.bankNo.replace(/\s+/g,"");

			if(UtilService.isNull(customerModel.bankNo)){
				CommonService.showToast('请输入银行卡号!', 2000);
				return;
			}else if(UtilService.isNumber(customerModel.bankNo)){
				CommonService.showToast('银行卡号只能输入数字!', 2000);
				return;
			}else if(UtilService.isBankNo(customerModel.bankNo)){
				CommonService.showToast('银行卡号只能输入16-19位数字!', 2000);
				return;
			}

			if(UtilService.isNull(customerModel.wkIncome)){
				CommonService.showToast('请输入个人月收入!', 2000);
				return;
			}
			else if (UtilService.isInteger(customerModel.wkIncome)) {
                CommonService.showToast('个人月收入只能输入数字!', 2000);
                return;
            }
            if(UtilService.isNull(customerModel.qq)) {
			    CommonService.showToast('请输入qq号!', 2000);
			    return;
			}else if(UtilService.isNumber(customerModel.qq)) {
			    CommonService.showToast('qq号只能输入数字!', 2000);
			    return;
			}

			if($scope.zmVal==false){
				CommonService.showToast('请选中芝麻信用授权!', 2000);
			    return;
			}
			//console.log(customerModel);
			//alert('addressCtrl='+JSON.stringify(customerModel));

			if(CommonService.getStorageItem($rootScope.InterviewCacheName)!=null){
				CommonService.removeStorageItem($rootScope.InterviewCacheName);
			}
			CommonService.setStorageItem($rootScope.InterviewCacheName,JSON.stringify(customerModel));
            if($scope.module !="" && $scope.module =="account")
            {
            	$state.go('app.accountAddress',{'module':"account"});
            }
            else{
            	$state.go('app.address',{'module':""});
            }
		}
	}])
	//地址和联系方式
	.controller('addressCtrl', ['$rootScope', '$scope', '$state','$ionicLoading','$cordovaGeolocation','$stateParams','InterviewService','CommonService','Settings','UtilService',function($rootScope, $scope,$state,$ionicLoading,$cordovaGeolocation,$stateParams, InterviewService,CommonService,Settings,UtilService) {

		//alert('addressCtrl $rootScope.InterviewCacheName='+$rootScope.InterviewCacheName);

		if(CommonService.getStorageItem($rootScope.InterviewCacheName)==null || CommonService.getStorageItem($rootScope.InterviewCacheName)==undefined){
			$state.go('app.interview');
			return;
		}
      
		$scope.$on('PCTSELECT_SUCCESS', function(event,data) {
			if(data != null && data.result != null)
			{
				
			}
			console.log(JSON.stringify(data));
		});
		$scope.customerModel=[];

		$scope.customerModel=JSON.parse(CommonService.getStorageItem($rootScope.InterviewCacheName));
		$scope.selectedAddress={"province":"","city":"","region":""};
		if($scope.customerModel != null){
			$scope.selectedAddress.province=$scope.customerModel.currentAddress.province;
			$scope.selectedAddress.city=$scope.customerModel.currentAddress.city;
			$scope.selectedAddress.region=$scope.customerModel.currentAddress.region;
		}
 		//console.log($scope.customerModel);
        $scope.$on('Pselect_Address', function(event,data) {
			if(data != null && data.result != null)
			{
				$scope.customerModel.currentAddress.province=data.result.province;
				$scope.customerModel.currentAddress.city=data.result.city;
				$scope.customerModel.currentAddress.region=data.result.region;
			}
		});
        $scope.uRelationship=[];
        $scope.hRelationship=[];
        $scope.oRelationship=[];
        //加载紧急联系人类型
		$scope.getURelationship= function(uRelationshipList){
			if(uRelationshipList.length>0)
				{
					for(var i=0;i<uRelationshipList.length; i++)
					{
						$scope.uRelationship.push(uRelationshipList[i]);
					}
				}
		};
		
		$scope.getHRelationship=function(){
			if(CommonService.getStorageItem('hRelationship')!=null && CommonService.getStorageItem('hRelationship')!=undefined)
			{
				var data=JSON.parse(CommonService.getStorageItem('hRelationship'));
				$scope.hRelationship=data;
				$scope.getURelationship($scope.hRelationship);
			}
			else
			{
				//$ionicLoading.show();
				InterviewService.getDictionary({'regType':'265'}, function(data) {
					console.log(data);
				    if (data != null && data.result == true) {
				    	CommonService.setStorageItem('hRelationship',JSON.stringify(data.data.list));
				        $scope.hRelationship = data.data.list;
				        $scope.getURelationship($scope.hRelationship);
				    }		
				    //$ionicLoading.hide();
				});
			}
		}
		$scope.getHRelationship();

		$scope.selInterCode=[
			{value:"",text:"请选择"},
			{value:"1",text:"1"},
			{value:"2",text:"2"},
			{value:"3",text:"3"},
			{value:"12",text:"12"}
		];

		$scope.getORelationship=function(){
			if(CommonService.getStorageItem('oRelationship')!=null && CommonService.getStorageItem('oRelationship')!=undefined)
			{
				var data=JSON.parse(CommonService.getStorageItem('oRelationship'));
				$scope.oRelationship=data;
				$scope.getURelationship($scope.oRelationship);
			}
			else
			{
				//$ionicLoading.show();
				InterviewService.getDictionary({'regType':'396'}, function(data) {
				    if (data != null && data.result == true) {
				    	CommonService.setStorageItem('oRelationship',JSON.stringify(data.data.list));
				        $scope.oRelationship = data.data.list;
				        $scope.getURelationship($scope.oRelationship);
				    }
				    //$ionicLoading.hide();
				});
			}
		}
		$scope.getORelationship();
		
		$scope.provinceList=[];
		$scope.provinceModel={
			text:''
		}

		$scope.cityList=[];
		$scope.cityModel={
			text:''
		}

		$scope.regionList=[];
		$scope.regionModel={
			text:''
		}

		$scope.getAllAreas=function(type,provinceValue,cityValue){
				if(CommonService.getStorageItem('AllAreas')!=null && CommonService.getStorageItem('AllAreas')!=undefined)
				{
					var data=JSON.parse(CommonService.getStorageItem('AllAreas'));
					//console.log(provinceValue);
					resultData=CommonService.getAllAreas(data,type,provinceValue,cityValue);
					switch(type)
					{
						case "province":{
							$scope.provinceList=resultData;
							break;
						}
						case "city":{
							$scope.cityList=resultData;
							break;
						}
						case "region":{
							$scope.regionList=resultData;
							break;
						}
					}
				}
				else
				{
					$ionicLoading.show();
					InterviewService.getAllAreas(null,function(data){
					    if (data != null && data.result == true) {
					    	CommonService.setStorageItem('AllAreas',JSON.stringify(data.data));
					    	//console.log(data.data);

					    	if(type=='province'){
								$scope.provinceList=[];
								angular.forEach(data.data.province, function (value, key) {
						    		$scope.provinceList.push({'value':key,'text':value.name});
								});
							}else if(type=='city'){
								angular.forEach(data.data.province, function (value, key) {
                                    if(value.name==provinceValue){
                                        angular.forEach(data.data.province[key].city, function (value, key) {
                                            $scope.cityList.push({'value':key,'text':value.name});
                                        });
                                        return;
                                     }
                                 });
							}else{
								angular.forEach(data.data.province, function (value, key) {
                                        if(value.name==provinceValue){
                                            angular.forEach(data.data.province[key].city, function (cvalue, ckey) {
                                                 if(cvalue.name==cityValue){
                                                    angular.forEach(data.data.province[key].city[ckey].region, function (rvalue, rkey) {
                                                        $scope.regionList.push({'value':rkey,'text':rvalue.name});
                                                    });
                                                 }
                                            });
                                            return;
                                       }
                                });
							}
					    }else{
					        CommonService.showToast(data.message, 2000);
					    }
					    $ionicLoading.hide();
					},function(error){
						$ionicLoading.hide();
					});
				}
		}
		$scope.getAllAreas('province','','');

		if($scope.customerModel.currentAddress.city!=null && $scope.customerModel.currentAddress.city!=''){
			$scope.getAllAreas('city',$scope.customerModel.currentAddress.province,'');
		}
		if($scope.customerModel.currentAddress.region!=null && $scope.customerModel.currentAddress.region!=''){
			$scope.getAllAreas('region',$scope.customerModel.currentAddress.province,$scope.customerModel.currentAddress.city);
		}

		$scope.provinceChange=function(){
			$scope.getAllAreas('city',$scope.customerModel.currentAddress.province,'');
		};
		$scope.cityChange=function(){
			$scope.getAllAreas('region',$scope.customerModel.currentAddress.province,$scope.customerModel.currentAddress.city);
		};

		$scope.getLocation=function(){
			
			if (ionic.Platform.isIOS()) {
				//新添加 start
				var options = { timeout: 10000, enableHighAccuracy: true };
	            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
	                $scope.customerModel.latitude= position.coords.latitude;//纬度
	                $scope.customerModel.longitude= position.coords.longitude;//经度

	            }, function(error) {
//	            	CommonService.showToast('定位出错:'+error, 2000);
	            });
	            //新添加 end
        	}else{

			   var geolocation = new BMap.Geolocation();
			   var gc = new BMap.Geocoder();
			   geolocation.getCurrentPosition(function(r) { //定位结果对象会传递给r变量
			   		$scope.latitude=r.point.lat;
			   		$scope.longitude=r.point.lng;
			   		$scope.customerModel.latitude =$scope.latitude;
			   		$scope.customerModel.longitude =$scope.longitude;
			       if (this.getStatus() == BMAP_STATUS_SUCCESS) { //通过Geolocation类的getStatus()可以判断是否成功定位。
			           var pt = r.point;
			           gc.getLocation(pt, function(rs) {
			               var addComp = rs.addressComponents;
			               if(addComp!=null){
			               		var province=addComp.province;
			               		var city=addComp.city;
			               		var region=addComp.region;
			               		var street=addComp.street+addComp.streetNumber;

			               		$scope.customerModel.weLiveAddres.province=province;
			               		$scope.customerModel.weLiveAddres.city=city;
			               		$scope.customerModel.weLiveAddres.region=region;
			               		$scope.customerModel.weLiveAddres.address=street;
			               }
			           });
			       } else {
			       		CommonService.showToast('定位获取当前位置出错了!', 2000);
			       }

			   },{ enableHighAccuracy: true });
			}
		}
		$scope.getLocation();
        $scope.module=$stateParams.module;
		$scope.next=function(customerModel){
        
				if(UtilService.isNull(customerModel.currentAddress.province)){
					CommonService.showToast('请选择所在地区!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.currentAddress.city)){
					CommonService.showToast('请选择所在地区!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.currentAddress.region)){
					CommonService.showToast('请选择所在地区!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.currentAddress.address)){
					CommonService.showToast('请输入详细地址!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.homeContact.name)){
					CommonService.showToast('请输入配偶（家庭）联系人姓名!', 2000);
					return;
				}else if(UtilService.isName(customerModel.homeContact.name)){
                	CommonService.showToast('家庭联系人姓名格式不正确!', 2000);
                	return;
            	}

				if(UtilService.isNull(customerModel.homeContact.relationship)){
					CommonService.showToast('请选择配偶关系!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.homeContact.phone)){
					CommonService.showToast('请输入配偶手机号码!', 2000);
					return;
				}else if(UtilService.isMobile(customerModel.homeContact.phone)){
					CommonService.showToast('配偶手机号码格式不正确!', 2000);
					return;
				}

				if(UtilService.isNull(customerModel.urgentContact.name)){
					CommonService.showToast('请输入紧急联系人姓名!', 2000);
					return;
				}else if(UtilService.isName(customerModel.urgentContact.name)){
                	CommonService.showToast('紧急联系人姓名格式不正确!', 2000);
                	return;
            	}

				if(UtilService.isNull(customerModel.urgentContact.relationship)){
					CommonService.showToast('请选择紧急联系人关系!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.urgentContact.phone)){
					CommonService.showToast('请输入紧急联系人手机号码!', 2000);
					return;
				}
				else if(UtilService.isMobile(customerModel.urgentContact.phone)){
					CommonService.showToast('紧急联系人手机号码格式不正确!', 2000);
					return;
				}
				if(!UtilService.isNull(customerModel.otherContact.phone) && UtilService.isMobile(customerModel.otherContact.phone)){
					CommonService.showToast('其他联系人手机号码格式不正确!', 2000);
					return;
				}
				if(UtilService.isNull(customerModel.interCode)){
					CommonService.showToast('请选择内部代码!', 2000);
					return;
				}

				if((customerModel.urgentContact.name==customerModel.homeContact.name)  || 
				   (customerModel.urgentContact.name==customerModel.otherContact.name) ||
				   (customerModel.homeContact.name==customerModel.otherContact.name) ){
					CommonService.showToast('联系人姓名不能相同!', 2000);
					return;
				}

				if((customerModel.homeContact.phone==customerModel.urgentContact.phone) ||
				   (customerModel.homeContact.phone==customerModel.otherContact.phone)  ||
				   (customerModel.urgentContact.phone==customerModel.otherContact.phone)){
					CommonService.showToast('联系人手机号码不能相同!', 2000);
					return;
				}
				if((customerModel.homeContact.relationship==customerModel.urgentContact.relationship) ||
				   (customerModel.homeContact.relationship==customerModel.otherContact.relationship)  ||
				   (customerModel.urgentContact.relationship==customerModel.otherContact.relationship)){
					CommonService.showToast('不能选择相同的联系关系!', 2000);
					return;
				}
                if(customerModel.homeContact.phone==$rootScope.applyMoblie){
					CommonService.showToast('配偶手机号码不能与本人的手机号码重复!', 2000);
					return;
				}
                if(customerModel.urgentContact.phone==$rootScope.applyMoblie){
					CommonService.showToast('紧急联系人的手机号码不能与本人的手机号码重复!', 2000);
					return;
				}
                if(customerModel.otherContact.phone==$rootScope.applyMoblie){
					CommonService.showToast('其他联系人的手机号码不能与本人的手机号码重复!', 2000);
					return;
				}
				if(CommonService.getStorageItem($rootScope.InterviewCacheName)!=undefined){
					CommonService.removeStorageItem($rootScope.InterviewCacheName);
				}
				CommonService.setStorageItem($rootScope.InterviewCacheName,JSON.stringify(customerModel));
                if($scope.module !="" && $scope.module =="account")
	            {
	            	$state.go('app.accountUpload',{'module':"account"});
	            }
	            else{
	            	$state.go('app.upload',{'module':""});
	            }
		}
	}])
	//附件上传
	.controller('uploadCtrl', ['$rootScope', '$scope','$state','$ionicActionSheet','$ionicLoading','$ionicHistory','$stateParams','Settings','InterviewService', 'CommonService','UtilService','$ionicPopup',function($rootScope,$scope,$state,$ionicActionSheet,$ionicLoading,$ionicHistory,$stateParams, Settings,InterviewService,CommonService,UtilService,$ionicPopup) {
			if(CommonService.getStorageItem($rootScope.InterviewCacheName)==null){//|| CommonService.getStorageItem("interStep")!=2
				$state.go('app.interview');
				return;
			}
			$scope.customerModel=JSON.parse(CommonService.getStorageItem($rootScope.InterviewCacheName));
//		    console.log(JSON.stringify($scope.customerModel));
			$scope.phoneType=function(type,imgUrl,FSImgUrl){
				switch(type)
				{
					case "identFront":{//身份证正面图片
						$scope.customerModel.identFront=imgUrl;
						$scope.customerModel.identFrontFS=FSImgUrl;
						break;
					}
					case "identBack":{//身份证背面图片
						$scope.customerModel.identBack=imgUrl;
						$scope.customerModel.identBackFS=FSImgUrl;
						break;
					}
					case "groupPhoto":{//销售与客户合照
						$scope.customerModel.groupPhoto=imgUrl;
						$scope.customerModel.groupPhotoFS=FSImgUrl;
						break;
					}
				}
			}

			var httpUrl=Settings.imgUrl;
			// $scope.groupProve=[];//销售与客户合照
			
			 if(!UtilService.isNull($scope.customerModel.identFront))
			 {
			//     $scope.customerModel.identFront=Settings.imgUrl+$scope.customerModel.identFront;
//			     $scope.customerModel.identFrontFS=Settings.imgUrl+$scope.customerModel.identFrontFS;
			 }
			 
			 if(!UtilService.isNull($scope.customerModel.identBack))
			 {
			//     $scope.customerModel.identBack=Settings.imgUrl+$scope.customerModel.identBack;
//			     $scope.customerModel.identBackFS=Settings.imgUrl+$scope.customerModel.identBackFS;
			 }
			 
			 if(!UtilService.isNull($scope.customerModel.groupPhoto))
			 {
			 //    $scope.customerModel.groupPhoto=Settings.imgUrl+$scope.customerModel.groupPhoto;
//			     $scope.customerModel.groupPhotoFS=Settings.imgUrl+$scope.customerModel.groupPhotoFS;
			     
			 }

			$scope.workProve=[];  //工作证明文件
			if(!UtilService.isNull($scope.customerModel.holeWorkCard)){
			    var workProveAry=$scope.customerModel.holeWorkCard.split(";");
			    var workProveAryFS=UtilService.isNull($scope.customerModel.holeWorkCardFS)?null:$scope.customerModel.holeWorkCardFS.split(";");
			    for(var i=0;i<workProveAry.length;i++){
			    	if(workProveAry[i] != "")
			    	{
			    		var fsPathUrl=(workProveAryFS==null)?null:workProveAryFS[i];
			    		$scope.workProve.push({"imgUrl":workProveAry[i],"saveImgUrl":workProveAry[i].replace($scope.customerModel.photoHttp,""),"fsPathUrl":fsPathUrl});
			    	}
			    }
			}
			console.log($scope.customerModel);
			$scope.secondProve=[];//第二证明文件
			if(!UtilService.isNull($scope.customerModel.socialCard)){
			    var secondProveAry=$scope.customerModel.socialCard.split(";");
			    var secondProveAryFS=UtilService.isNull($scope.customerModel.socialCardFS)?null:$scope.customerModel.socialCardFS.split(";");
			    for(var i=0;i<secondProveAry.length;i++){
			    	if(secondProveAry[i] != "")
			    	{
			    		var fsPathUrl=(secondProveAryFS==null)?null:secondProveAryFS[i];
			          $scope.secondProve.push({"imgUrl":secondProveAry[i],"saveImgUrl":secondProveAry[i].replace($scope.customerModel.photoHttp,""),"fsPathUrl":fsPathUrl});
			       }
			    }
			}
			$scope.otherProve=[]; //其他证明文件
			if(!UtilService.isNull($scope.customerModel.workCardBack)){
			    var otherProveAry=$scope.customerModel.workCardBack.split(";");
			    var otherProveAryFS=UtilService.isNull($scope.customerModel.workCardBackFS)?null:$scope.customerModel.workCardBackFS.split(";");
			    for(var i=0;i<otherProveAry.length;i++){
			    	if(otherProveAry[i] != "")
			    	{
			    	  var fsPathUrl=(otherProveAryFS==null)?null:otherProveAryFS[i];
			          $scope.otherProve.push({"imgUrl":otherProveAry[i],"saveImgUrl":otherProveAry[i].replace($scope.customerModel.photoHttp,""),"fsPathUrl":fsPathUrl});
			        }
			    }
			}
			$scope.deleImage = function(type,index){  //删除选中的图片
				type.splice(index,1);
			}

			$scope.showActionSheet = function(type,obj,width,height,indexFlag) {
			    var flag=false;
			    var msg="";

			    switch(type)
			    {
			    	// case "groupProve":
			    	// {
			    	//     if(obj.length>=8){
			    	//         flag=true;
			    	//         msg="销售与客户的合照最多添加8张!";
			    	//     }
			    	//     break;
			    	// }
			        case "workProve":
			        {
			            if(obj.length>=10){
			                flag=true;
			                msg="工作证明文件最多添加10张!";
			            }
			            break;
			        }
			        case "secondProve":
			        {
			            if(obj.length>=10){
			                flag=true;
			                msg="第二证明文件最多添加10张!";
			            }
			            break;
			        }
			        case "otherProve":
			        {
			            if(obj.length>=10){
			                flag=true;
			                msg="其他证明文件最多添加10张!";
			            }
			            break;
			        }
			    }
			    if(flag==true) {
			       CommonService.showToast(msg, 2000);
			       return;
			    }

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
			                	//alert('imageURI='+imageURI);
			                    if (imageURI != undefined) {
			                        InterviewService.UploadImg(imageURI, params, function(result) {
			                            var data = JSON.parse(result.response);
//			                            alert(result.response);
			                            if (data.result ==true) {
			                                CommonService.showToast(data.message, 2000);
			                                var imgUrl = data.data.photoUrl;
			                                var saveImgUrl=data.data.photo;
			                                var FSImgUrl =data.data.fsPath;
                                            var fsPathUrl = data.data.fsPathUrl;
			                                if(indexFlag==-1){   //上传单张照片（身份证正面，反面，合照）
			                                    $scope.phoneType(type,saveImgUrl,FSImgUrl);
			                                    var image = document.getElementById(type);

			                                    if(Settings.deBug==true)
			                                        image.src=data.FSImgUrl;
			                                    else
			                                        image.src =fsPathUrl;

			                                }else if (indexFlag>=0) {  //重新上传照片
			                                    obj[indexFlag].imgUrl=imgUrl;
			                                    obj[indexFlag].saveImgUrl=saveImgUrl;
			                                    obj[indexFlag].FSImgUrl=FSImgUrl;
			                                    obj[indexFlag].fsPathUrl=fsPathUrl;
			                                }else{   //indexFlag=-2,新增照片
			                                    obj.push({"imgUrl":imgUrl,"saveImgUrl":saveImgUrl,"FSImgUrl":FSImgUrl,"fsPathUrl":fsPathUrl});
			                                }
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
			                        InterviewService.UploadImg(imageURI, params, function(result) {
			                            var data = JSON.parse(result.response);
//			                            alert(result.response);

			                            if (data.result==true) {
			                                CommonService.showToast(data.message, 2000);
			                                var imgUrl = data.data.photoUrl;
			                                var saveImgUrl=data.data.photo;
			                                var FSImgUrl =data.data.fsPath;
                                            var fsPathUrl = data.data.fsPathUrl;
			                                if(indexFlag==-1){   //上传单张照片（身份证正面，反面，合照）
			                                    $scope.phoneType(type,saveImgUrl,FSImgUrl);
			                                    var image = document.getElementById(type);

			                                    if(Settings.deBug==true)
			                                        image.src=data.FSImgUrl;
			                                    else
			                                        image.src =fsPathUrl;

			                                }else if (indexFlag>=0) {  //重新上传照片
			                                    obj[indexFlag].imgUrl=imgUrl;
			                                    obj[indexFlag].saveImgUrl=saveImgUrl;
			                                    obj[indexFlag].FSImgUrl=FSImgUrl;
			                                    obj[indexFlag].fsPathUrl=fsPathUrl;
			                                }else{    //indexFlag=-2,新增照片
			                                    obj.push({"imgUrl":imgUrl,"saveImgUrl":saveImgUrl,"FSImgUrl":FSImgUrl,"fsPathUrl":fsPathUrl});
			                                }
			                                //hideActionSheet();
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
			};
            $scope.module=$stateParams.module;
            
			$scope.addRemark = function() {		 //添加备注

				if(UtilService.isNull($scope.customerModel.identFront)){
					CommonService.showToast('请上传身份证正面图片!', 2000);
					return;
				}
				if(UtilService.isNull($scope.customerModel.identBack)){
					CommonService.showToast('请上传身份证反面图片!', 2000);
					return;
				}
				if(UtilService.isNull($scope.customerModel.groupPhoto)){
	                CommonService.showToast('请上传客户代表与客户合照!', 2000);
	                return;
	            }

				if(UtilService.isNull($scope.workProve) || $scope.workProve.length<=0){
	                $scope.customerModel.holeWorkCard='';
	                $scope.customerModel.holeWorkCardFS='';
	            }else{
	            	var str="";
	            	var FSstr="";
	                for(var i=0;i<$scope.workProve.length;i++){
	                    str+=$scope.workProve[i].saveImgUrl+";";
	                    if(!UtilService.isNull($scope.workProve[i].FSImgUrl)){
	                        FSstr+=$scope.workProve[i].FSImgUrl+";";
	                    }else{
	                    	FSstr+=$scope.workProve[i].fsPathUrl+";";
	                    }
	                }
	                $scope.customerModel.holeWorkCard=(str.substring(str.length-1)==";")?str.substring(0,str.length-1):str;
	                fsPathUrl
	                $scope.customerModel.holeWorkCardFS=(FSstr.substring(FSstr.length-1)==";")?FSstr.substring(0,FSstr.length-1):FSstr;
	            }

	            if(UtilService.isNull($scope.secondProve) || $scope.secondProve.length<=0){
	                $scope.customerModel.socialCard='';
	                $scope.customerModel.socialCardFS='';
	            }else{
	            	var str="";
	            	var FSstr="";
	                for(var i=0;i<$scope.secondProve.length;i++){
	                    str+=$scope.secondProve[i].saveImgUrl+";";
	                    if(!UtilService.isNull($scope.secondProve[i].FSImgUrl)){
	                        FSstr+=$scope.secondProve[i].FSImgUrl+";";
	                    }else{
	                    	FSstr+=$scope.secondProve[i].fsPathUrl+";";
	                    }
	                }
	                $scope.customerModel.socialCard=(str.substring(str.length-1)==";")?str.substring(0,str.length-1):str;
	                $scope.customerModel.socialCardFS=(FSstr.substring(FSstr.length-1)==";")?FSstr.substring(0,FSstr.length-1):FSstr;
	            }
	            if(UtilService.isNull($scope.customerModel.holeWorkCard) && UtilService.isNull($scope.customerModel.socialCard)){
	            	CommonService.showToast('请上传工作证明文件或第二证明文件!', 2000);
	                return;
	            }

	            if(UtilService.isNull($scope.otherProve) || $scope.otherProve.length<=0){
	            	$scope.customerModel.workCardBack ='';
	            	$scope.customerModel.workCardBackFS ='';
//	                CommonService.showToast('请上传其他证明文件照片!', 2000);
//	                return;
	            }else{
	            	var str="";
	            	var FSstr="";
	                for(var i=0;i<$scope.otherProve.length;i++){
	                    str+=$scope.otherProve[i].saveImgUrl+";";
	                    if(!UtilService.isNull($scope.otherProve[i].FSImgUrl)){
	                        FSstr+=$scope.otherProve[i].FSImgUrl+";";
	                    }else{
	                    	FSstr+=$scope.otherProve[i].fsPathUrl+";";
	                    }
	                }
	                $scope.customerModel.workCardBack=(str.substring(str.length-1)==";")?str.substring(0,str.length-1):str;
	                $scope.customerModel.workCardBackFS=(FSstr.substring(FSstr.length-1)==";")?FSstr.substring(0,FSstr.length-1):FSstr;
	            }

				var singlePopup=$ionicPopup.show({
					title:"备注",
					templateUrl: "remark.html",
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
//							if (customerModel.remark.length>500){
//							   CommonService.showToast('备注至多只能输入500字!', 2000);
//							   e.preventDefault();
//							 }else{
							     $scope.save(); 
//							 }								
							}
						}
					]
				});
			};            
            
            
			$scope.save=function(){   //提交面签
				 console.log(JSON.stringify($scope.customerModel));
//				 return;
				$ionicLoading.show();
				if($scope.module !="" && $scope.module =="account")
				{
					InterviewService.updateSign($scope.customerModel,function(data){
					    if (data != null && data.result == true) {
					    	 //CommonService.removeStorageItem("interStep");
					    	 $ionicHistory.clearHistory();
					    	 CommonService.removeStorageItem($rootScope.InterviewCacheName);
					         CommonService.showGoToast(data.message, 2000,'app.myInterview',{'module':'account','isSx':Math.random()*10});
					    }
					    else{
					    	if(CommonService.getStorageItem($rootScope.InterviewCacheName)!=undefined){
					    		CommonService.removeStorageItem($rootScope.InterviewCacheName);
					    	}
					    	CommonService.setStorageItem($rootScope.InterviewCacheName,JSON.stringify($scope.customerModel));
					    	CommonService.showToast(data.message, 2000);
					    }
					},function(error){
						console.log(error);
						$ionicLoading.hide();
					});
				}else
				{

					InterviewService.saveSign($scope.customerModel,function(data){
					    if (data != null && data.result == true) {
					    	 //CommonService.removeStorageItem("interStep");
					    	 // $ionicHistory.clearHistory();
					    	 // CommonService.removeStorageItem($rootScope.InterviewCacheName);
					      //    CommonService.showGoToast(data.message, 2000,'app.interview',{'isSx':Math.random()*10});

					         $ionicHistory.clearCache().then(function(){ 
					    	    CommonService.removeStorageItem($rootScope.InterviewCacheName);
					            CommonService.showGoToast(data.message, 2000,'app.interview',{'isSx':Math.random()*10});
							});
					    }
					    else{
					    	if(CommonService.getStorageItem($rootScope.InterviewCacheName)!=undefined){
					    		CommonService.removeStorageItem($rootScope.InterviewCacheName);
					    	}
					    	CommonService.setStorageItem($rootScope.InterviewCacheName,JSON.stringify($scope.customerModel));
					    	CommonService.showToast(data.message, 2000);
					    }
					},function(error){
						$ionicLoading.hide();
					});
				}
			}
	}])
	//销售经理转单
	.controller('MToInterviewCtrl', ['$rootScope','$scope', '$ionicPopup','$stateParams','$ionicLoading','$timeout','TurnBillService', 'CommonService','UtilService',function($rootScope, $scope, $ionicPopup,$stateParams,$ionicLoading,$timeout,TurnBillService, CommonService,UtilService) {
		//$scope.isSx=$stateParams.isSx;

		$scope.parameter = {
		    pageIndex: 1,
		    pageSize: 8,
		    dsmId:0
		};
		$scope.stayInterviewsList = [];
		$scope.more=true;

		//获取待面签列表
		$scope.getStayInterviews=function () 
		{
		    //$ionicLoading.show();
		    TurnBillService.getStayInterviews($scope.parameter, function(data) {
		    	//console.log(data);
		        if (data != null && data.data.list != null) {
		            if (data.data.total <= $scope.parameter.pageSize){
		                $scope.more = false;
		                if($scope.parameter.pageIndex==1) $scope.stayInterviewsList = [];
		            }else if (parseInt($scope.stayInterviewsList.length) >= data.data.total) {
		                $scope.more = false;
		            } else {
		                $scope.more = true;
		            }
		            if(data.data.list.length>0){
                        Array.prototype.push.apply($scope.stayInterviewsList, data.data.list);
                    }
		        } else {
		            $scope.more = false;
		        }
		        $scope.parameter.pageIndex++;
		        //$ionicLoading.hide();
		    },function(error){
		    	$scope.more = false;
		    });
		}
		$scope.getStayInterviews();

		//加载更多
		$scope.loadMore = function() {
		    $scope.getStayInterviews();
		    $timeout(function() {
		       $scope.$broadcast('scroll.infiniteScrollComplete');
		    }, 1000);
		};
		//下拉刷新
		$scope.doRefresh = function() {
		    $scope.parameter.pageIndex = 1;
		    $scope.stayInterviewsList = [];
		    $scope.getStayInterviews();
		    $timeout(function() {
		       $scope.$broadcast('scroll.refreshComplete');
		    }, 1000);
		};
		$scope.salesList=[];
		$scope.salesModel={idPerson:0,saleId:'',remark:''};

		//获取销售代表列表
		$scope.getSalesList=function(factoryId){
			//console.log('factoryId='+factoryId);
			$ionicLoading.show();
			TurnBillService.getSales({'factoryId':factoryId}, function(data) {
			    if (data != null && data.data.length>0) {
			        $scope.salesList = data.data;
			    }
			    $ionicLoading.hide();
			},function(error){
		    	$ionicLoading.hide();
		    });
		}

		$scope.showPopup = function(idPerson,factoryId) {		
			$scope.getSalesList(factoryId);
			$scope.salesModel.idPerson=idPerson;

			var singlePopup=$ionicPopup.show({
				title:"派单管理",
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

							if (UtilService.isNull($scope.salesModel.saleId)){
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
						sigType:1
					};
					$ionicLoading.show();
					TurnBillService.saveSingle($scope.singleModel, function(data) {
						console.log(data);
					    if (data != null && data.result==true) {
					        CommonService.showToast(data.message, 2000);
					        $scope.doRefresh();
					    }else{
					    	CommonService.showToast(data.message, 2000);
					    }
					    $ionicLoading.hide();
					},function(error){
		    			$ionicLoading.hide();
		    		});
				}
			});
		};

		// if($scope.isSx==1){
		// 	$scope.doRefresh();
		// }	
	}])
	.controller('sendHistroyCtrl', ['$rootScope','$scope', '$ionicPopup','$stateParams','$ionicLoading','$timeout','TurnBillService', 'CommonService', function($rootScope, $scope, $ionicPopup,$stateParams,$ionicLoading,$timeout,TurnBillService, CommonService) {
		$scope.parameter = {
		    pageIndex: 1,
		    pageSize: 8,
		    saleId:0,
		    sigType:1
		};
		$scope.historySingleList = [];
		$scope.more=true;

		//获取待转单列表
		$scope.getHistorySingles=function() 
		{
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

		//加载更多
		$scope.loadMore = function() {
		    $scope.getHistorySingles();
		    $timeout(function() {
			    $scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
		//下拉刷新
		$scope.doRefresh = function() {
		    $scope.parameter.pageIndex = 1;
		    $scope.historySingleList = [];
		    $scope.getHistorySingles();
		    $timeout(function() {
		       $scope.$broadcast('scroll.refreshComplete');
		    }, 1000);
		};
	}]);
});