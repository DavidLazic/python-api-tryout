(function () {
    'use strict';

    angular.module('tsApp.service.httpInterceptor', [
        'tsApp.config'
    ])
    .factory('httpInterceptor', httpInterceptor)
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);

    httpInterceptor.$inject = ['$q', '$rootScope', '$location', 'AppConfig'];
    function httpInterceptor($q, $rootScope, $location, AppConfig) {
        return {

            'request': function (config) {
                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                return $q.reject(rejection);
            },

            'response': function (response) {
                return response || $q.when(response);
            },

            'responseError': function (rejection) {
                if ([401, 404].indexOf(rejection.status) !== -1 || rejection.status === -1) {
                    $rootScope.$broadcast(AppConfig.BROADCAST.GLOBAL_ERROR);
                    $location.path(AppConfig.ROUTE.NO_USER);
                }

                return $q.reject(rejection);
            }
        };
    }
})();
