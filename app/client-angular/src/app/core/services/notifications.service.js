(function () {
    'use strict';

    angular.module('tsApp.service.notifications', [])
        .provider('NotificationService', NotificationService);

    function NotificationService () {
        var defaults = {
                timeout: 4700
            };

        return {
            $get: function ($document, $timeout) {
                var wrapper = angular.element('<div class="notification__wrapper"></div>');
                $document.find('body').append(wrapper);

                /**
                 * @description
                 * Notification constructor fn.
                 *
                 * @param {Object} config
                 * @param {String} type
                 * @public
                 */
                function Notification (config, type) {
                    this.template = angular.element('<div class="notification ' + type + '">' + config.message + '</div>');
                }

                /**
                 * @description
                 * Show notification.
                 *
                 * @public
                 */
                Notification.prototype.show = function () {
                    var _this = this;

                    wrapper.append(this.template);
                    var timeout = $timeout(function () {
                            _this.template.remove();
                            $timeout.cancel(timeout);
                        }, defaults.timeout);
                };

                /**
                 * @description
                 * Get new notification instance.
                 *
                 * @param  {Object} params
                 * @return {Object}
                 * @private
                 */
                function _getInstance (params, type) {
                    return new Notification(params, type);
                }

                /**
                 * @description
                 * Notification service API.
                 *
                 * @public
                 */
                return {
                    success: function (param) {
                        return _getInstance(param, 'notification--success').show();
                    },
                    warning: function (param) {
                        return _getInstance(param, 'notification--warning').show();
                    },
                    error: function (param) {
                        return _getInstance(param, 'notification--error').show();
                    }
                };
            }
        };
    }

})();
