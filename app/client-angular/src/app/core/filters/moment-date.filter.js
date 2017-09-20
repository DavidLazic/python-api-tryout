(function() {
    'use strict';

    var momentFilter = angular.module('zoom.filter.momentDate', []);

    momentFilter.constant('MomentConfig', {
        calendar: {
            sameDay: '[Today], h:mma',
            nextDay: '[Tomorrow], h:mma',
            nextWeek: 'MMMM D, h:mma',
            lastDay: '[Yesterday], h:mma',
            lastWeek: '[Last] dddd, h:mma',
            sameElse: 'MMMM D, h:mma'
        }
    });

    momentFilter.filter('momentDate', function (moment, MomentConfig) {

        /**
         * @description
         * Format date in MomentJS calendar style.
         *
         * @param  {String} date
         * @return {String}
         * @public
         */
        return function (date) {
            return date && moment(moment.utc(date)).local().calendar(null, MomentConfig.calendar);
        };
    });
})();