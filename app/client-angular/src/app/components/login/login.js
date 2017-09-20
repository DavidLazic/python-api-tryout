(function () {
    'use strict';

    angular.module('tsApp.login', [
        'ui.router',
        'tsApp.login.controller'
    ]).config(LoginRoute);

    LoginRoute.$inject = ['$stateProvider'];
    function LoginRoute($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/login/login.tpl.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
    }
})();
