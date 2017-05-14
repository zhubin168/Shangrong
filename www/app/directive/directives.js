/**
 * Created by tianxc on 16-8-3.
 */
define(['angular'], function(angular) {

    var directives = angular.module('app.directives', []);

    //延迟滚动
    directives.directive('lazyScroll', ['$rootScope', '$timeout',
            function($rootScope, $timeout) {
                return {
                    restrict: 'A',
                    link: function($scope, $element) {
                        var scrollTimeoutId = 0;
                        $scope.invoke = function() {
                            $rootScope.$broadcast('lazyScrollEvent');
                        };
                        $element.bind('scroll', function() {
                            $timeout.cancel(scrollTimeoutId);

                            scrollTimeoutId = $timeout($scope.invoke, 0);
                        });
                    }
                };
            }
        ])
        //图片延迟加载
        .directive('lazySrc', ['$document', '$timeout',
            function($document, $timeout) {
                return {
                    restrict: 'A',
                    link: function($scope, $element, $attributes) {
                        var deregistration = $scope.$on('lazyScrollEvent', function() {
                            //console.log('scroll');
                            if (isInView()) {
                                $element[0].src = $attributes.lazySrc;
                                deregistration();
                            }
                        });

                        function isInView() {
                            var clientHeight = $document[0].documentElement.clientHeight;
                            var clientWidth = $document[0].documentElement.clientWidth;
                            var imageRect = $element[0].getBoundingClientRect();
                            return (imageRect.top >= 0 && imageRect.bottom <= clientHeight) && (imageRect.left >= 0 && imageRect.right <= clientWidth);
                        }

                        $element.on('$destroy', function() {
                            deregistration();
                        });

                        $timeout(function() {
                            if (isInView()) {
                                $element[0].src = $attributes.lazySrc;
                                deregistration();
                            }
                        }, 500);
                    }
                };
            }
        ])
        //验证手机号码
        .directive('validationMobile', [function() {
            return {
                require: "ngModel",
                link: function(scope, element, attr, ngModel) {
                    if (ngModel) {
                        var mobileReg = /^((13[0-9])|(14[5|7])|(17[0-9])|(15([0-3]|[5-9]))|(18[0,2,3,5-9]))\\d{8}$/i;
                    }
                    var customValidator = function(value) {
                        var validity = ngModel.$isEmpty(value) || !mobileReg.test(value);
                        ngModel.$setValidity("validationMobile", validity);
                        return validity ? value : undefined;
                    };
                    ngModel.$formatters.push(customValidator);
                    ngModel.$parsers.push(customValidator);
                }
            };
        }])
        //设置默认图片
        .directive('errSrc', ['$rootScope', function($rootScope) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind('error', function() {
                        if (attrs.src != attrs.errSrc) {
                            attrs.$set('src', attrs.errSrc);
                        }
                    });
                }
            };
        }])
        //数字滚动效果
        .directive('countUp', ['$interval', function($interval) {
                return {
                    restrict: 'AE',
                    scope: {
                        value: '=ngModel',
                    },
                    controller: [ '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                        var count,
                            steps = parseInt($attrs.steps, 10) || 10,
                            time = parseInt($attrs.time, 10) || 1000,
                            after = $attrs.after || "",
                            before = $attrs.before || "",
                            decimals = parseInt($attrs.decimals, 10) || 0;

                        var changing = function(newVal, oldVal) {
                            $interval.cancel(count);

                            newVal = (newVal) ? parseFloat(newVal).toFixed(decimals) : 0;
                            oldVal = (typeof oldVal !== 'undefined') ? oldVal : newVal;

                            var step = 0;
                            count = $interval(function() {
                                step++;
                                
                                var result = oldVal + ((newVal - oldVal) / steps * step);
                                result = parseFloat(result).toFixed(decimals);
                                
                                $element.html(before + result + after);
                            }, time / steps, steps);
                        }

                        $scope.$watch('value', changing);
                    }]
                };
        }])
        //暂无数据提示
        .directive('noData', function() {
            return {
                restrict: 'E',
                template: '<div class="padding text-center ub ub-ver" style="margin-top:38%;"><img width="120" src="./img/account/noData.png"/><h4 class="sub-ft" style="color:#abaaaa;">即有分期,让爱不在等待!</h4></div>',
                replace: true
            };
        })
        //隐藏底部导航
        .directive('hideTabs', ['$rootScope', function($rootScope) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    scope.$on('$ionicView.enter', function() {
                        scope.$watch(attrs.hideTabs, function(value) {
                            if (value == true)
                                $rootScope.hideTabs = 'tabs-item-hide';
                            else
                                $rootScope.hideTabs = '';
                        });
                    });

                    scope.$on('$ionicView.beforeEnter', function() {
                        scope.$watch(attrs.hideTabs, function(value) {
                            if (value == true)
                                $rootScope.hideTabs = 'tabs-item-hide';
                            else
                                $rootScope.hideTabs = '';
                        });
                    });

                    scope.$on('$ionicView.beforeLeave', function() {
                        scope.$watch(attrs.hideTabs, function(value) {
                            //alert('value='+value);

                            if (value == true)
                                $rootScope.hideTabs = 'tabs-item-hide';
                            else
                                $rootScope.hideTabs = '';
                        });
                        scope.$watch('$destroy', function() {
                            $rootScope.hideTabs = false;
                        })

                    });
                }
            };
        }]);

    return directives;
});
