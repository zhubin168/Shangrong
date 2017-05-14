require.config({
    baseUrl: 'app',
    paths: {
        'ionic': '../lib/ionic/js/ionic.bundle.min',
        'ngCordova': '../lib/ngCordova/dist/ng-cordova',
        'ocLazyLoad': '../lib/ocLazyLoad/dist/ocLazyLoad',
        'angularAMD': '../lib/angularAMD/angularAMD.min', 
        'angular': '../lib/ionic/js/angular/angular',
        'lazy-image': '../lib/angular-lazy-image/lazy-image',
        'angularCss': '../lib/angular-css/angular-css.min',
        'bindonce':'../lib/angular-bindonce/bindonce.min',
        'localStorageUsage':'../lib/ng-localStorage/localStorageUsage.min',
        'jquery':'../lib/jquery/jquery-1.6.4.min',
        //'jquery-signalR':'../lib/signalr/jquery.signalR.min',
        'signalR':'../lib/jquery/jquery.signalR-2.2.1.min',
        'tooltips':'../lib/angular-tooltips-master/angular-tooltips',
        'identCheck':'../lib/ng-identCheck/identCheck.min',
//      'citypicker':'../lib/citypicker/src/js/ionic-citypicker',
        'selcity':'../lib/ionic-selcity/src/js/ionic-selcity-directive'
        //'signalR':'../lib/angular-signalr/angular-signalr.min'
    },
    shim: {
        'angularCss': ['angular'],
        'ocLazyLoad': ['angular'],
        "angular": { exports: "angular" },
        'ngCordova': ['angular'],
        'lazy-image': ['angular'],
        'bindonce': ['angular'],
        'localStorageUsage':['angular'],
        'identCheck':['angular'],
        //'jquery':['jquery'],
        'signalR':['jquery'],
        'tooltips':['angular'],
        'angular-md5':['angular'],
//      'citypicker':['angular'],
        'selcity':['angular']
    },
    deps: ['app']
});
