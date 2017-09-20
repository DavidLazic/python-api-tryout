(function () {
    'use strict';

    angular.module('tsApp', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ui.bootstrap',
        'ui.router',
        'angularMoment',
        'xeditable',

        // config
        'tsApp.env',
        'tsApp.config',

        // main modules
        'tsApp.app',
        'tsApp.login',

        // services
        'tsApp.service.httpRequest',
        'tsApp.service.httpInterceptor',
        'tsApp.service.userAuth',
        'tsApp.service.notifications',
        'tsApp.service.utility',
        'tsApp.service.message',
        'tsApp.service.confirmation',

        // filters

        // directives
        'tsApp.directive.tsNavigation',
        'tsApp.directive.tsLoader',
        'tsApp.tsToggle',
        'tsApp.directive.tsDisabled'
    ]).config(function ($urlRouterProvider, $compileProvider, AppConfig) {
        $urlRouterProvider.otherwise(AppConfig.ROUTE.USER);
        $compileProvider.debugInfoEnabled(false);
    }).run(AppRun);

    AppRun.$inject = ['$rootScope', '$http', 'editableOptions', '$location', 'AppConfig'];
    function AppRun ($rootScope, $http, editableOptions, $location, AppConfig) {
        editableOptions.theme = 'bs3';
        localStorage.setItem('__authToken', 'f7ba5bd75cad4955afcd897fcc0ea198'); //REMOVE

        // Enable CORS
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common[AppConfig.HEADER.COMMON];

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, rejection) {
            if (rejection === 'No User') {
                $location.path(AppConfig.ROUTE.NO_USER);
                $rootScope.$broadcast(AppConfig.BROADCAST.USER_LOGOUT);
            }
        });
    }
})();
