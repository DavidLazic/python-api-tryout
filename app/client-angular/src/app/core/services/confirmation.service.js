(function () {
    'use strict';

    var confirmationModule = angular.module('tsApp.service.confirmation', [
            'ui.bootstrap'
        ]);

    confirmationModule.controller('ConfirmationController', ConfirmationController);

    ConfirmationController.$inject = ['model', '$modalInstance'];
    function ConfirmationController (model, $modalInstance) {
        var vm = this;

        // view model
        vm.title = model.title || 'Confirmation';
        vm.message = model.message || 'Apply changes?';

        // events
        vm.onAccept = onAccept;
        vm.onCancel = onCancel;

        /**
         * @description
         * On accept fn.
         *
         * @return {Object}
         * @public
         */
        function onAccept () {
            $modalInstance.close({});
        }

        /**
         * @description
         * On cancel fn.
         *
         * @return void
         * @public
         */
        function onCancel () {
            $modalInstance.dismiss('cancel');
        }
    }

    confirmationModule.factory('confirmationDialog', confirmationDialog);

    confirmationDialog.$inject = ['$modal'];
    function confirmationDialog ($modal) {

        /**
         * @description
         * On confirm fn.
         *
         * @param  {String} title
         * @param  {String} message
         * @return void
         * @public
         */
        function onConfirm (title, message) {
            var modalInstance = $modal.open({
                keyboard: false,
                backdrop: 'static',
                template:   '<div class="confirm">' +
                                '<h4 class="confirm__title" ng-bind="::cctrl.title"></h4>' +
                                '<p class="confirm__text" ng-bind-html="::cctrl.message"></p>' +
                                '<div>' +
                                    '<button ng-click="cctrl.onAccept()" class="confirm__btn-confirm ts__btn ts__btn--orange">Confirm</button>' +
                                    '<i ng-click="cctrl.onCancel()" class="ts__btn ts__btn--close"></i>' +
                                '</div>' +
                            '</div>',
                controller: 'ConfirmationController',
                controllerAs: 'cctrl',
                windowClass: '',
                size: 'md',
                resolve: {
                    model: function () {
                        return {
                            title: title,
                            message: message
                        };
                    }
                }
            });

            return modalInstance.result;
        }

        /**
         * @description
         * Confirmation dialog API.
         *
         * @public
         */
        return {
            onConfirm: onConfirm
        };
    }
})();
