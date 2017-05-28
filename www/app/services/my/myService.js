/**
 * Created by tianxc on 16-9-26.
 */
define([
    'app'
], function(app) {
    'use strict';

    app.factory('MyService',['$http','CommonService',function($http,CommonService) {
        return {
            GetOAuth: function(par,callback,callbackError) { //认证
                CommonService.getJsonData('api/AppHome/oAuth', par).then(function(data) {
                    callback(data);
                },function(error){
                    callbackError(error);
                });
            }    	
        }
    }]);
});
