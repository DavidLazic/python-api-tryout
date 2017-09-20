(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name tsApp.tsLoader
     */
    var tsLoaderModule = angular.module('tsApp.directive.tsLoader', []);

    /**
     * @ngdoc controller
     * @name tsApp.tsLoader.LoaderController.controller:LoaderController
     *
     * @description
     * tsLoader controller.
     */
    tsLoaderModule.controller('LoaderController', LoaderController);

    LoaderController.$inject = ['$document'];
    function LoaderController ($document) {
        var ctrl = this;

        this.active = false;
        this.body = angular.element($document[0].body);

        /**
         * @description
         * Resolve "active" loader class.
         *
         * @param  {Integer} | requests - pending HTTP requests.
         * @return {Bool}
         * @public
         */
        this.resolveClassActive = function (requests) {
            ctrl.active = (!!requests);
            _resolveClassActive();
        };

        /**
         * @description
         * Resolve body class when loader active.
         *
         * @private
         */
        function _resolveClassActive () {
            return (ctrl.active) ? ctrl.body.addClass('loader-active') : ctrl.body.removeClass('loader-active');
        }
    }

    /**
     * @ngdoc directive
     * @name  tsApp.tsLoader
     * @restrict E
     *
     * @description
     * tsLoader directive.
     *
     * @example
     * <div ts-loader></div>
     */
    tsLoaderModule.directive('tsLoader', tsLoader);

    tsLoader.$inject = ['$http'];
    function tsLoader($http) {
        return {
            restrict: 'A',
            controller: 'LoaderController',
            controllerAs: 'lCtrl',
            link: function (scope, elem, attrs, ctrl) {
                scope.$watch(function () {
                    return $http.pendingRequests.length;
                }, ctrl.resolveClassActive);

                scope.$on('$destroy', function () {
                    elem.off();
                });
            }
        };
    }
})();
