/**
 * Created by tianxc on 16-9-26.
 */
define(['app'], function(app) {
	app.controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', '$ionicPopup', '$ionicSlideBoxDelegate', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService, $ionicPopup, $ionicSlideBoxDelegate) {
		var code = UtilService.getUrlParam("code");
		var state = UtilService.getUrlParam("state");
		$scope.oAuthPar = {
			'code': code,
			'state': state
		};
        $scope.authorInfo={};
		$scope.initOAuth = function() {
			HomeService.GetOAuth($scope.oAuthPar, function(data) {
				console.log(data);
				if (data != null && data.state == 1) {
					$scope.authorInfo=data.data;
					CommonService.clearStorage('authorizationData');
					CommonService.setStorageItem('authorizationData', JSON.stringify(data.data));
					//alert(CommonService.getStorageItem('authorizationData'));
				} else {
					CommonService.showToast(data.message, 2000);
				}
			}, function(error) {

			});
		}
		$scope.initOAuth();

		//获取banners
		HomeService.GetBanners({
			"visiableUid": $scope.authorInfo.roleId
		}, function(data) {
			if (data.state == 1) {
				$scope.bannerItem = data.data.list;
				$ionicSlideBoxDelegate.update();
			} else {
				CommonService.showToast(data.message, 2000);
			}
		}, function(error) {
			CommonService.showToast(error, 2000);
		});
		//获取热门产品
		HomeService.GetHotProduct({}, function(data) {
			if (data.state == 1 && data.data != null) {
				$scope.hotProductList = data.data;
				//  			console.log($scope.hotProductList);
			} else {
				CommonService.showToast(data.message, 2000);
			}
		}, function(error) {
			CommonService.showToast(error, 2000);
		});

		//获取资讯
		HomeService.GetInformations({
			"pageIndex": 1,
			"pageSize": 3
		}, function(data) {
			if (data.state == 1) {
				$scope.newsItem = data.data.list;
				//  			console.log($scope.newsItem);
			} else {
				CommonService.showToast(data.message, 2000);
			}
		}, function(error) {
			CommonService.showToast(error, 2000);
		});
		//获取理财知识
		HomeService.GetKnowledges({
			"pageIndex": 1,
			"pageSize": 1
		}, function(data) {
			if (data.state == 1 && data.data.list != null) {
				$scope.knowledgeItem = data.data.list[0];
				console.log($scope.knowledgeItem);
			} else {
				CommonService.showToast(data.message, 2000);
			}
		}, function(error) {
			CommonService.showToast(error, 2000);
		});

		//跳转banner的详情
		$scope.getBannerDetails = function(index) {
			$state.go("app.bannerDetails", {
				"index": index
			});
		}

		$scope.getProductList = function() {
				$state.go("app.productList");
			}
			//跳转 产品详情
		$scope.getProductDels = function(pid) {
			$state.go("app.productDetails", {
				"pid": pid
			});
		}
		$scope.getNewsList = function() {
				$state.go("app.newsList");
			}
			//跳转资讯详情
		$scope.goNewsDetails = function(item) {
			$state.go("app.newsDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.setStorageItem("newsDetails", JSON.stringify(item));
		}
		$scope.goFinancial = function() {
			$state.go("app.fncList");
		}
		$scope.goFncList = function(item) {
			$state.go("app.fncDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.setStorageItem("knowDetails", JSON.stringify(item));
		}
		$scope.aboutSR = function() {
			$state.go("app.about");
		}

		// 确认拨打电话
		$scope.showCall = function() {
			var confirmCall = $ionicPopup.confirm({
				title: '提示',
				templateUrl: 'call.html',
				cssClass: 'srPopup',
				scope: $scope,
				cancelText: "取消",
				cancelType: "bg-grey sub-ft",
				okText: "确定",
				okType: "linearRight"
			});
			confirmCall.then(function(res) {
				if (res) {
					window.location.href = 'tel:400-888-6987';
				}
			});
		};
	}]);

	//  banner详情页
	app.controller('bannerDetailsCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService) {
		//获取banners详情
		HomeService.GetBanners({
			"visiableUid": "0"
		}, function(data) {
			if (data.state == 1) {
				$scope.bannerItem = data.data.list[$stateParams.index];
				console.log($scope.bannerItem);
			} else {
				CommonService.showToast(data.message, 2000);
			}
		}, function(error) {
			CommonService.showToast(error, 2000);
		})
	}]);

	//  资讯列表
	app.controller('newsListCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService) {
		//获取资讯
		$scope.parameter = {
			pageIndex: 1,
			pageSize: 8,
		};
		$scope.newsList = [];
		$scope.more = true;
		$scope.getNewsList = function() {
			HomeService.GetInformations($scope.parameter, function(data) {
				if (data.data != null && data.state == 1) {
					if (data.data.total <= $scope.parameter.pageSize) {
						$scope.more = false;
						if ($scope.parameter.pageIndex == 1) $scope.newsList = [];
					} else if (parseInt($scope.newsList.length) >= data.data.total) {
						$scope.more = false;
					} else if (data.data.list.length <= 0) {
						$scope.more = false;
					} else {
						$scope.more = true;
						$scope.parameter.pageIndex++;
					}
					if (data.data.list.length > 0) {
						Array.prototype.push.apply($scope.newsList, data.data.list);
					}
				} else {
					$scope.more = false;
				}
				console.log($scope.newsList);
			}, function(error) {
				CommonService.showToast(error, 2000);
			})
		}
		$scope.getNewsList();
		//加载更多
		$scope.loadMore = function() {
			$scope.getNewsList();
			$timeout(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
		// 下拉刷新
		$scope.doRefresh = function() {
			$scope.parameter.pageIndex = 1;
			$scope.newsList = [];
			$scope.getNewsList();
			$timeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};
		//跳转资讯详情
		$scope.goNewsDetails = function(item) {
			$state.go("app.newsDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.setStorageItem("newsDetails", JSON.stringify(item));
		}

	}]);
	//  资讯详情页
	app.controller('newsDetailsCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService) {
		$scope.newsDetails = JSON.parse(CommonService.getStorageItem("newsDetails"));
		console.info("资讯详情页：");
		console.log($scope.newsDetails);
		var content = document.getElementById("content");
		angular.element(content).html($scope.newsDetails.content);
	}]);

	//  理财知识列表
	app.controller('fncListCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService) {
		//获取知识
		$scope.parameter = {
			pageIndex: 1,
			pageSize: 8,
		};
		$scope.knowList = [];
		$scope.more = true;
		$scope.GetKnowledges = function() {
			HomeService.GetKnowledges($scope.parameter, function(data) {
				if (data.data != null && data.state == 1) {
					if (data.data.total <= $scope.parameter.pageSize) {
						$scope.more = false;
						if ($scope.parameter.pageIndex == 1) $scope.knowList = [];
					} else if (parseInt($scope.knowList.length) >= data.data.total) {
						$scope.more = false;
					} else if (data.data.list.length <= 0) {
						$scope.more = false;
					} else {
						$scope.more = true;
						$scope.parameter.pageIndex++;
					}
					if (data.data.list.length > 0) {
						Array.prototype.push.apply($scope.knowList, data.data.list);
					}
				} else {
					$scope.more = false;
				}
				console.log($scope.knowList);
			}, function(error) {
				CommonService.showToast(error, 2000);
			})
		}
		$scope.GetKnowledges();
		//加载更多
		$scope.loadMore = function() {
			$scope.GetKnowledges();
			$timeout(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
		// 下拉刷新
		$scope.doRefresh = function() {
			$scope.parameter.pageIndex = 1;
			$scope.knowList = [];
			$scope.GetKnowledges();
			$timeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};
		//跳转详情
		$scope.goFncList = function(item) {
			$state.go("app.fncDetails", {
				"isSx": Math.random() * 10
			});
			CommonService.setStorageItem("knowDetails", JSON.stringify(item));
		}
	}]);
	//  理财知识详情
	app.controller('fncDetailsCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService) {
		$scope.knowDetails = JSON.parse(CommonService.getStorageItem("knowDetails"));
		console.log($scope.knowDetails);
		var content = document.getElementById("content");
		angular.element(content).html($scope.knowDetails.content);
	}]);
	//  产品列表
	app.controller('productListCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', '$ionicScrollDelegate', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService, $ionicScrollDelegate) {
		$scope.productList = [];
		$scope.parameter = {
			pageIndex: 1,
			pageSize: 8,
			productType: 1
		};
		//jquery 控制tabs切换
		$('.tabs-top .tabs .tab-item').click(function() {
			$(this).addClass("active").siblings().removeClass("active");
		});
		//切换状态，查询数据
		$scope.seachByStatus = function(type) {
			$scope.productList = [];
			$scope.parameter.productType = type;
			$scope.GetProducts();
			$ionicScrollDelegate.scrollTop();
		};

		$scope.more = true;
		$scope.GetProducts = function() {
			HomeService.GetProducts($scope.parameter, function(data) {
				if (data != null && data.data.list != null) {
					if (data.data.total <= $scope.parameter.pageSize) {
						$scope.more = false;
						if ($scope.parameter.pageIndex == 1) $scope.productList = [];
					} else if (parseInt($scope.productList.length) >= data.data.total) {
						$scope.more = false;
					} else {
						$scope.more = true;
						$scope.parameter.pageIndex++;
					}
					if (data.data.list.length > 0) {
						Array.prototype.push.apply($scope.productList, data.data.list);
					}
				} else {
					$scope.more = false;
				}
				console.log($scope.productList);
			}, function(error) {
				$scope.more = false;
			});
		};
		$scope.GetProducts();
		//加载更多
		$scope.loadMore = function() {
			$scope.GetProducts();
			$timeout(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, 1000);
		};
		// // 下拉刷新
		$scope.doRefresh = function() {
			$scope.parameter.pageIndex = 1;
			$scope.productList = [];
			$scope.GetProducts();
			$timeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};
		//跳转产品详情
		$scope.getProductDels = function(pid) {
			$state.go("app.productDetails", {
				"pid": pid
			});
		}
	}]);
	
	//  产品详情
	app.controller('productDetailsCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', '$ionicPopup', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService, $ionicPopup) {
		//  	获取产品详情
		$scope.GetDetailProduct = function() {
			HomeService.GetDetailProduct({
				"productId": $stateParams.pid
			}, function(data) {
				if (data.state == 1 && data.data != null) {
					$scope.detailsItem = data.data;
					console.log($scope.detailsItem);
					$('#content').html($scope.detailsItem.content);
					$('#demoContent').html($scope.detailsItem.demoContent);
					$('#reasonContent').html($scope.detailsItem.reasonContent);
					
					$scope.detailsItem.problemContent = CommonService.htmlDecode($scope.detailsItem.problemContent);
					$scope.detailsItem.guideContent = CommonService.htmlDecode($scope.detailsItem.guideContent);
					//赋值预约信息的产品id
					$scope.orderInfo.productId = data.data.pid;
				} else {
					CommonService.showToast(data.message, 2000);
				}
			}, function(error) {
				CommonService.showToast(error, 2000);
			})
		}
		$scope.GetDetailProduct();
		var uid = JSON.parse(CommonService.getStorageItem('authorizationData'));
		$scope.orderInfo = {
			"userName": "",
			"sex": 1,
			"phone": "",
			"uId": uid,
			"productId": 0
		};
		//获取预约信息
		HomeService.GetOrder({
				"uId": $scope.orderInfo.uId
			}, function(data) {
				console.log(data);
				if (data.state == 1 && data.data != null) {
					$scope.orderInfo.userName = data.data.userName;
					$scope.orderInfo.sex = data.data.sex;
					$scope.orderInfo.phone = data.data.phone;
				} else {
					//  			CommonService.showToast(data.message, 2000);
				}
			}, function(error) {
				CommonService.showToast(error, 2000);
			})
			//提交预约信息
		$scope.AddOrder = function() {

				if (UtilService.isNull($scope.orderInfo.userName)) {
					CommonService.showToast("请输入姓名！", 2000);
					return;
				} else if (UtilService.isName($scope.orderInfo.userName)) {
					CommonService.showToast("姓名格式只能为2-15个字母或汉字！", 2000);
					return;
				} else if (UtilService.isNull($scope.orderInfo.sex)) {
					CommonService.showToast("请选择性别！", 2000);
					return;
				} else if (UtilService.isNull($scope.orderInfo.phone)) {
					CommonService.showToast("请输入手机号码！", 2000);
					return;
				} else if (UtilService.isMobile($scope.orderInfo.phone)) {
					CommonService.showToast("手机号码的格式不正确！", 2000);
					return;
				}

				console.log($scope.orderInfo);
				HomeService.AddOrder($scope.orderInfo, function(data) {
					console.log(data);
					if (data.state == 1 && data.data != null) {
						CommonService.showToast(data.message, 2000);
					} else {
						CommonService.showToast(data.message, 3000);
					}
				}, function(error) {
					CommonService.showToast(error, 2000);
				})
			}
			// 确认拨打电话
		$scope.showCall = function() {
			var confirmCall = $ionicPopup.confirm({
				title: '提示',
				templateUrl: 'call.html',
				cssClass: 'srPopup',
				scope: $scope,
				cancelText: "取消",
				cancelType: "bg-grey sub-ft",
				okText: "确定",
				okType: "linearRight"
			});
			confirmCall.then(function(res) {
				if (res) {
					window.location.href = 'tel:400-888-6987';
				} else {
					console.log('You are not sure');
				}
			});
		};
		// 预约购买
		$scope.showBuy = function() {
			var confirmBuy = $ionicPopup.confirm({
				title: '预约信息',
				templateUrl: 'buy.html',
				cssClass: 'srPopup',
				scope: $scope,
				cancelText: "取消",
				cancelType: "bg-grey sub-ft",
				okText: "确定",
				okType: "linearRight"
			});
			confirmBuy.then(function(res) {
				if (res) {
					if (UtilService.isNull($scope.orderInfo.userName)) {
						CommonService.showToast("请输入姓名！", 2000);
						return;
					} else if (UtilService.isName($scope.orderInfo.userName)) {
						CommonService.showToast("姓名格式只能为2-15个字母或汉字！", 2000);
						return;
					} else if (UtilService.isNull($scope.orderInfo.sex)) {
						CommonService.showToast("请选择性别！", 2000);
						return;
					} else if (UtilService.isNull($scope.orderInfo.phone)) {
						CommonService.showToast("请输入手机号码！", 2000);
						return;
					} else if (UtilService.isMobile($scope.orderInfo.phone)) {
						CommonService.showToast("手机号码的格式不正确！", 2000);
						return;
					} else {
						$scope.AddOrder();
					}
				}
			});
		};

		//常见问题
		$scope.showProblem = function() {
			var showProblem = $ionicPopup.alert({
				title: '常见问题',
				templateUrl: 'problem.html',
				cssClass: 'proDelsPopup animated5 fadeInUp',
				scope: $scope,
				okText: "关闭",
				okType: "linearRight"
			});
		};
		//理赔指引
		$scope.showLipei = function() {
			var showProblem = $ionicPopup.alert({
				title: '理赔指引',
				templateUrl: 'lipei.html',
				cssClass: 'proDelsPopup animated5 fadeInUp',
				scope: $scope,
				okText: "关闭",
				okType: "linearRight"
			});
		};
		//展开，隐藏
		$('#reasonContentMore').click(function() {
			$('#reasonContent').toggleClass('max_h72');
			$(this).toggleClass('rotate180');
		})

		$('#demoContentMore').click(function() {
			$('#demoContent').toggleClass('max_h72');
			$(this).toggleClass('rotate180');
		})

	}]);
       app.controller('aboutCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$ionicHistory', '$ionicLoading', '$timeout', 'CommonService', 'HomeService', 'UtilService', '$ionicPopup', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicLoading, $timeout, CommonService, HomeService, UtilService, $ionicPopup) {	
	
		}]);
});