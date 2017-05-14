/**
 * Created by tianxc on 16-10-12.
 */
define(['app'], function(app) {
    //代理人身份信息
    app.controller('AgentInfoCtrl', ['$rootScope','$scope','$state','$stateParams','$ionicLoading','$ionicHistory','AgentService', 'CommonService','UtilService',function($rootScope, $scope,$state,$stateParams,$ionicLoading,$ionicHistory,AgentService, CommonService,UtilService) {
    	$rootScope.AgentCacheName="AgentInfo";
         $scope.agentModel=[];
        //获取申请代理人信息
        $scope.getAgentApplys=function(name,progressId){
            $ionicLoading.show();
            AgentService.getAgentApplys({'name':name,'ProgressId':progressId}, function(data) {
            	console.log(data);
                if (data != null && data.result==true) {
                    $scope.agentModel=data.data;
                    // if(!UtilService.isNull($scope.agentModel.province) && !UtilService.isNull($scope.agentModel.city))
                    //     $scope.getAllAreas('city',$scope.agentModel.province,$scope.agentModel.city);

                    $ionicLoading.hide();
                }else{
                    CommonService.showToast(data.message, 2000);
                }
            },function(error){
                $scope.agentModel=[];
                CommonService.showToast(error, 2000);
            });
        }
        var agentData=CommonService.getStorageItem($rootScope.AgentCacheName);

        if(!UtilService.isNull($stateParams.par)){
            $scope.agentParInfo = JSON.parse($stateParams.par);
            $scope.getAgentApplys($scope.agentParInfo.name,$scope.agentParInfo.progressId);
        }else if(!UtilService.isNull(agentData)){
            $scope.agentModel=JSON.parse(agentData);
        }else{
            $scope.agentModel={
                    'agentId':0,
                    'agentName':'',
                    'attachment':{
                        'holdIdent':'',
                        'holdIdentFS':'',
                        'holeWorkCard':'',
                        'holeWorkCardFS':'',
                        'identBack':'',
                        'identBackFS':'',
                        'identFront':'',
                        'identFrontFS':'',
                        'securityBack':'',
                        'securityFront':'',
                        'socialCard':'',
                        'socialCardFS':'',
                        'socialCardTwo':'',
                        'socialCardThree':'',
                        'workCardBack':'',
                        'workCardBackFS':'',
                        'workCardFront':''
                    },
                    'city':'',
                    'email':'',
                    'factroyId':'',
                    'hukouAddress':{
                        'address':'',
                        'city':'',
                        'province':''
                    },
                    'ident':'',
                    'jobs':'',
                    'liveAddress':{
                        'address':'',
                        'city':'',
                        'province':''
                    },
                    'marriage':'',
                    'parentContact':{
                        'address':'',
                        'city':'',
                        'name':'',
                        'phone':'',
                        'province':'',
                        'hjProvince':'',
                        'hjCity':'',
                        'hjAddress':'',
                        'relationShip':''
                    },
                    'phone':'',
                    'provePerson':'',
                    'provePhone':'',
                    'province':'',
                    'pwd':'',
                    'sex':'',
                    'urgentContact':{
                        'name':'',
                        'phone':'',
                        'relationShip':''
                    },
                    'workMonths':0,
                    'workTel':'',
                    'wsaId':'',
                    'wsaName':'',
                    'wsaPhone':''
            };
        }

        $scope.marriageList=[
            {'value':'0','text':'未婚'},
            {'value':'1','text':'已婚'},
            {'value':'2','text':'离异'},
            {'value':'3','text':'丧偶'}
        ];

        $scope.next=function(agentModel){//下一步

            if(UtilService.isNull(agentModel.wsaId)){
                CommonService.showToast('请输入客户代表工号!', 2000);
                return;
            }else if(UtilService.isNumber(agentModel.wsaId)){
                CommonService.showToast('客户代表工号只能输入数字!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.wsaName)){
                CommonService.showToast('请输入客户代表姓名!', 2000);
                return;
            }else if(UtilService.isName(agentModel.wsaName)){
                CommonService.showToast('客户代表姓名格式不正确!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.agentName)){
                CommonService.showToast('请输入姓名!', 2000);
                return;
            }else if(UtilService.isName(agentModel.agentName)){
                CommonService.showToast('姓名格式不正确!', 2000);
                return;
            }

            if(agentModel.wsaName==agentModel.agentName){
                CommonService.showToast('客户代表姓名不能与代理人姓名相同!', 2000);
                return;
            }

            var checkIDCard=UtilService.isIdent(agentModel.ident);
            if(checkIDCard.flag==false){
                CommonService.showToast(checkIDCard.error, 2000);
                return;
            }

            if(UtilService.isNull(agentModel.phone)){
                CommonService.showToast('请输入手机号码!', 2000);
                return;
            }else if(UtilService.isMobile(agentModel.phone)){
                CommonService.showToast('手机号码格式不正确!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.marriage)){
                CommonService.showToast('请选择婚姻状况!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.email)){
                CommonService.showToast('请输入电子邮件!', 2000);
                return;
            }else if(UtilService.isEmail(agentModel.email)){
                CommonService.showToast('电子邮件格式不正确!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.pwd)){
                CommonService.showToast('请输入登录密码!', 2000);
                return;
            }else if(UtilService.isLength(agentModel.pwd,6,20)){
                CommonService.showToast('登录密码只能输入大于等于6位小于20位!', 2000);
                return;
            }

            if(!UtilService.isNull(agentModel.wsaId) && !UtilService.isNull(agentModel.wsaName)){
                $ionicLoading.show();
                AgentService.checkClientInfo({'wsaId':agentModel.wsaId,'wsaName':agentModel.wsaName},function(data){
                    //console.log(data);
                    if(data!=null && data.result==true && data.data==agentModel.phone){
                        CommonService.showToast('代理人手机号码不能与客户代表号码相同!', 2000);
                        return;
                    }else if(data!=null && data.result==true && data.data!=agentModel.phone){
                        $ionicLoading.hide();

                        agentModel.sex=UtilService.isSexByIdent(agentModel.ident);
                        agentModel.wsaPhone=data.data;

                        if(!UtilService.isNull(CommonService.getStorageItem($rootScope.AgentCacheName))){
                            CommonService.removeStorageItem($rootScope.AgentCacheName);
                        }
                        CommonService.setStorageItem($rootScope.AgentCacheName,JSON.stringify(agentModel));
                        $state.go('agentAddress');
                    }else{
                        CommonService.showToast(data.message, 2000);
                        return;
                    }
                },function(error){
                    CommonService.showToast('校验客户代表信息出错!', 2000);
                    return;
                });
            }
        }
    }])
    //代理人地址信息
    .controller('AgentAddressCtrl', ['$rootScope','$scope','$state','$ionicLoading','AgentService', 'CommonService','UtilService',function($rootScope, $scope,$state,$ionicLoading,AgentService, CommonService,UtilService) {

        var agentData=CommonService.getStorageItem($rootScope.AgentCacheName);

        if(agentData==null || agentData==undefined){
            $state.go('agentInfo',{'par':''});
            return;
        }
        $scope.agentModel=JSON.parse(agentData);

        $scope.hjProvinceList=[];
        $scope.xjProvinceList=[];

        $scope.getAllAreas=function(type,code,provinceValue,cityValue){
            var resultData=[];

            var allAreasData=CommonService.getStorageItem('AllAreas');
            if(!UtilService.isNull(allAreasData))
            {
                var data=JSON.parse(allAreasData);
                resultData=CommonService.getAllAreas(data,code,provinceValue,cityValue);

                switch(type)
                {
                        case "hjProvince":{
                            $scope.hjProvinceList=resultData;
                            break;
                        }
                        case "xjProvince":{
                            $scope.xjProvinceList=resultData;
                            break;
                        }
                        case "hjCity":{
                            $scope.hjCityList=resultData;
                            break;
                        }
                        case "xjCity":{
                            $scope.xjCityList=resultData;
                            break;
                        }
                }
            }
            else
            {
                CommonService.removeStorageItem('AllAreas');
                CommonService.getAllAreasData(null,function(data){
                    if(data!=null && data.result==true){
                        CommonService.setStorageItem('AllAreas',JSON.stringify(data.data));
                        resultData=CommonService.getAllAreas(data.data,code,provinceValue,cityValue);

                        switch(type)
                        {
                                case "hjProvince":{
                                    $scope.hjProvinceList=resultData;
                                    break;
                                }
                                case "xjProvince":{
                                    $scope.xjProvinceList=resultData;
                                    break;
                                }
                                case "hjCity":{
                                    $scope.hjCityList=resultData;
                                    break;
                                }
                                case "xjCity":{
                                    $scope.xjCityList=resultData;
                                    break;
                                }
                        }
                    }
                },function(error){
                    return null;
                });
            }
        }
        $scope.getAllAreas('hjProvince','province','','');
        $scope.getAllAreas('xjProvince','province','','');

        // if(!UtilService.isNull($scope.agentModel.province)){
        //     $scope.agentModel.hukouAddress.province=$scope.agentModel.province;
        //     $scope.agentModel.liveAddress.province=$scope.agentModel.province;
        // }

        // if(!UtilService.isNull($scope.agentModel.city)){
        //     $scope.agentModel.hukouAddress.city=$scope.agentModel.city;
        //     $scope.agentModel.liveAddress.city=$scope.agentModel.city;
        // }

        $scope.hjProvinceChange=function(){//选择户籍所在城市
            $scope.getAllAreas('hjCity','city',$scope.agentModel.hukouAddress.province,'');
        }

        if(!UtilService.isNull($scope.agentModel.hukouAddress.province)){
            $scope.getAllAreas('hjCity','city',$scope.agentModel.hukouAddress.province,'');
        }

        $scope.xjProvinceChange=function(){//选择现居所在城市
            $scope.getAllAreas('xjCity','city',$scope.agentModel.liveAddress.province,'');
        }

        if(!UtilService.isNull($scope.agentModel.liveAddress.province)){
            $scope.getAllAreas('xjCity','city',$scope.agentModel.liveAddress.province,'');
        }
        // if(!UtilService.isNull($scope.agentModel.hukouAddress.city))
        //     $scope.getAllAreas('hjCity','city',$scope.agentModel.hukouAddress.province,$scope.agentModel.hukouAddress.city);

        // if(!UtilService.isNull($scope.agentModel.liveAddress.city))
        //     $scope.getAllAreas('xjCity','city',$scope.agentModel.liveAddress.province,$scope.agentModel.liveAddress.city);

        $scope.next=function(agentModel){//下一步

            if(UtilService.isNull(agentModel.hukouAddress.province)){
                CommonService.showToast('请选择户籍所在省份!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.hukouAddress.city)){
                CommonService.showToast('请选择户籍城市!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.hukouAddress.address)){
                CommonService.showToast('请输入户籍详细地址!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.liveAddress.province)){
                CommonService.showToast('请选择现居所在省份!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.liveAddress.city)){
                CommonService.showToast('请选择现居城市!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.liveAddress.address)){
                CommonService.showToast('请输入现居详细地址!', 2000);
                return;
            }

            if(!UtilService.isNull(CommonService.getStorageItem($rootScope.AgentCacheName))){
                CommonService.removeStorageItem($rootScope.AgentCacheName);
            }
            CommonService.setStorageItem($rootScope.AgentCacheName,JSON.stringify(agentModel));

            $state.go('agentJobs');
        }
    }])
    //代理人工作信息
    .controller('AgentJobsCtrl', ['$rootScope','$scope','$state','$ionicLoading','AgentService', 'CommonService','UtilService',function($rootScope, $scope,$state,$ionicLoading,AgentService, CommonService,UtilService) {
        var agentData=CommonService.getStorageItem($rootScope.AgentCacheName);

        if(!UtilService.isNull(agentData)){
            $scope.agentModel=JSON.parse(agentData);
        }else{
            $state.go('agentInfo');
            return;
        }
        $scope.getFactorys=function(){
            $ionicLoading.show();
            AgentService.getFactorys({'wsaId':$scope.agentModel.wsaId,'wsaName':$scope.agentModel.wsaName}, function(data) {
                if (data != null && data.result== true) {
                    $scope.factroyList=data.data.list;
                }
                $ionicLoading.hide();
            },function(error){
                $ionicLoading.hide();
            });
        }
        $scope.getFactorys();

        //刷新工厂
        $scope.doRefresh=function(){
            $scope.getFactorys();
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.next=function(agentModel){//下一步

            if(UtilService.isNull(agentModel.factroyId)){
                CommonService.showToast('请选择工厂!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.jobs)){
                CommonService.showToast('请输入任职岗位!', 2000);
                return;
            }else if(UtilService.isName(agentModel.jobs)){
                CommonService.showToast('任职岗位只能输入汉字与字母!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.workMonths) || agentModel.workMonths==0){
                CommonService.showToast('请输入工龄!', 2000);
                return;
            }else if(UtilService.isInteger(agentModel.workMonths)){
                CommonService.showToast('工龄只能输入正整数!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.provePerson)){
                CommonService.showToast('请输入工作单位证明人姓名!', 2000);
                return;
            }else if(UtilService.isName(agentModel.provePerson)){
                CommonService.showToast('证明人姓名格式不正确!', 2000);
                return;
            }else if(agentModel.wsaName==agentModel.provePerson){
                CommonService.showToast('证明人姓名不能与客户代表姓名相同!', 2000);
                return;
            }else if(agentModel.agentName==agentModel.provePerson){
                CommonService.showToast('证明人姓名不能与代理人姓名相同!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.provePhone)){
                CommonService.showToast('请输入证明人手机号!', 2000);
                return;
            }else if(UtilService.isMobile(agentModel.provePhone)){
                CommonService.showToast('证明人手机号格式不正确!', 2000);
                return;
            }else if(agentModel.phone==agentModel.provePhone){
                CommonService.showToast('证明人手机号不能与申请人号码相同!', 2000);
                return;
            }else if(agentModel.wsaPhone==agentModel.provePhone){
                CommonService.showToast('证明人手机号不能与客户代表号码相同!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.workTel)){
                
            }else if(UtilService.isStartWith(agentModel.workTel,'0') && UtilService.isTelephone(agentModel.workTel)){
                CommonService.showToast('工作单位电话格式不正确!', 2000);
                return;
            }else if(UtilService.isStartWith(agentModel.workTel,'1') && UtilService.isMobile(agentModel.workTel)){
                CommonService.showToast('工作单位电话格式不正确!', 2000);
                return;
            }else if(UtilService.isStartWith(agentModel.workTel,'1') && UtilService.isContain(agentModel.workTel,[
                agentModel.phone,agentModel.provePhone
                ])){
                CommonService.showToast('工作单位电话不能与申请人号码或证明人手机号相同!', 2000);
                return;
            }else if(UtilService.isStartWith(agentModel.workTel,'1') && agentModel.wsaPhone==agentModel.workTel){
                CommonService.showToast('工作单位电话不能与客户代表号码相同!', 2000);
                return;
            }

            if(!UtilService.isNull(CommonService.getStorageItem($rootScope.AgentCacheName))){
                CommonService.removeStorageItem($rootScope.AgentCacheName);
            }
            CommonService.setStorageItem($rootScope.AgentCacheName,JSON.stringify(agentModel));

            $state.go('agentContactInfo');
        }
    }])
    //紧急联系人
    .controller('AgentContactInfoCtrl', ['$rootScope','$scope','$state','$ionicLoading','AgentService', 'CommonService','UtilService','InterviewService',function($rootScope, $scope,$state,$ionicLoading,AgentService, CommonService,UtilService,InterviewService) {

        if(!UtilService.isNull(CommonService.getStorageItem($rootScope.AgentCacheName))){
            $scope.agentModel=JSON.parse(CommonService.getStorageItem($rootScope.AgentCacheName));
        }else{
            $state.go('agentInfo');
            return;
        }

        $scope.getHRelationship=function(type,code){//获取亲戚关系
            var relationData=CommonService.getStorageItem('hRelationship'+code);

            if(relationData!=null && relationData!=undefined)
            {
                var data=JSON.parse(relationData);
                if(type=='hRelationship'){
                    $scope.hRelationship=data;
                }else{
                    $scope.oRelationship=data;
                }
            }
            else
            {
                CommonService.removeStorageItem('hRelationship'+code);
                $ionicLoading.show();
                InterviewService.getDictionary({'regType':code}, function(data) {
                    if (data != null && data.result == true) {
                        CommonService.setStorageItem('hRelationship'+code,JSON.stringify(data.data.list));
                        
                        if(type=='hRelationship'){
                            $scope.hRelationship=data.data.list;
                        }else{
                            $scope.oRelationship=data.data.list;
                        }
                    }
                    $ionicLoading.hide();
                },function(error){
                    $ionicLoading.hide();
                    $scope.hRelationship=null;
                });
            }
        }
        $scope.getHRelationship('hRelationship','933');
        $scope.getHRelationship('oRelationship','934');

        $scope.provinceList=[];
        $scope.hjProvinceList=[];

        $scope.getAllAreas=function(type,code,provinceValue,cityValue){
            var resultData=[];

            var allAreasData=CommonService.getStorageItem('AllAreas');
            if(!UtilService.isNull(allAreasData))
            {
                var data=JSON.parse(allAreasData);
                resultData=CommonService.getAllAreas(data,code,provinceValue,cityValue);

                switch(type)
                {
                        case "province":
                        {
                            $scope.provinceList=resultData;
                            break;
                        }
                        case "hjProvince":{
                            $scope.hjProvinceList=resultData;
                            break;
                        }
                        case "city":{
                            $scope.cityList=resultData;
                            break;
                        }
                        case "hjCity":{
                            $scope.hjCityList=resultData;
                            break;
                        }
                }
            }
            else
            {
                CommonService.removeStorageItem('AllAreas');
                $ionicLoading.show();
                CommonService.getAllAreasData(null,function(data){
                    if(data!=null && data.result==true){
                        CommonService.setStorageItem('AllAreas',JSON.stringify(data.data));
                        resultData=CommonService.getAllAreas(data.data,code,provinceValue,cityValue);

                        switch(type)
                        {
                                case "province":
                                {
                                    $scope.provinceList=resultData;
                                    break;
                                }
                                case "hjProvince":{
                                    $scope.hjProvinceList=resultData;
                                    break;
                                }
                                case "city":{
                                    $scope.cityList=resultData;
                                    break;
                                }
                                case "hjCity":{
                                    $scope.hjCityList=resultData;
                                    break;
                                }
                        }
                        $ionicLoading.hide();
                    }else{
                        CommonService.showToast(data.message,2000);
                    }
                },function(error){
                    $ionicLoading.hide();
                    return null;
                });
            }
        }
        $scope.getAllAreas('province','province','','');
        $scope.getAllAreas('hjProvince','province','','');

        $scope.provinceChange=function(){//选择户籍所在城市
            $scope.getAllAreas('city','city',$scope.agentModel.parentContact.province,'');
        };
        $scope.hjProvinceChange=function(){//选择户籍所在城市
            $scope.getAllAreas('hjCity','city',$scope.agentModel.parentContact.hjProvince,'');
        };

        //$scope.agentModel.parentContact.address=$scope.agentModel.province+$scope.agentModel.city;

        if(!UtilService.isNull($scope.agentModel.parentContact.city))
            $scope.getAllAreas('city','city',$scope.agentModel.parentContact.province,$scope.agentModel.parentContact.city);

        if(!UtilService.isNull($scope.agentModel.parentContact.hjCity))
            $scope.getAllAreas('hjCity','city',$scope.agentModel.parentContact.hjProvince,$scope.agentModel.parentContact.hjCity);

        $scope.next=function(agentModel){//下一步

            if(UtilService.isNull(agentModel.parentContact.name)){
                CommonService.showToast('请输入父亲/母亲姓名!', 2000);
                return;
            }else if(UtilService.isName(agentModel.parentContact.name)){
                CommonService.showToast('父亲/母亲姓名格式不正确!', 2000);
                return;
            }else if(agentModel.wsaName==agentModel.parentContact.name){
                CommonService.showToast('父亲/母亲姓名不能与客户代表姓名相同!', 2000);
                return;
            }else if(agentModel.agentName==agentModel.parentContact.name){
                CommonService.showToast('父亲/母亲姓名不能与代理人姓名相同!', 2000);
                return;
            }else if(agentModel.provePerson==agentModel.parentContact.name){
                CommonService.showToast('父亲/母亲姓名不能与公司证明人姓名相同!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.parentContact.phone)){
                CommonService.showToast('请输入手机号码!', 2000);
                return;
            }else if(UtilService.isMobile(agentModel.parentContact.phone))
            {
                CommonService.showToast('父母联系方式手机号格式不正确!', 2000);
                return;
            }else if(agentModel.provePhone==agentModel.parentContact.phone){
                CommonService.showToast('父母手机号不能与单位证明人手机号相同!', 2000);
                return;
            }else if(UtilService.isContain(agentModel.parentContact.phone,[$scope.agentModel.phone,$scope.agentModel.provePhone])){
                CommonService.showToast('父母手机号不能与申请人号码或证明人手机号相同!', 2000);
                return;
            }else if(agentModel.wsaPhone==agentModel.parentContact.phone){
                CommonService.showToast('父母手机号不能与客户代表号码相同!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.parentContact.relationShip)){
                CommonService.showToast('请选择亲戚关系!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.parentContact.province)){
                CommonService.showToast('请选择父母现住省份!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.parentContact.city)){
                CommonService.showToast('请选择父母现住城市!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.parentContact.address)){
                CommonService.showToast('请输入父母现住详情地址!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.parentContact.hjProvince)){
                CommonService.showToast('请选择父母户籍省份!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.parentContact.hjCity)){
                CommonService.showToast('请选择父母户籍城市!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.parentContact.hjAddress)){
                CommonService.showToast('请输入父母户籍详情地址!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.urgentContact.name)){
                CommonService.showToast('请输入紧急联系人姓名!', 2000);
                return;
            }else if(UtilService.isName(agentModel.urgentContact.name)){
                CommonService.showToast('紧急联系人姓名格式不正确!', 2000);
                return;
            }else if(agentModel.wsaName==agentModel.urgentContact.name){
                CommonService.showToast('紧急联系人姓名不能与客户代表姓名相同!', 2000);
                return;
            }else if(agentModel.agentName==agentModel.urgentContact.name){
                CommonService.showToast('紧急联系人姓名不能与代理人姓名相同!', 2000);
                return;
            }else if(agentModel.provePerson==agentModel.urgentContact.name){
                CommonService.showToast('紧急联系人姓名不能与公司证明人姓名相同!', 2000);
                return;
            }else if(agentModel.parentContact.name==agentModel.urgentContact.name){
                CommonService.showToast('紧急联系人姓名不能与父亲/母亲姓名相同!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.urgentContact.phone)){
                CommonService.showToast('请输入紧急联系人手机号码!', 2000);
                return;
            }else if(UtilService.isMobile(agentModel.urgentContact.phone)){
                CommonService.showToast('紧急联系人手机号格式不正确!', 2000);
                return;
            }else if(UtilService.isContain(agentModel.urgentContact.phone,[$scope.agentModel.phone,
                $scope.agentModel.provePhone])){
                CommonService.showToast('紧急联系人手机号不能与申请人号码或证明人手机号相同!', 2000);
                return;
            }else if(agentModel.wsaPhone==agentModel.urgentContact.phone){
                CommonService.showToast('紧急联系人手机号不能与客户代表号码相同!', 2000);
                return;
            }

            if(UtilService.isStartWith(agentModel.workTel,'1') && UtilService.isContain(agentModel.workTel,[agentModel.parentContact.phone,agentModel.urgentContact.phone])){
                CommonService.showToast('工作单位电话不能与父母手机号和紧急联系人手机号相同!', 2000);
                return;
            }

            if(UtilService.isNull(agentModel.urgentContact.relationShip)){
                CommonService.showToast('请选择紧急联系人关系!', 2000);
                return;
            }

            if(agentModel.parentContact.phone==agentModel.urgentContact.phone){
                CommonService.showToast('两位联系人手机号码不能相同!', 2000);
                return;
            }

            if(agentModel.parentContact.relationShip==agentModel.urgentContact.relationShip){
                CommonService.showToast('紧急联系人与亲戚关系选择不能相同!', 2000);
                return;
            }

            if(!UtilService.isNull(CommonService.getStorageItem($rootScope.AgentCacheName))){
                CommonService.removeStorageItem($rootScope.AgentCacheName);
            }
            CommonService.setStorageItem($rootScope.AgentCacheName,JSON.stringify(agentModel));

            $state.go('agentAttachment');
        }
    }])
    //附件上传
    .controller('AgentAttachmentCtrl', ['$rootScope','$scope','$state','$ionicLoading','$ionicActionSheet','AgentService', 'CommonService','UtilService','Settings',function($rootScope, $scope,$state,$ionicLoading,$ionicActionSheet,AgentService, CommonService,UtilService,Settings) {

             if(!UtilService.isNull(CommonService.getStorageItem($rootScope.AgentCacheName))){
                 $scope.agentModel=JSON.parse(CommonService.getStorageItem($rootScope.AgentCacheName));
             }else{
                 $state.go('agentInfo');
                 return;
             }

            var httpUrl=Settings.imgUrl;
            $scope.workProve=[];  //工作证明文件
            if(!UtilService.isNull($scope.agentModel.attachment.holeWorkCard)){
                var workProveAry=$scope.agentModel.attachment.holeWorkCard.split(";");
                var workProveAryFS=UtilService.isNull($scope.agentModel.attachment.holeWorkCardFS)?null:$scope.agentModel.attachment.holeWorkCardFS.split(";");
                for(var i=0;i<workProveAry.length;i++){
                    $scope.workProve.push({"imgUrl":workProveAry[i],"saveImgUrl":workProveAry[i],"fsPathUrl":(workProveAryFS==null)?null:workProveAryFS[i]});
                }
            }
            $scope.secondProve=[];//第二证明文件
            if(!UtilService.isNull($scope.agentModel.attachment.socialCard)){
                var secondProveAry=$scope.agentModel.attachment.socialCard.split(";");
			    var secondProveAryFS=UtilService.isNull($scope.agentModel.attachment.socialCardFS)?null:$scope.agentModel.attachment.socialCardFS.split(";");
			    for(var i=0;i<secondProveAry.length;i++){
			        $scope.secondProve.push({"imgUrl":secondProveAry[i],"saveImgUrl":secondProveAry[i],"fsPathUrl":(secondProveAryFS==null)?null:secondProveAryFS[i]});
			    }
            }
            $scope.otherProve=[]; //其他证明文件
            if(!UtilService.isNull($scope.agentModel.attachment.workCardBack)){
                var otherProveAry=$scope.agentModel.attachment.workCardBack.split(";");
			    var otherProveAryFS=UtilService.isNull($scope.agentModel.attachment.workCardBackFS)?null:$scope.agentModel.attachment.holeWorkCardFS.split(";");
			    for(var i=0;i<otherProveAry.length;i++){
			        $scope.otherProve.push({"imgUrl":otherProveAry[i],"saveImgUrl":otherProveAry[i],"fsPathUrl":(otherProveAryFS==null)?null:otherProveAryFS[i]});
			    }
            }

            $scope.phoneType=function(type,imgUrl,FSImgUrl){
                          switch(type)
                          {
                              case "identFront":{//身份证正面图片
                                  $scope.agentModel.attachment.identFront=imgUrl;
                                  $scope.agentModel.attachment.identFrontFS=FSImgUrl;
                                  break;
                              }
                              case "identBack":{//身份证背面图片
                                  $scope.agentModel.attachment.identBack=imgUrl;
                                  $scope.agentModel.attachment.identBackFS=FSImgUrl;
                                  break;
                              }
                              case "workCardFront":{//工牌附件图片正面
                                  $scope.agentModel.attachment.workCardFront=imgUrl;
                                  break;
                              }
                              case "workCardBack":{//工牌附件图片背面
                                  $scope.agentModel.attachment.workCardBack=imgUrl;
                                  break;
                              }
                              case "holdIdent":{//手持身份证
                                  $scope.agentModel.attachment.holdIdent=imgUrl;
                                  $scope.agentModel.attachment.holdIdentFS=FSImgUrl;
                                  break;
                              }
                              case "holeWorkCard":{//手持工牌照片
                                  $scope.agentModel.attachment.holeWorkCard=imgUrl;
                                  break;
                              }
                              case "securityFront":{//社保正面图片
                                  $scope.agentModel.attachment.securityFront=imgUrl;
                                  break;
                              }
                              case "securityBack":{//社保反面图片
                                  $scope.agentModel.attachment.securityBack=imgUrl;
                                  break;
                              }
                              case "socialCard":{
                                  $scope.agentModel.attachment.socialCard=imgUrl;
                                  break;
                              }
                              case "socialCardTwo":{
                                  $scope.agentModel.attachment.socialCardTwo=imgUrl;
                                  break;
                              }
                              case "socialCardThree":{
                                  $scope.agentModel.attachment.socialCardThree=imgUrl;
                                  break;
                              }
                          }  
            }

        $scope.deleImage = function(type,index){  //删除选中的图片
        	type.splice(index,1);
        }
        $scope.showActionSheet = function(type,obj,width,height,indexFlag) {
                $scope.returnedText = '';
                var flag=false;
                var msg="";

                switch(type)
                {
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
                                if (imageURI != undefined) {
                                    AgentService.UploadImg(imageURI, params, function(result) {
                                        var data = JSON.parse(result.response);
                                        if (data.result ==true) {
                                            CommonService.showToast(data.message, 2000);
                                            var imgUrl =Settings.deBug==true? data.photoUrl:data.data.photoUrl;
                                            var saveImgUrl=Settings.deBug==true?data.photo:data.data.photo;
                                            var FSImgUrl=Settings.deBug==true?data.photo:data.data.fsPath;
                                            var fsPathUrl = data.data.fsPathUrl;
                                            if(indexFlag==-1){
                                                $scope.phoneType(type,saveImgUrl,FSImgUrl);
                                                var image = document.getElementById(type);

                                                if(Settings.deBug==true)
                                                    image.src=Settings.devUploadImgUrl+data.photoUrl;
                                                else
                                                    image.src =fsPathUrl;

                                            }else if (indexFlag>=0) {
                                                obj[indexFlag].imgUrl=imgUrl;
                                                obj[indexFlag].saveImgUrl=saveImgUrl;
                                                obj[indexFlag].FSImgUrl=FSImgUrl;
                                                obj[indexFlag].fsPathUrl=fsPathUrl;
                                            }else{
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
                                    AgentService.UploadImg(imageURI, params, function(result) {
                                        var data = JSON.parse(result.response);
                                        if (data.result==true) {
                                            CommonService.showToast(data.message, 2000);
                                            var imgUrl =Settings.deBug==true? data.photoUrl:data.data.photoUrl;
                                            var saveImgUrl=Settings.deBug==true?data.photo:data.data.photo;
                                            var FSImgUrl=Settings.deBug==true?data.photo:data.data.fsPath;
                                            var fsPathUrl = data.data.fsPathUrl;
                                            if(indexFlag==-1){
                                                $scope.phoneType(type,saveImgUrl,FSImgUrl);
                                                var image = document.getElementById(type);

                                                if(Settings.deBug==true)
                                                    image.src=Settings.devUploadImgUrl+data.photoUrl;
                                                else
                                                    image.src =fsPathUrl;

                                            }else if (indexFlag>=0) {
                                                obj[indexFlag].imgUrl=imgUrl;
                                                obj[indexFlag].saveImgUrl=saveImgUrl;
                                                obj[indexFlag].FSImgUrl=FSImgUrl;
                                                obj[indexFlag].fsPathUrl=fsPathUrl;
                                            }else{
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
                                CommonService.showToast('拍照获取图片出错了!' + err, 2000);
                            });
                        }
                        
                        return hideActionSheet;
                    }
                });
        }

        $scope.save=function(agentModel){//保存申请资料

            if(UtilService.isNull(agentModel.attachment.identFront)){
                    CommonService.showToast('请上传身份证正面图片!', 2000);
                    return;
            }
            if(UtilService.isNull(agentModel.attachment.identBack)){
                CommonService.showToast('请上传身份证反面图片!', 2000);
                return;
            }
            if(UtilService.isNull(agentModel.attachment.holdIdent)){
                CommonService.showToast('请上传手持身份证照片!', 2000);
                return;
            }
            if(UtilService.isNull($scope.workProve) || $scope.workProve.length<=0){
                CommonService.showToast('请上传工作证明文件照片!', 2000);
                return;
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
                agentModel.attachment.holeWorkCard=(str.substring(str.length-1)==";")?str.substring(0,str.length-1):str;
                agentModel.attachment.holeWorkCardFS=(FSstr.substring(FSstr.length-1)==";")?FSstr.substring(0,FSstr.length-1):FSstr;
            }
            
            if(UtilService.isNull($scope.secondProve) || $scope.secondProve.length<=0){
                CommonService.showToast('请上传第二证明文件照片!', 2000);
                return;
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
                agentModel.attachment.socialCard=(str.substring(str.length-1)==";")?str.substring(0,str.length-1):str;
                agentModel.attachment.socialCardFS=(FSstr.substring(FSstr.length-1)==";")?FSstr.substring(0,FSstr.length-1):FSstr;
            }

            if(UtilService.isNull($scope.otherProve) || $scope.otherProve.length<=0){
//              CommonService.showToast('请上传其他证明文件照片!', 2000);
//              return;
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
                agentModel.attachment.workCardBack=(str.substring(str.length-1)==";")?str.substring(0,str.length-1):str;
                agentModel.attachment.workCardBackFS=(FSstr.substring(FSstr.length-1)==";")?FSstr.substring(0,FSstr.length-1):FSstr;
            }
//         	alert(JSON.stringify(agentModel.attachment));
//          return;
            $ionicLoading.show();
            AgentService.saveAgentApply(agentModel,function(data){
                    if (data != null && data.result == true) {
                    	 $rootScope.agentUser=data.data.id;
                         CommonService.removeStorageItem($rootScope.AgentCacheName);
                         if(data.data.isActivate==0){
                         	  CommonService.showGoToast(data.message, 2000);
                         	  $state.go('agreement',{"parm":JSON.stringify(data.data)});
                         }else{
                         	  CommonService.showGoToast(data.message, 2000,"login",null);
                         }
                    }
                    else{
                        // if(CommonService.getStorageItem($rootScope.AgentCacheName)!=undefined){
                        //     CommonService.removeStorageItem($rootScope.AgentCacheName);
                        // }
                        // CommonService.setStorageItem($rootScope.AgentCacheName,JSON.stringify(agentModel));
                        CommonService.showToast(data.message, 2000);
                    }
            },function(error){
                $ionicLoading.hide();
            });
        }
    }])
    //代理人激活帐号，申请进度
    .controller('AgentActivateCtrl',['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading','$cordovaBarcodeScanner','CommonService', 'AgentService','UtilService',function($rootScope, $scope, $state, $stateParams, $ionicLoading,$cordovaBarcodeScanner,CommonService, AgentService,UtilService) {
        $scope.wagtId=$rootScope.agentUser;
        //扫码激活
        $scope.activate=function(){
            if (window.cordova) {
                $cordovaBarcodeScanner.scan().then(function(imageData) {
                    var value = imageData.text;
                    if (imageData.cancelled == true) {

                    } else if ('' == value) {
                        CommonService.showToast('扫码失败，请重新扫码！', 2000);
                    } else {
                        $ionicLoading.show();
                        AgentService.saveAgentActivate({'isActivate':1,'isAgreement': 1,'qrCode':value,'wagtId':$scope.wagtId}, function(data) {
                            if (data != null && data.result==true) {
                                CommonService.showGoToast(data.message, 2000, 'login', {});
                            }else{
                                CommonService.showToast(data.message, 2000);
                            }
                        },function(error){
                            $ionicLoading.hide();
                        });
                    }
                }, function(error) {
                    CommonService.showToast('扫码出错，请重新扫码！', 2000);
                });
            }
        }

        $scope.applyProgress={
            name:'',
            ident:'',
            status:-100,
            createTime:'',
            updateTime:'',
            reviewStatus:-100,
            remark:'',
            agentId:0
        }

        $scope.isShow=false;

        //代理人申请查看进度
        $scope.viewApplyProgress=function(applyProgress){

            if(UtilService.isNull(applyProgress.name)){
                CommonService.showToast('请输入姓名!', 2000);
                return;
            }else if(UtilService.isName(applyProgress.name)){
                CommonService.showToast('姓名格式不正确!', 2000);
                return;
            }

            var checkIDCard=UtilService.isIdent(applyProgress.ident);
            if(checkIDCard.flag==false){
                CommonService.showToast(checkIDCard.error, 2000);
                return;
            }
            $scope.isShow=true;

            $ionicLoading.show();
            AgentService.getApplyProgress(applyProgress, function(data) {    
            	console.log(data);
                if (data != null && data.result==true) {
                    $scope.applyProgress.status=data.data.status;
                    $scope.applyProgress.reviewStatus=data.data.reviewStatus;
                    $scope.applyProgress.createTime=data.data.createTime;
                    $scope.applyProgress.updateTime=data.data.updateTime;
                    $scope.applyProgress.agentId=data.data.agentId;
                    $rootScope.agentUser=data.data.agentId;
                    $scope.applyProgress.remark=data.data.remark;
                    $scope.applyProgress.isActivate=data.data.isActivate;
                    $ionicLoading.hide();
                    //CommonService.showToast(data.message, 2000);
                }else{
                	$ionicLoading.hide();
                    $scope.applyProgress.status=-100;
                    CommonService.showToast(data.message, 2000);
                }
            },function(error){
                $ionicLoading.hide();
            });
        }

        //修改代理信息
        $scope.updateAgentInfo=function(name,agentId){
            var par={'name':name,'progressId':agentId};
            //console.log(par);
            $state.go('agentInfo', { 'par': JSON.stringify(par)});
        };
        $scope.goActivate =function(){ //激活账号
        	$state.go('agentActivate');
        }
    }])
    //代理人银行卡管理
    .controller('AgentBanksCtrl',['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading','$ionicPopup','$timeout','CommonService', 'AgentService','UtilService','InterviewService',function($rootScope, $scope, $state, $stateParams, $ionicLoading,$ionicPopup,$timeout,CommonService, AgentService,UtilService,InterviewService) {
        $scope.isSx=$stateParams.isSx;
        $scope.banksList=[];
        //$scope.selectBankVal ='';

        $scope.getMyBanks=function(){//获取银行卡列表
            $ionicLoading.show();
            AgentService.getMyBanks({'wagtId':0}, function(data) {
                //console.log(data);
                if (data != null && data.result==true) {
                    $scope.banksList=data.data.list;
                    $ionicLoading.hide();
                }else{
                    CommonService.showToast(data.message, 2000);
                }
            },function(error){
                $ionicLoading.hide();
            });
        }

        $scope.getMyBanks();

        $scope.delBank=function(bankId){
            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>删除银行卡?</strong>',
                template: '你确定要将该卡删除?',
                okText: '确定',
                cancelText: '取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $ionicLoading.show();
                    AgentService.deleteMyBanksById({'bankId':bankId}, function(data) {

                        if (data != null && data.result==true) {
                            $scope.getMyBanks();
                            CommonService.showToast(data.message,2000);
                        }else{
                            CommonService.showToast(data.message, 2000);
                        }
                    },function(error){
                        $ionicLoading.hide();
                    });
                }
            });
        }

        $scope.setDefalutBank=function(bankId,isDefault){//设置默认银行卡
            if(isDefault==1)
                return;

            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>设置默认银行卡?</strong>',
                template: '你确定要将该卡设置默认?',
                okText: '确定',
                cancelText: '取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $ionicLoading.show();
                    AgentService.setDefalutBank({'bankId':bankId,'wagtId':0}, function(data) {

                        if (data != null && data.result==true) {
                            $scope.getMyBanks();
                            CommonService.showToast(data.message,2000);
                        }else{
                            CommonService.showToast(data.message, 2000);
                        }
                    },function(error){
                        $ionicLoading.hide();
                    });
                }
            });
        }

        $scope.doRefresh=function(){
            $scope.banksList=[];
            $scope.getMyBanks();
            $timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
				}, 200);
        }

        $scope.addBank=function(url){
            $state.go(url,{'isSx':Math.random()*10});
        }
    }])
    //代理人添加银行卡
    .controller('AgentAddBankCtrl',['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading','$ionicPopup','CommonService', 'AgentService','UtilService','InterviewService',function($rootScope, $scope, $state, $stateParams, $ionicLoading,$ionicPopup,CommonService, AgentService,UtilService,InterviewService) {
        
        $scope.bankModel={'bankCode':'','bankName':'','bankNo':'','isDefault':0,'name':$rootScope.userName,'phone':'','wagtId':0};
        $scope.selectBankVal='';
        
        $scope.bindBanks=function()//绑定开户行
        {
            if(CommonService.getStorageItem('Banks')!=null && CommonService.getStorageItem('Banks')!=undefined)
            {
                var data=JSON.parse(CommonService.getStorageItem('Banks'));
                $scope.bankList=data;
            }
            else
            {
                CommonService.removeStorageItem('Banks');
                $ionicLoading.show();
                InterviewService.getBanks(null, function(data) {
                    //console.log(data);
                    if (data != null && data.data.list != null) {
                        CommonService.setStorageItem('Banks',JSON.stringify(data.data.list));
                        $scope.bankList = data.data.list;
                    }
                    $ionicLoading.hide();
                },function(error){
                    $ionicLoading.hide();
                });
            }
            //$scope.selectBankVal = $scope.bankList[0];
        }   
        $scope.bindBanks();

        $scope.selectBank=function(n){
            $scope.bankModel.bankCode=n.bankCode;
            $scope.bankModel.bankName=n.bankName;
        }

        //格式化银行卡号
        $scope.initBankNo=function(){
            var bankNo=$scope.bankModel.bankNo.replace(/\s+/g,"");

            if(event.keyCode==8)
                return;
            if(bankNo.length%4==0)
                $scope.bankModel.bankNo+=' ';
        }

        $scope.addBankInfo=function(bankModel){//添加银行卡

            if(UtilService.isNull(bankModel.name)){
                CommonService.showToast('请输入开户姓名!', 2000);
                return;
            }else if(UtilService.isName(bankModel.name)){
                CommonService.showToast('开户姓名格式不正确!', 2000);
                return;
            }

            if(UtilService.isNull(bankModel.phone)){
                CommonService.showToast('请输入开户手机号码!', 2000);
                return;
            }
            else if(UtilService.isMobile(bankModel.phone)){
                CommonService.showToast('开户手机号码格式不正确!', 2000);
                return;
            }
            if(UtilService.isNull(bankModel.bankCode)){
                CommonService.showToast('请选择开户行!', 2000);
                return;
            }

            bankModel.bankNo=bankModel.bankNo.replace(/\s+/g,"");

            if(UtilService.isNull(bankModel.bankNo)){
                CommonService.showToast('请输入银行卡号!', 2000);
                return;
            }else if(UtilService.isBankNo(bankModel.bankNo)){
                CommonService.showToast('银行卡号格式不正确!', 2000);
                return;
            }

            if(bankModel.isDefault==false){
                bankModel.isDefault=0;
            }else{
                bankModel.isDefault=1;
            }

            $ionicLoading.show();
            AgentService.saveBankInfo(bankModel, function(data) {
                if (data != null && data.result==true) {
                    bankModel.name='';
                    bankModel.phone='';
                    bankModel.bankCode='';
                    bankModel.bankNo='';
                    
                    CommonService.showGoToast(data.message,2000,'app.agentBanks',{'isSx':Math.random()*10});
                }else{
                    CommonService.showToast(data.message, 2000);
                }
            },function(error){
                $ionicLoading.hide();
            });
        }
    }])
    .controller('agreementCtrl', ['$rootScope','$scope','$state','$ionicLoading','$stateParams','AgentService', 'CommonService','UtilService',function($rootScope, $scope,$state,$ionicLoading,$stateParams, AgentService, CommonService,UtilService) {
			$scope.userInfo = JSON.parse($stateParams.parm);

            $scope.isActivate=false;

            $scope.saveAgr=function(val){

                if(val==false){
                    CommonService.showToast('请选中代理人协议!', 2000);
                    return;
                }else{
                    $state.go('agentActivate');
                }
            }
    }]); 
});
