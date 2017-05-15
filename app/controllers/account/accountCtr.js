define(['app'], function(app) {
	app.controller('LoginCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
			$scope.user = {
                userId: '',
                password: '',
                uuId:'0000'//device.$$state.value.uuid
            };

            $scope.login = function(user) { //登录
                if (user.userId == '') {
                    toastr.warning('请输入用户名!');
                    return;
                } else if (!/^[0-9]*$/.test(user.userId)) {
                    toastr.warning('用户名只能输入数字!');
                    return;
                }
                if (user.password == '') {
                    toastr.warning('请输入密码!');
                    return;
                }
                $loading.start("loginLoad");
	            AccountService.login(user, function(data) {
	            	console.log(data);
	            	    $loading.finish("loginLoad");
	                    if (data != null && data.state == 1) {	        
	                    	localStorage.setItem('onLineauthorization', JSON.stringify(data.data));
	                        $rootScope.token = data.data.token;
	                        $rootScope.userId=user.userId;	                        
	                        $state.go('home.getOrders');
	                    } else {
	                    	toastr.warning('用户名或密码不对!');
	                    	localStorage.removeItem('onLineauthorization');
	                    }
	            });

            };
		}]);
		 //忘记密码
		app.controller('forgetPwdCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','CommonService','UtilService','toastr','$interval', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,CommonService,UtilService,toastr,$interval){
	        $scope.forgetPwd =function(user){
	        	if(UtilService.isNull(user.saleId)  || user==undefined) {
			        	toastr.warning("请输入用户名");
						return;
					}else if(UtilService.isNull(user.phone)) {
						toastr.warning('请输入手机号码!');
						return;
					} else if(UtilService.isMobile(user.phone)) {
						toastr.warning('手机格式号码错误,请重新输入!');
						return;
					}else if(UtilService.isNull(user.newPassword)) {
						toastr.warning('请输入新密码!');
						return;
					}
			    $loading.start("forgetPwd");
	        	AccountService.findPassword(user,function(data){
					  if(data != null && data.state == 1) {
			        		toastr.success(data.message);
			        		$loading.finish("forgetPwd");
			        	}else{
			        		toastr.warning(data.message);
			        		$loading.finish("forgetPwd");
			        	}
	        	})
	        }		
		}]);
	 //客户管理
     app.controller('weixinUserCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
            "roleId":0,
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }	
	        //客户管理
			$rootScope.getCustomers=function(){
				AccountService.getUsers($scope.parm,function(data){
					    console.log(data);
					    $scope.getUsersList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getUsers");
				        
			    });
			}
			
			$rootScope.getCustomers();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getCustomers();
			};		
			
			//查看客户详情
			$scope.saveUsers = function(index) { //打开模态 
					var modalInstance = $uibModal.open({
						templateUrl: 'saveUsers.html', //指向上面创建的视图
						controller: 'saveUsersCtrl', // 初始化模态范围
						size: 'lg', //大小配置
						resolve: {
							configItem: function() {
							   return $scope.getUsersList[index];
							}
						}
					})
				}
		}]);
		
	 //客户详情
	 app.controller('saveUsersCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
			
			$scope.configItem = configItem;
			$scope.ok = function() {
				console.log(JSON.stringify($scope.configItem));
				AccountService.saveUsers($scope.configItem, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.getCustomers();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						$rootScope.getCustomers();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			};
			//取消
			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel'); // 退出
				$rootScope.getCustomers();
			}
			//设为理财师
			$scope.setManager = function() {
				 console.log(JSON.stringify($scope.configItem));
				AccountService.setUsers($scope.configItem, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.getCustomers();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						$rootScope.getCustomers();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			}
			//查看预约信息
			$scope.searchMyOrder = function() {
				 $uibModalInstance.dismiss('cancel'); // 退出
				 $state.go('home.getOrders');
			}
	  }]);
	 //理财师管理
	 app.controller('managersCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
            "roleId":1,
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//理财师列表
			$rootScope.getManagers=function(){
				AccountService.getManagers($scope.parm,function(data){
					    console.log(data);
					    $scope.getUsersList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getUsers");
				        
			    });
			 }
			$rootScope.getManagers();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getManagers();
			};	
			
			//点击理财师详情
			$scope.detailManager = function(id) {
			    var selectedItem= [{"id":id}];
				$state.go('home.detailManager',{"selectedItem":JSON.stringify(selectedItem)});
			}
			
			//点击客户详情
			$scope.getCustomerDetails = function(id,username,telphone) {
			    var selectedItem= {id:id,username:username,telphone:telphone};
				$state.go('home.getCustomerDetails',{"selectedItem":JSON.stringify(selectedItem)});
			}
			
		}]);
		
     //名下客户列表  
	 app.controller('detailCustomerCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','$stateParams','AccountService','CommonService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,$stateParams,AccountService,CommonService,toastr){
	       var selectedItem=JSON.parse($stateParams.selectedItem);
	        $scope.selectedItem=selectedItem;
	        //console.log(selectedItem);
	        $scope.parm = {
	       	"id":selectedItem.id,
	       	"pageIndex":1,
	       	"pageSize":10,
	       	"paraName":""
	        }
	        //名下客户列表
			$rootScope.detailCustomer=function(){
				AccountService.detailCustomer($scope.parm,function(data){
					    console.log(data);
					    $scope.getUsersList = data.list;
					    $scope.totalItems = data.total;				        
			    });
			 }
			$rootScope.detailCustomer();	
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.detailCustomer();
			};	
		    //返回
			$scope.goList = function() {
				$state.go('home.getUsers');
			}
	}]);
		
	 //理财师详情  
	 app.controller('detailManagerCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','$stateParams','AccountService','CommonService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,$stateParams,AccountService,CommonService,toastr){
	       var selectedItem=JSON.parse($stateParams.selectedItem);
	        $scope.parm = {
	       	"list":selectedItem
	        }
	        $rootScope.detailManager=function(){	
			    AccountService.detailManager({id: $scope.parm.list[0].id}, function(data) {
	    	       console.log(JSON.stringify(data));
					$scope.configItem = data;
				});
			}
	        $scope.detailManager();
		    //返回
			$scope.goList = function() {
				$state.go('home.getUsers');
			}
			//查看预约信息
			$scope.searchMyOrder = function() {
				 $state.go('home.getOrders');
			}
			
			$scope.isHasAllowance = function(id,username,telePhone,isHasAllowance) { //是否有任务津贴
				var modalInstance = $uibModal.open({
					templateUrl: 'isHasAllowance.html', //指向上面创建的视图
					controller: 'isHasAllowanceCtrl', // 初始化模态范围
					size: 'default', //大小配置
					resolve: {
						configItem: function() {
							   return {id:id,username:username,telePhone:telePhone,isHasAllowance:isHasAllowance};
						}
					}
				})
			}
			
			$scope.setBank = function(id,username,telePhone,ident,cardNo,bankName) { //编辑银行卡信息
				var modalInstance = $uibModal.open({
					templateUrl: 'setBank.html', //指向上面创建的视图
					controller: 'setBankCtrl', // 初始化模态范围
					size: 'default', //大小配置
					resolve: {
						configItem: function() {
							   return {id:id,username:username,telePhone:telePhone,ident:ident,cardNo:cardNo,bankName:bankName};
						}
					}
				})
			}
			
		    $scope.setRelation = function(id,pUsername) { //编辑关系信息
				var modalInstance = $uibModal.open({
					templateUrl: 'setRelation.html', //指向上面创建的视图
					controller: 'setRelationCtrl', // 初始化模态范围
					size: 'default', //大小配置
					resolve: {
						configItem: function() {
							   return {id:id,pUsername:pUsername};
						}
					}
				})
			}
		    
		    $scope.setCompany = function(id,username,telePhone,companyId) { //设置机构信息
				var modalInstance = $uibModal.open({
					templateUrl: 'setCompany.html', //指向上面创建的视图
					controller: 'setCompanyCtrl', // 初始化模态范围
					size: 'default', //大小配置
					resolve: {
						configItem: function() {
							   return {id:id,username:username,telePhone:telePhone,companyId:companyId};
						}
					}
				})
			}
	}]);

    //是否有任务津贴
	 app.controller('isHasAllowanceCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
			
			$scope.configItem = configItem;
			console.log($scope.configItem);
			$scope.ok = function(isHasAllowance) {
				console.log(JSON.stringify($scope.configItem));
				AccountService.setAllowance({id:$scope.configItem.id,isHasAllowance:isHasAllowance}, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.detailManager();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						//$rootScope.detailManager();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			};
			$scope.isHasAllowanceList=[{name:"是",value:"1"},{name:"否",value:"0"}];
			//取消
			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel'); // 退出
			}
	  }]);
	  
	 //设置银行卡信息
	 app.controller('setBankCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
			
			$scope.configItem = configItem;
			console.log($scope.configItem);
			$scope.ok = function(ident,cardNo,bankName) {
				console.log(JSON.stringify($scope.configItem));
				AccountService.setBank({id:$scope.configItem.id,ident:ident,cardNo:cardNo,bankName:bankName}, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.detailManager();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						//$rootScope.detailManager();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			};
			//取消
			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel'); // 退出
			}
	  }]);
	  
	 //设置上级信息
	 app.controller('setRelationCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
			
			$scope.configItem = configItem;
			console.log($scope.configItem);
			$scope.ok = function(pUsername) {
				console.log(JSON.stringify($scope.configItem));
				AccountService.setRelation({id:$scope.configItem.id,pUsername:pUsername}, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.detailManager();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						//$rootScope.detailManager();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			};
			//取消
			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel'); // 退出
			}
	  }]);
	  
	 //设置机构信息
	 app.controller('setCompanyCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
			
			$scope.configItem = configItem;
			console.log($scope.configItem);
			$scope.ok = function(companyId) {
				console.log(JSON.stringify($scope.configItem));
				AccountService.setCompany({id:$scope.configItem.id,companyId:companyId}, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.detailManager();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						//$rootScope.detailManager();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			};
			//取消
			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel'); // 退出
			}
	  }]);
		
	  app.controller('articlesCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//资讯管理
			$rootScope.getArticles=function(){
				AccountService.getArticles($scope.parm,function(data){
					    console.log(data);
					    $scope.getArticlesList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getArticles");
				        
			    });
			 }
			$rootScope.getArticles();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getArticles();
			};	
			
			//删除
			$scope.delArticles = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delArticles (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getArticles();
					    })
				   }
			}
			
			//保存资讯
			$scope.saveArticles = function(index) { //打开模态 
					var modalInstance = $uibModal.open({
						templateUrl: 'saveArticles.html', //指向上面创建的视图
						controller: 'saveArticlesCtrl', // 初始化模态范围
						size: 'lg', //大小配置
						resolve: {
							configItem: function() {
								if(index == -1) {
									return {
										  "id": '',
										  "articleTitle": '',
										  "articleType": '',
										  "articleImg": '',
										  "articleContent": '',
										  "isRecommand": '',
										  "isPublish": '',
										  "status": '',
									};
								} else {
									return $scope.getArticlesList[index];
								}
							}
						}
					})
				}
		}]);
		
	     //保存资讯
		 app.controller('saveArticlesCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
				   console.log(configItem);
				$scope.configItem = configItem;
				$scope.ok = function() {
					console.log(JSON.stringify($scope.configItem));
					AccountService.saveArticles($scope.configItem, function(data) {
						if(data != null && data.state == 1) {
							 $rootScope.getArticles();
							 toastr.success(data.message);
						} else {
							toastr.warning(data.message);
							$rootScope.getArticles();
						}
					})
					$uibModalInstance.close(); //关闭并返回当前选项
				};
				//取消
				$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel'); // 退出
						$rootScope.getArticles();
				}
				
				//文件上传
	            $scope.uploadPlanImg = function (file) {
	            	console.log(file);
	            	$loading.start("upLoadTrainImg");
	                AccountService.uploadImg({}, file, function(data) {
	                	    console.log(data);
					        if (data.state != 0) {
		                    	var photoUrl=data.data;
				                $scope.configItem.articleImg="http://"+photoUrl;
					        }else{
					            toastr.warning(data.message);
					        }
					        $loading.finish("upLoadTrainImg");
		               });
	            };		
		  }]);
		app.controller('ordersCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//订单管理
			$rootScope.getOrders=function(){
				AccountService.getOrders($scope.parm,function(data){
					    console.log(data);
					    $scope.getOrdersList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getOrders");
				        
			    });
			 }
			$rootScope.getOrders();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getOrders();
			};
			
			//删除
			$scope.delOrders = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delOrders (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getOrders();
					    })
				   }
			}
		}]);
		
		app.controller('productsCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//产品管理
			$rootScope.getProducts=function(){
				AccountService.getProducts($scope.parm,function(data){
					    console.log(data);
					    $scope.getProductsList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getProducts");
				        
			    });
			 }
			$rootScope.getProducts();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getProducts();
			};	
			
		    //删除
			$scope.delProducts = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delProducts (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getProducts();
					    })
				   }
			}
			
			//保存产品
			$scope.saveProducts = function(index) { //打开模态 
					var modalInstance = $uibModal.open({
						templateUrl: 'saveProducts.html', //指向上面创建的视图
						controller: 'saveProductsCtrl', // 初始化模态范围
						size: 'lg', //大小配置
						resolve: {
							configItem: function() {
								if(index == -1) {
									return {
									  "id": '',
									  "proName": '',
									  "proType":'',
									  "banner":'',
									  "price":'',
									  "proAge": '',
									  "logo": '',
									  "proPlan": '',
									  "proUse": '',
									  "proDoc": '',
									  "proCase": '',
									  "whyChoose":'',
									  "isHot": '',
									  "status":'',
									};
								} else {
									return $scope.getProductsList[index];
								}
							}
						}
					})
				}
		}]);
		
		//保存产品
		app.controller('saveProductsCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
				
				$scope.configItem = configItem;
				$scope.ok = function() {
					console.log(JSON.stringify($scope.configItem));
					AccountService.saveProducts($scope.configItem, function(data) {
						if(data != null && data.state == 1) {
							 $rootScope.getProducts();
							 toastr.success(data.message);
						} else {
							toastr.warning(data.message);
							$rootScope.getProducts();
						}
					})
					$uibModalInstance.close(); //关闭并返回当前选项
				};
				//取消
				$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel'); // 退出
						$rootScope.getProducts();
				}
				
				//文件上传
	            $scope.uploadPlanImg = function (file) {
	            	console.log(file);
	            	$loading.start("upLoadTrainImg");
	                AccountService.uploadImg({}, file, function(data) {
	                	    console.log(data);
					        if (data.state != 0) {
		                    	var photoUrl=data.data;
				                $scope.configItem.banner="http://"+photoUrl;
					        }else{
					            toastr.warning(data.message);
					        }
					        $loading.finish("upLoadTrainImg");
		               });
	            };	
		  }]);
		
		app.controller('coursesCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//课程管理
			$rootScope.getCourses=function(){
				AccountService.getCourses($scope.parm,function(data){
					    console.log(data);
					    $scope.getCoursesList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getCourses");
				        
			    });
			 }
			$rootScope.getCourses();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getCourses();
			};	
			
			//删除
			$scope.delCourses = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delCourses (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getCourses();
					    })
				   }
			}
			
			//保存课程
			$scope.saveCourses = function(index) { //打开模态 
					var modalInstance = $uibModal.open({
						templateUrl: 'saveCourses.html', //指向上面创建的视图
						controller: 'saveCoursesCtrl', // 初始化模态范围
						size: 'lg', //大小配置
						resolve: {
							configItem: function() {
								if(index == -1) {
									return {
										"id": '',
										"name": '',
										"title": '',
										"conent": '',
										"isRecomand": '',
										"imageUrl": '',
										"status": ''
									};
								} else {
									return $scope.getCoursesList[index];
								}
							}
						}
					})
				}
		}]);
		
	    //保存课程
		app.controller('saveCoursesCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
				
				$scope.configItem = configItem;
				$scope.ok = function() {
					console.log(JSON.stringify($scope.configItem));
					AccountService.saveCourses($scope.configItem, function(data) {
						if(data != null && data.state == 1) {
							 $rootScope.getCourses();
							 toastr.success(data.message);
						} else {
							toastr.warning(data.message);
							$rootScope.getCourses();
						}
					})
					$uibModalInstance.close(); //关闭并返回当前选项
				};
				//取消
				$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel'); // 退出
						$rootScope.getCourses();
				}
				
				//文件上传
	            $scope.uploadPlanImg = function (file) {
	            	console.log(file);
	            	$loading.start("upLoadTrainImg");
	                AccountService.uploadImg({}, file, function(data) {
	                	    console.log(data);
					        if (data.state != 0) {
		                    	var photoUrl=data.data;
				                $scope.configItem.imageUrl="http://"+photoUrl;
					        }else{
					            toastr.warning(data.message);
					        }
					        $loading.finish("upLoadTrainImg");
		               });
	            };	
		  }]);
		
		app.controller('activesCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//活动管理
			$rootScope.getActives=function(){
				AccountService.getActives($scope.parm,function(data){
					    console.log(data);
					    $scope.getActivesList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getActives");
				        
			    });
			 }
			$rootScope.getActives();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getActives();
			};	
			//删除
			$scope.delActives = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delActives (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getActives();
					    })
				   }
			}
			
			//保存活动
			$scope.saveActives = function(index) { //打开模态 
					var modalInstance = $uibModal.open({
						templateUrl: 'saveActives.html', //指向上面创建的视图
						controller: 'saveActivesCtrl', // 初始化模态范围
						size: 'lg', //大小配置
						resolve: {
							configItem: function() {
								if(index == -1) {
									return {
										"id": '',
										"imageUrl": '',
										"contentUrl": '',
										"title": ''
									};
								} else {
									return $scope.getActivesList[index];
								}
							}
						}
					})
				}
		}]);
		
		//保存活动
		app.controller('saveActivesCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
				
				$scope.configItem = configItem;
				$scope.ok = function() {
					console.log(JSON.stringify($scope.configItem));
					AccountService.saveActives($scope.configItem, function(data) {
						if(data != null && data.state == 1) {
							 $rootScope.getActives();
							 toastr.success(data.message);
						} else {
							toastr.warning(data.message);
							$rootScope.getActives();
						}
					})
					$uibModalInstance.close(); //关闭并返回当前选项
				};
				//取消
				$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel'); // 退出
						$rootScope.getActives();
				}
				//文件上传
	            $scope.uploadPlanImg = function (file) {
	            	console.log(file);
	            	$loading.start("upLoadTrainImg");
	                AccountService.uploadImg({}, file, function(data) {
	                	    console.log(data);
					        if (data.state != 0) {
		                    	var photoUrl=data.data;
				                $scope.configItem.imageUrl="http://"+photoUrl;
					        }else{
					            toastr.warning(data.message);
					        }
					        $loading.finish("upLoadTrainImg");
		               });
	            };
		  }]);
			
		app.controller('toolsCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//活动管理
			$rootScope.getTools=function(){
				AccountService.getTools($scope.parm,function(data){
					    console.log(data);
					    $scope.getToolsList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getTools");
				        
			    });
			 }
			$rootScope.getTools();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getTools();
			};	
			//删除
			$scope.delTools = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delTools (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getTools();
					    })
				   }
			}
			
			//保存获客助手
			$scope.saveTools = function(index) { //打开模态 
					var modalInstance = $uibModal.open({
						templateUrl: 'saveTools.html', //指向上面创建的视图
						controller: 'saveToolsCtrl', // 初始化模态范围
						size: 'lg', //大小配置
						resolve: {
							configItem: function() {
								if(index == -1) {
									return {
										"id": '',
										"title": '',
										"imgType": '',
										"orderNum": '',
										"imageUrl": ''
									};
								} else {
									return $scope.getToolsList[index];
								}
							}
						}
					})
				}
		}]);
		
		//保存助手
		app.controller('saveToolsCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
				
				$scope.configItem = configItem;
				$scope.ok = function() {
					console.log(JSON.stringify($scope.configItem));
					AccountService.saveTools($scope.configItem, function(data) {
						if(data != null && data.state == 1) {
							 $rootScope.getTools();
							 toastr.success(data.message);
						} else {
							toastr.warning(data.message);
							$rootScope.getTools();
						}
					})
					$uibModalInstance.close(); //关闭并返回当前选项
				};
				//取消
				$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel'); // 退出
						$rootScope.getTools();
				}
				//文件上传
	            $scope.uploadPlanImg = function (file) {
	            	console.log(file);
	            	$loading.start("upLoadTrainImg");
	                AccountService.uploadImg({}, file, function(data) {
	                	    console.log(data);
					        if (data.state != 0) {
		                    	var photoUrl=data.data;
				                $scope.configItem.imageUrl="http://"+photoUrl;
					        }else{
					            toastr.warning(data.message);
					        }
					        $loading.finish("upLoadTrainImg");
		               });
	            };
		  }]);
});