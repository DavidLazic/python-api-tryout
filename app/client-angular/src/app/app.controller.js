(function () {
    'use strict';

    angular.module('tsApp.app', [
        'ui.bootstrap',
        'tsApp.config',
        'tsApp.service.userAuth'
    ]).controller('AppController', AppController);

    AppController.$inject = ['$scope', '$log', 'UserService', 'AppConfig'];
    function AppController($scope, $log, UserService, AppConfig) {
        var vm = this;

        // view model
        vm.user = null;
        vm.httpActive = false;

        // events
        vm.onLogout = onLogout;

        /**
         * @description
         * On logout fn.
         *
         * @return {}
         * @public
         */
        function onLogout () {
            $log.debug('User logout event ', event);
            vm.user = null;
            UserService.logout();
        }

        /**
         * @description
         * Get user again on manual page refresh.
         */
        UserService.pingUser().then(function (user) {
            vm.user = user;
        });

        /**
         * @description
         * Set user on login event.
         */
        $scope.$on(AppConfig.BROADCAST.USER_LOGIN, function (event, user) {
            $log.debug('User login event ', event);
            vm.user = user;
        });

        /**
         * @description
         * Destroy user object on logout.
         */
        $scope.$on(AppConfig.BROADCAST.USER_LOGOUT, function () {
            onLogout();
        });
    }
})();
