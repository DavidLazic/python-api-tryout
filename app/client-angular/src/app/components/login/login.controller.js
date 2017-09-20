(function () {
    'use strict';

    angular.module('tsApp.login.controller', [
        'ui.bootstrap',
        'tsApp.service.userAuth'
    ]).controller('LoginController', LoginController);

    LoginController.$inject = ['UserService'];
    function LoginController (UserService) {
        var vm = this;

        // view model
        vm.username = '';
        vm.password = '';

        // events
        vm.onSubmit = onSubmit;

        /**
         * @description
         * On submit fn.
         *
         * @public
         */
        function onSubmit () {
            var params = {
                    username: vm.username,
                    password: vm.password
                };

            UserService.login(params).then(function (res) {
                console.log('RES', res);
            });
        }
    }
})();
