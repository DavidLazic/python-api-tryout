(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name tsApp.tsNavigation
     */
    var tsNavigationModule = angular.module('tsApp.directive.tsNavigation', []);

    tsNavigationModule.constant('NavigationConfig', [
        {name: 'Profile', state: 'profile', includes: 'profile'},
        {name: 'Account', state: 'account.company', includes: 'account', children: [
            {name: 'Company', state: 'account.company'},
            {name: 'Locations', state: 'account.locations'},
            {name: 'Departments', state: 'account.departments'},
            {name: 'Roles', state: 'account.roles'},
            {name: 'Users', state: 'account.users'},
            {name: 'Clients', state: 'account.clients'}
        ]},
        {name: 'Projects', state: 'projects', includes: 'projects'}
    ]);

    /**
     * @ngdoc controller
     * @name tsApp.tsNavigation.NavigationController.controller:NavigationController
     *
     * @description
     * Navigation controller.
     */
    tsNavigationModule.controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$scope', '$state', '$compile', 'NavigationConfig'];
    function NavigationController ($scope, $state, $compile, config) {
        this.config = config || {};

        /**
         * @description
         * Check if current state includes the predefined state.
         *
         * @param  {String} state
         * @return {Boolean}
         * @public
         */
        this.showWhen = function (state) {
            return $state.includes(state);
        }
    }

    /**
     * @ngdoc directive
     * @name  tsApp.tsNavigation
     * @restrict E
     *
     * @description
     * Navigation directive.
     *
     * @example
     * <ts-navigation user="Object"></ts-navigation>
     */
    tsNavigationModule.directive('tsNavigation', tsNavigation);

    tsNavigation.$inject = [];
    function tsNavigation () {
        return {
            restrict: 'E',
            scope: {
                user: '=user'
            },
            templateUrl: 'app/core/directives/ts-navigation/ts-navigation.tpl.html',
            controller: 'NavigationController',
            controllerAs: 'nCtrl',
            link: function (scope, elem) {

                scope.$on('$destroy', function () {
                    elem.off();
                });
            }
        };
    }
})();
