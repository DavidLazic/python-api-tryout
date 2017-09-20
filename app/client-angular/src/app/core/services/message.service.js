(function () {
    'use strict';

    angular.module('tsApp.service.message', [])
    .factory('MessageService', MessageService)
    .constant('MessageConfig', {
        LOGIN: {
            error: 'Incorrect username or password.'
        },
        RESET_PASSWORD: {
            success: 'Reset email has been sent.',
            error: 'Invalid email.'
        },
        PAYMENT_ACCOUNT: {
            success: 'Payment account created.',
            error: 'Please recheck account information.',
            update: 'Payment account updated.'
        },
        REGISTER: {
            success: 'We will send you activation link via email shortly.',
            error: 'You have already registered with this email.'
        }
    });

    MessageService.$inject = ['MessageConfig'];
    function MessageService (MessageConfig) {

        var messagesConfig = {
                success: {
                    text: '',
                    enabled: true
                },
                error: {
                    text: '',
                    enabled: true
                },
                update: {
                    text: '',
                    enabled: true
                }
            };

        /**
         * @description
         * Wrapper for generating custom message config.
         *
         * @param  {String} type
         * @return {Object}
         * @public
         */
        function getMessage (type) {
            var _message = {};

            (type) ?
                (_message[type] = angular.copy(messagesConfig[type])) :
                _message = angular.copy(messagesConfig);

            return function (subtype) {
                if (type) {
                    MessageConfig[subtype][type] && (_message[type].text = MessageConfig[subtype][type]);
                } else {
                    for (var key in _message) {
                        if (_message.hasOwnProperty(key)) {
                            _message[key].text = MessageConfig[subtype][key];
                        }
                    }
                }

                return _message;
            }
        }

        return {
            getMessage: getMessage
        };
    }

})();
