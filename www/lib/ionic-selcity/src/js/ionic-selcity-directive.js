/**
 * Created by WillJiang on 08/12/2016.
 */
angular.module('ionic-selcity',['ionic'])
  .directive('hmsPctSelect',[function () {
    var TAG = 'hmsPCTSelectDirective';
    return {
      restrict: 'EA',
      scope: {
        default: '=defaultdata'
      },     
      replace: false,
      transclude: false,
      template: '<div class="col" style="font-size: 14px;" ng-click="toSetDefaultPosition();">{{selectedAddress.province==null ||selectedAddress.province==""?"请选择地址":selectedAddress.province+"-"+selectedAddress.city+"-"+selectedAddress.region}}</div>' ,
      controller: function ($scope, $element, $attrs, $ionicModal, $http, $ionicSlideBoxDelegate, $timeout, $rootScope, $ionicScrollDelegate) {
        var selectedAddress = {};

        var addressData;
        $scope.$onInit = function () {
          selectedAddress = {};
          $scope.selectedAddress = {};
          $http.post('http://walletapi.giveu.cn/api/Common/GetAllAreas').success(function (res) {
            addressData = res.data;
            $scope.provincesData = addressData['province'];
          }).error(function (err) {
            console.log('area_datas err = ' + angular.toJson(err));
          });

         // $scope.provincesData=CityService['privce']
          $ionicModal.fromTemplateUrl('lib/ionic-selcity/src/templates/ionic-selcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.PCTModal = modal;
          })
        };
        $scope.$onInit();
        
        $scope.lockSlide = function () {
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').enableSlide(false);
        };

        $scope.$watch('default', function (newValue) {
          if (newValue) {
            $scope.selectedAddress = newValue;
          }
        });

        $scope.toSetDefaultPosition = function () {
          $scope.showBackBtn = false;
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').slide(0);
          $ionicScrollDelegate.$getByHandle('PCTSelectProvince').scrollTop();
          $scope.PCTModal.show();
        };

        //选择省
        $scope.chooseProvince = function (selectedProvince) {
        
          selectedAddress = {};
          $scope.showBackBtn = true;
          angular.forEach($scope.provincesData, function (item, index) {
            if (item.name === selectedProvince) {
              $scope.citiesData = item["city"];
              return;
            }
          });

          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').next();
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').update();
          $ionicScrollDelegate.$getByHandle('PCTSelectCity').scrollTop();
          selectedAddress.province = selectedProvince;
        };

        //选择市
        $scope.chooseCity = function (selectedCity) {
          var selectedCityIndex;

          angular.forEach($scope.citiesData, function (item, index) {
            if (item.name === selectedCity) {
              $scope.region = item["region"];
              return;
            }
          });

          selectedAddress.city = selectedCity;
          if (!$scope.region) {
            selectedAddress.region = '';
            $scope.selectedAddress = selectedAddress;

            $rootScope.$broadcast('Pselect_Address', {result: $scope.selectedAddress});

            $timeout(function () {
              $scope.PCTModal.hide();
            }, 200);
          }else{
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').next();
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').update();
            $ionicScrollDelegate.$getByHandle('PCTSelectTown').scrollTop();
          }
        };

        //选择县
        $scope.chooseTown = function (selectedTown) {
          selectedAddress.region = selectedTown;
          $scope.selectedAddress = selectedAddress;
          $rootScope.$broadcast('Pselect_Address', {result: $scope.selectedAddress});

          $timeout(function () {
            $scope.PCTModal.hide();
          }, 200);
        };

        //slide返回上一级
        $scope.goBackSlide = function () {
          var currentIndex = $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').currentIndex();
          if (currentIndex > 0) {
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').previous();
          }
          if (currentIndex === 1) {
            $scope.showBackBtn = false;
          }
        };

        $scope.$on('$destroy', function () {
          $scope.PCTModal.remove();
        });
      }
    };
  }])
