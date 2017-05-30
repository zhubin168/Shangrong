/**
 * Created by tianxc on 16-8-2.
 */
define(['angular'], function(angular) {

    var commonService = angular.module('app.commonService', ['ngCordova']);

    commonService.service('NetworkService', ['$q', '$cordovaNetwork', '$cordovaDevice', '$cordovaAppVersion', function($q, $cordovaNetwork, $cordovaDevice, $cordovaAppVersion) {
            return {
                getNetworkType: function() { // 获取网络类型
                    /*
                     Connection.UNKNOWN
                     Connection.ETHERNET //以太网
                     Connection.WIFI    WiFi
                     Connection.CELL_2G
                     Connection.CELL_3G
                     Connection.CELL_4G
                     Connection.CELL  //蜂窝网络
                     Connection.NONE
                     */
                    var deferred = $q.defer();
                    document.addEventListener("deviceready", function() {
                        deferred.resolve($cordovaNetwork.getNetwork())
                    }, false);
                    return deferred.promise;
                },
                isOnline: function() { // 是否启用网络
                    var deferred = $q.defer();
                    document.addEventListener("deviceready", function() {
                        deferred.resolve($cordovaNetwork.isOnline());
                    }, false);
                    return deferred.promise;
                },
                getDeviceInfo: function() { //获取用户设备信息JSON
                    // platform:平台
                    // version:系统版本
                    // uuid:设备ID
                    // model:手机型号
                    // manufacturer:制造商
                    var deferred = $q.defer();
                    document.addEventListener("deviceready", function() {
                        deferred.resolve($cordovaDevice.getDevice());
                    }, false);
                    return deferred.promise;
                },
                getUUID:function(){//返回设备ID
                    try{
                        return $cordovaDevice.getUUID();
                    }catch(e){
                        return '';
                    }
                }
            }
        }])
        .service('CommonService', ['$rootScope', '$q', '$ionicLoading', '$timeout', '$http', '$state', 'Settings', '$localStorageUsage', '$cordovaImagePicker', '$cordovaCamera', '$cordovaFileTransfer', '$cordovaDatePicker','$cordovaFileOpener2', function($rootScope, $q, $ionicLoading, $timeout, $http, $state, Settings, $localStorageUsage, $cordovaImagePicker, $cordovaCamera, $cordovaFileTransfer, $cordovaDatePicker,$cordovaFileOpener2) {
            var serviceBase = Settings.apiServiceBaseUrl;

            function showToast(string, duration,url,par) {
                $ionicLoading.show({
                    template: string,
                    noBackdrop: true
                });
                $timeout(function() {
                    $ionicLoading.hide();
                    if(url!=null)
                        $state.go(url, par);
                }, duration);
            }

            return {
				htmlDecode: function(c) {
				    var b = document.createElement("div");
				    b.innerHTML = c;
				    var a = b.innerText || b.textContent;
				    b = null;
				    return a;
				},            	
                getDatePicker: function(type) {
                    var deferred = $q.defer();
                    var options = {
                        date: new Date(),
                        mode: type, //'date', // or 'time'
                        maxDate: new Date() - 10000,
                        allowOldDates: true,
                        allowFutureDates: true,
                        doneButtonLabel: '确定',
                        doneButtonColor: '#000000',
                        cancelButtonLabel: '取消',
                        cancelButtonColor: '#000000',
                        locale: 'zh_cn'
                    };
                    $cordovaDatePicker.show(options).then(function(date) {
                        deferred.resolve(date);
                    });
                    return deferred.promise;
                },
                showToast: function(string, duration) { //消息提示框
                    showToast(string, duration,null,null);
                },
                showGoToast: function(string, duration, url, par) { //消息提示,后自动跳转
                    showToast(string, duration,url,par);
                },
                getPicture: function(width, height) { //浏览图片
                    var deferred = $q.defer();
                    var options = {
                        maximumImagesCount: 1,
                        width: width,
                        height: height,
                        quality: 100
                    };

                    $cordovaImagePicker.getPictures(options)
                        .then(function(results) {
                            deferred.resolve(results[0]);
                        }, function(error) {
                            //showToast('选择图片错误!', 5000);
                            deferred.reject(error);
                        });

                    return deferred.promise;
                },
                getCamera: function(width, height) { //拍照
                    var deferred = $q.defer();
                    var options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        targetWidth: width,
                        targetHeight: height
                    };
                    $cordovaCamera.getPicture(options).then(function(imageURI) {
                        deferred.resolve(imageURI);
                    }, function(err) {
                        //showToast('获取图片错误!', 5000);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                upload: function(url, filePath, params) { //上传文件
                    var deferred = $q.defer();
                    $rootScope.uploadProgress = 0;
                    var server = Settings.deBug === true ? 'http://10.10.72.35:8083/api/FileUpload/ImgUpload' : serviceBase + url;

                    var options = new FileUploadOptions();
                    options.params = params;
                    options.headers = {
                        'Authorization': 'Bearer ' + $rootScope.token,
                        'X-Requested-With': 'XMLHttpRequest'
                    };

                    $cordovaFileTransfer.upload(server, filePath, options)
                        .then(function(result) {
                            deferred.resolve(result);
                            $ionicLoading.hide();
                        }, function(err) {
                            $ionicLoading.hide();
                            deferred.reject(error);
                        }, function(progress) {
                            $timeout(function() {
                                $rootScope.uploadProgress = (progress.loaded / progress.total) * 100;
//                              $ionicLoading.show({
//                                  template: '正在上传中,请' + Math.floor($rootScope.uploadProgress) + '%...'
//                              });
		                    $ionicLoading.show({
		                        template: "正在上传中，请稍后..."
		                    });
                            });
                        });
                    return deferred.promise;
                },
                getAuthorizationData: function() { //获取用户信息
                    var authData = $localStorageUsage.getItem('authorizationData');
                    if (authData != null) {
                        authData = eval('(' + authData + ')');
                    } else {
                        authData = null;
                    }
                    return authData;
                },
                clearStorage: function() {
                    $localStorageUsage.clearAll();
                },
                clearStorage: function(str) {
                    $localStorageUsage.clear(str);
                },
                setStorageItem: function(key, value) { //存储数据
                    $localStorageUsage.setItem(key, value, 1);
                },
                getStorageItem: function(key) { //获取本地存储数据
                    return $localStorageUsage.getItem(key);
                },
                removeStorageItem: function(key) { //删除本地存储数据
                    $localStorageUsage.removeItem(key);
                },
                getJsonData: function(url, par) { //获取JSON数据

                    if ($rootScope.token == '' ||$rootScope.token==undefined) {
                        var dataV={'accessToken':'','headImg':'','name':'','uId':0};
                        
                        var authData = $localStorageUsage.getItem('authorizationData') == null ? JSON.stringify(dataV) : $localStorageUsage.getItem('authorizationData');
                        
                        authData = eval('(' + authData + ')');
                        $rootScope.token = authData.accessToken != "" ? authData.accessToken : '';
                    }
                    
                    var deferred = $q.defer();
                    var num = Settings.version;
                    var dataJs = Settings.deBug === true ? '.json?v=' + num : '';
                    
                    $http({
                        url: serviceBase + url + dataJs,
                        method: (Settings.deBug === true ? "get" : "post"),
                        headers: {
                            'Authorization':'Bearer '+($rootScope.token==''?'000':$rootScope.token)
                        },
                        data: par,
                        timeout:30000
                    }).success(function(data) {
//                      if ((JSON.stringify(data).indexOf('login'))>0 || data.hasOwnProperty('result')!==true || (data.message!=null&&data.message.indexOf('请求授权')>0)) {
//                          $localStorageUsage.clear();
//                          $state.go('login');
//                      }
//                      else {
                            deferred.resolve(data);
//                      }
                    }).error(function(error, status) {
                        
                        msg = '请求异常或者超时，请稍后重试！';
                        if(status==undefined){
                            //showToast('系统错误,请重新登录!', 1000);
                            $localStorageUsage.clear();
                            showToast('认证失效,请重新登录!', 2000,'login',null);
                            //$state.go('login');

                        }else if (status==0 || status == 500 || status==404){

                            showToast(msg, 2000);
                            deferred.reject(msg);
                        }else{
                            showToast(msg, 1000);
                            deferred.reject(msg);
                        }
                    });
                    return deferred.promise;
                },
                getUpdateData:function(url){//获取更新数据
                    var deferred = $q.defer();
                    $http({
                        url:url,
                        method:"get"
                    }).success(function(data) {
                        deferred.resolve(data);
                    }).error(function(error, status) {
                        deferred.reject(error);
                    }).finally(function() {

                    });
                    return deferred.promise;
                },
                updateApk:function(data){ //更新APK包
                    $ionicLoading.show({
                        template: "已经下载：0%"
                    });
                    var url =data.url;
                    var targetPath =data.targetPath;
                    var trustHosts = true;
                    var options = {};

                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                            $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive').then(function () {}, function (err) {

                            });
                            $ionicLoading.hide();

                    }, function (err) {
                            $ionicLoading.show({
                              template: "下载失败"
                            });
                            $ionicLoading.hide();
                    }, function (progress) {
                            $timeout(function () {
                              var downloadProgress = (progress.loaded / progress.total) * 100;
                              $ionicLoading.show({
                                template: "已经下载：" + Math.floor(downloadProgress) + "%"
                              });
                              if (downloadProgress > 99) {
                                $ionicLoading.hide();
                              }
                            });
                    });
                },
                getAllAreas:function(data,type,provinceValue,cityValue){
                    var resultData=[];
                    if (data != null) {
                            switch(type)
                            {
                                case "province":
                                {
                                    angular.forEach(data.province, function (value, key) {
                                        resultData.push({'value':key,'text':value.name});
                                    });
                                    break;
                                }
                                case "city":
                                {
                                    angular.forEach(data.province, function (value, key) {
                                        if(value.name==provinceValue){
                                            angular.forEach(data.province[key].city, function (value, key) {
                                                resultData.push({'value':key,'text':value.name});
                                            });
                                            return;
                                        }
                                    });
                                    break;
                                }
                                case "region":
                                {
                                    angular.forEach(data.province, function (value, key) {
                                        if(value.name==provinceValue){
                                            angular.forEach(data.province[key].city, function (cvalue, ckey) {
                                                 if(cvalue.name==cityValue){
                                                    angular.forEach(data.province[key].city[ckey].region, function (rvalue, rkey) {
                                                        resultData.push({'value':rkey,'text':rvalue.name});
                                                    });
                                                 }
                                            });
                                            return;
                                        }
                                    });
                                    break;
                                }
                            }
                        }
                        return resultData;
                },
                getAllAreasData:function(par,callback,callbackError){
                    $ionicLoading.show();
                    this.getJsonData('api/common/getAllAreas',par).then(function(data) {
                       $ionicLoading.hide();
                       callback(data);
                    },function(error){
                        $ionicLoading.hide();
                        callbackError(error);
                    });
                }
            }
        }])
        .service('HubService', ['$rootScope', 'Settings', function($rootScope, Settings) {
            var signalrServerUrl = Settings.signalrServerUrl;
            var hubName = Settings.hubName;
            var hubConnection, proxy;

            $rootScope.isHubStart = false;
            //hubConnection.logging = true;

            function start() {
                try {
                    if ($rootScope.isHubStart == true)
                        return;
                    hubConnection = $.hubConnection(signalrServerUrl, {
                        useDefaultPath: false
                    });
                    hubConnection.qs = {
                        'DafyBearer': $rootScope.token
                    };
                    proxy = hubConnection.createHubProxy(hubName);
                    //console.log('HubService $rootScope.token='+$rootScope.token);

                    hubConnection.start().done(function() {
                        console.log("APP启动连接ID" + hubConnection.id + "与服务器成功建立了连接");
                        $rootScope.isHubStart = true;
                    }).fail(function() {
                        console.log("连接SignalR服务器失败");
                    });

                    hubConnection.reconnecting(function() {
                        $rootScope.isHubStart = true;
                    });
                    hubConnection.reconnected(function() {
                        $rootScope.isHubStart = false;
                    });
                    hubConnection.disconnected(function() {
                        console.log('与SignalR服务器断开了链接');
                        if (!$rootScope.isHubStart) {
                            setTimeout(function() {
                                start();
                            }, 3000);
                        }
                    });
                    hubConnection.error(function(error) {
                        //alert('SignalR error: ' + error);
                    });

                } catch (e) {

                }
            }

            return {
                getHubConnection: function() {
                    return hubConnection;
                },
                start: function() {
                    start();
                },
                getHubProxy: function() {
                    if (!$rootScope.isHubStart)
                        start();
                    return hubConnection.createHubProxy(hubName);
                },
                invoke: function(methodName, par, callback) { //调用服务端方法
                    proxy.invoke(methodName, par)
                        .done(function(result) {
                            $rootScope.$apply(function() {
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                },
                on: function(eventName, callback) { //客户端回调方法
                    proxy.on(eventName, function(result) {
                        $rootScope.$apply(function() {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                }
            };
        }])
        .service('JPushService', ['$window', 'Settings', function($window, Settings) {

            return {
                initJPush: function() { //初始化摧送服务
                  $window.plugins.jPushPlugin.init();
                  $window.plugins.jPushPlugin.setDebugMode(Settings.deBug == true ? true : false);
                },
                stopJPush: function() { //停止摧送服务
                    $window.plugins.jPushPlugin.stopPush();
                },
                restartJPush: function() { //重启摧送服务
                    $window.plugins.jPushPlugin.resumePush();
                },
                setAlias: function(alias) { //设置别名
                    $window.plugins.jPushPlugin.setAlias(alias);
                },
                setTags: function(tags) { //设置标签
                    $window.plugins.jPushPlugin.setTags(tags.split(','));
                },
                setTagsWithAlias: function(tags, alias) { //设置标签与别名
                    $window.plugins.jPushPlugin.setTagsWithAlias(tags.split(','), alias);
                }
            };
        }])
        .service('UtilService',['$window','$identCheck',function($window,$identCheck){
            return {
                isNull: function (val) {//检查给定的对象是否为Null或未定义
                    return val == null || val=='' || typeof(val) == "undefined";
                },
                isName:function(val){//姓名只能输入最小2个最大15个汉字字母组成
                    return !/^[a-zA-Z\u4e00-\u9fa5]{2,15}$/.test(val);
                },
                isNumber: function (val) {//判断给定的值是否是数字
                    return isNaN(val);
                },
                isInteger:function(val){//5位正整数
                    return !/^[1-9]{1}\d{0,7}$/.test(val);
                },
                isLength:function(val,minNum,maxNum){//判断字符串长度
                    return !(val.length>=minNum && val.length<maxNum)?true:false;
                },
                isEmpty: function (val) {//检查给定的字符串是否是空串或未定义
                    return this.trim(val).length == 0;
                },
                trim: function (val) {//移除给定的字符串两端的空白字符，如果字符串不存在则返回空串。
                    return !val ? "" : val.replace(/(^\s*)|(\s*$)/g, "");
                },
                isMobile:function(val){//检测手机号码格式号码是否正确
                    return !/^1[0-9]{10}$/.test(val);
                },
                isTelephone:function(val){//检测电话号码如077588888888
                    return !/^(010|0[2-9]{1}[0-9]{0,2})\d{7,8}$/.test(val);  ///^(010|0[2-9]{1}[0-9]{0,2})-?\d{7,8}$/
                },
                isEmail:function(val){//检测邮箱格式是否正确
                    return !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
                },
                isBankNo:function(val){//检测银行卡号格式是否正确
                    return !/^[0-9]{16,19}$/.test(val);
                },
                isArray: function (val) {//判断是否为数组
                    return !this.isNull(val) && Object.prototype.toString.call(val) === "[object Array]";
                },
                isStartWith: function (val, prefix) {//检查给定的字符串是否以某个字符串开头，如果要检测多个prefix，可指定prefix为数组。
                    if (!val) return false;
                    var arrays = this.isArray(prefix) ? prefix : [prefix];
                    for (var i = 0; i < arrays.length; i++) {
                        if (val.indexOf(arrays[i]) == 0) {
                            return true;
                        }
                    }
                    return false;
                },
                isContain: function (val, array) {//检查指定的值是否在给定的数组中。
                    if (!this.isArray(array)) return false;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == val) return true;
                    }
                    return false;
                },
                isIdent:function(val){//验证身份证号格式是否正确
                    return $identCheck.checkIDCard(val);//{ flag: false, error: '身份证校验位不正确' }
                    // if(val.length==15)
                    //     return !/^\d{15}$/.test(val);
                    // else
                    //     return !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(val);
                },
                getUrlParam:function(val) {
                    var par = new RegExp("(^|&)" + val + "=([^&]*)(&|$)");
                    var parValue = window.location.search.substr(1).match(par);
                    if (parValue != null) {
                        return unescape(parValue[2]);
                    }
                    return null;
                },
                isSexByIdent:function(val){//根据身份证判断性别
                    if(val.length==15){
                        return (parseInt(val.toString().charAt(val.length-1))%2==0?'女':'男');
                    }else{
                        return parseInt(val.toString().charAt(val.length-2))%2==0?'女':'男';
                    }
                }
            }
        }]);

    return commonService;
});
