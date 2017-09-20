(function () {
    'use strict';

    angular.module('tsApp.service.utility', [])
        .service('UtilityService', UtilityService);

    UtilityService.$inject = [];
    function UtilityService () {

        /**
         * @description
         * Check if value is null.
         *
         * @param  {*} value
         * @return {Bool}
         * @public
         */
        this.isNull = function (value) {
            return value === null;
        };

        /**
         * @description
         * Check if object is empty.
         *
         * @param  {Object} item
         * @return {Bool}
         * @public
         */
        this.isEmpty = function (item) {
            return Object.keys(item).length === 0 && item.constructor === Object;
        };
    }
})();
