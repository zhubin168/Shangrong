require.config({
    baseUrl: 'app',
    paths: {
        'jquery': '../lib/jquery/jquery.min',
        'angularAMD': '../lib/angularAMD/angularAMD.min', 
        'ngload': '../lib/angularAMD/ngload.min', 
        'ui-router': '../lib/angular-ui-router/release/angular-ui-router',
        'angular': '../lib/angular/angular',
        'ngAnimate':"../lib/angular-animate/angular-animate.min",
        'ngSanitize':'../lib/angular-sanitize/angular-sanitize.min',
        'lazy-image': '../lib/angular-lazy-image/lazy-image',
        'file-upload': '../lib/ng-file-upload/ng-file-upload.min',
        'ngFile':'../lib/ng-file-upload/ng-file-upload-shim.min',
        'ui-bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'bindonce':'../lib/angular-bindonce/bindonce.min',
        'localStorageUsage':'../lib/ng-localStorage/localStorageUsage',
        'angular-loading':'../lib/angular-loading/angular-loading.min',
        'spinjs':'../lib/spinjs/spin',
        'angular-toastr':'../lib/angular-toastr/dist/angular-toastr.tpls.min',
        'angular-confirm':'../lib/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.min',
        'dateTimePicker':"../lib/datetime-picker/dist/datetime-picker",
        'angular-zh-cn':"../lib/angular-locale-zh-cn-master/angular-locale_zh-cn"
        ,'angular-ueditor':'../lib/angular-ueditor/dist/angular-ueditor.min'
    },
    shim: {
        'ui-bootstrap': ['angular'],
        'ui-router': ['angular'],
        'ngAnimate': ['angular'],
        'ngSanitize': ['angular'],
        'angularAMD':['angular'],
        'file-upload': ['angular'],
        'ngFile': ['angular'],
        "angular": { exports: "angular" },
        'lazy-image': ['angular'],
        'bindonce': ['angular'],
        'localStorageUsage':['angular'],
        'angular-loading':['angular'],
        'spinjs':['angular'],
        'angular-toastr':['angular'],
        'angular-confirm':['angular'],
        'dateTimePicker':['angular','ui-bootstrap'],
        'angular-zh-cn':['angular']
        ,'angular-ueditor':['angular']
    },
    deps: ['app']
});
