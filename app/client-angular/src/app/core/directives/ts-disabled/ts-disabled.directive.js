(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name tsApp.tsDisabled
     */
    var tsDisabledModule = angular.module('tsApp.directive.tsDisabled', []);

    /**
     * @ngdoc directive
     * @name  tsApp.tsDisabled
     * @restrict A
     *
     * @description
     * tsDisabled directive.
     *
     * @example
     * <div ts-disabled></div>
     */
    tsDisabledModule.directive('tsDisabled', tsDisabled);

    tsDisabled.$inject = ['$http'];
    function tsDisabled($http) {
        return {
            restrict: 'A',
            scope: {
                disabled: '=?'
            },
            link: function (scope, elem) {
                var isDisabled = scope.disabled || false;

                scope.$watchCollection(function () {
                    return [$http.pendingRequests.length, scope.disabled];
                }, function (values) {
                    isDisabled = values[1] || false;

                    (angular.equals(values[0], 0) && !isDisabled) ?
                        elem.attr('disabled', false) :
                        elem.attr('disabled', true);
                });

                scope.$on('$destroy', function () {
                    elem.off();
                });
            }
        };
    }
})();
