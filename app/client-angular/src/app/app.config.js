(function () {
  'use strict';

    angular.module('tsApp.config', [])
        .constant('AppConfig', {
            API: {
                SIGN_IN: '/login',
                USER_PROFILE: '/profile'
            },
            ROUTE: {
                USER: '/dashboard',
                NO_USER: '/login'
            },
            HEADER: {
                COMMON: 'X-Requested-With',
                CONTENT_TYPE: 'application/json',
                TOKEN: '__authToken',
                AUTHORIZATION: 'X-Auth-Token'
            },
            BROADCAST: {
                USER_LOGIN: 'user:login',
                USER_LOGOUT: 'user:logout',
                GLOBAL_ERROR: 'global:error'
            }
    });
})();
