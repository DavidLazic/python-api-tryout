(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name tsApp.tsToggle
     */
    var tsToggleModule = angular.module('tsApp.tsToggle', []);

    tsToggleModule.constant('tsToggleConfig', {
        id: 'tsToggleId',
        name: 'tsToggleName'
    });

    /**
     * @ngdoc directive
     * @name  tsApp.tsToggle
     * @restrict E
     *
     * @description
     * Toggle directive.
     *
     * @example
     * <ts-toggle
     *      ng-model="Bool"             @required
     *      name="String"               @optional
     *      id="String"                 @optional
     *      isDisabled="Bool"           @optional
     *      label="String"              @optional
     *      title="String"              @optional
     *      on-change="Function">       @optional
     * </ts-toggle>
     */
    tsToggleModule.directive('tsToggle', tsToggle);

    tsToggle.$inject = ['$compile', 'tsToggleConfig'];
    function tsToggle ($compile, config) {
        return {
            restrict: 'E',
            replace: true,
            require: '^ngModel',
            scope: {
                name: '@',
                id: '@',
                isDisabled: '=',
                label: '@',
                title: '@',
                onChange: '&'
            },
            template:   '<div>' +
                            '<div class="toggle__title toggle__title--clickable" ng-if="title" ng-bind="title"></div>' +
                            '<input id="id" name="name" ng-model="isChecked" class="toggle__checkbox" type="checkbox">' +
                            '<label class="toggle__label"></label>' +
                        '</div>',
            link: function (scope, element, attrs, ngModel) {

                if (!ngModel) return;

                var isDisabled = scope.isDisabled || false;
                var onToggleClick = angular.noop; // empty function if directive is disabled.

                scope.id = attrs.id || config.id;
                scope.name = attrs.name || config.name;

                // initialize 'isChecked' value.
                scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function (newValue) {
                    newValue && (scope.isChecked = !!ngModel.$viewValue);
                });

                // add label
                if (angular.isDefined(attrs.label)) {
                    var label = $compile('<span>' + attrs.label + '</span>')(scope);
                    if (isDisabled) {
                        label.addClass('disabled');
                    }
                    element.append(label);
                }

                if (!isDisabled) {
                    onToggleClick = function () {
                        scope.isChecked = !scope.isChecked;
                        ngModel.$setViewValue(scope.isChecked);

                        if (angular.isDefined(attrs.onChange)) {
                            scope.onChange();
                        }
                    };
                }

                element.on('click', onToggleClick);

                scope.$on('$destroy', function () {
                    element.off();
                });
            }
        };
    }
})();
