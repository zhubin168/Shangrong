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
     app.controller('weixinUserCtrl', ['$rootScope','$state','$scope','$uibModal','$loading','AccountService','toastr', function($rootScope, $state,$scope,$uibModal,$loading,AccountService,toastr){
            $scope.parm = {
			"paraName":"",
			"pageIndex": 1,
			"pageSize": 10
	        }		
			//理财师管理
			$rootScope.getUsers=function(){
				AccountService.getUsers($scope.parm,function(data){
					    console.log(data);
					    $scope.getUsersList = data.list;
					    $scope.totalItems = data.total;
				        $loading.finish("getUsers");
				        
			    });
			 }
			$rootScope.getUsers();
			
			//分页事件,获取当前的点击的页数
			$scope.pageChanged = function() {
				console.log($scope.parm.pageIndex);
				$rootScope.getUsers();
			};	
			
			//删除
			$scope.delUsers = function(id){
				var parm = {"id":id}
				var comfirm =confirm("是否确认删除该行？");
	           	  if(comfirm){
					  AccountService.delUsers (parm, function(data) {
					  	     toastr.success(data.message);
					  	     $rootScope.getUsers();
					    })
				   }
			}
			
			//设置用户信息
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
		
	 //设置理财师信息
	 app.controller('saveUsersCtrl',['$uibModalInstance','$scope','$state','$rootScope','$loading','UtilService','AccountService','configItem','Settings','toastr', function($uibModalInstance, $scope, $state, $rootScope,$loading ,UtilService,AccountService, configItem,Settings, toastr) {
			
			$scope.configItem = configItem;
			$scope.ok = function() {
				console.log(JSON.stringify($scope.configItem));
				AccountService.saveUsers($scope.configItem, function(data) {
					if(data != null && data.state == 1) {
						 $rootScope.getUsers();
						 toastr.success(data.message);
					} else {
						toastr.warning(data.message);
						$rootScope.getUsers();
					}
				})
				$uibModalInstance.close(); //关闭并返回当前选项
			};
			//取消
			$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel'); // 退出
					$rootScope.getUsers();
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