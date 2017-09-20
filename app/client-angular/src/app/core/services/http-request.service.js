(function () {
    'use strict';

    angular.module('tsApp.service.httpRequest', [
        'tsApp.config',
        'tsApp.env',
        'tsApp.service.notifications'
    ])
    .factory('HttpRequestService', HttpRequestService)
    .constant('HttpMessages', {
        success: 'Data updated.',
        error: 'Something went wrong.'
    });

    HttpRequestService.$inject = ['$http', '$log', '$q', 'NotificationService', 'EnvConfig', 'AppConfig', 'HttpMessages'];
    function HttpRequestService ($http, $log, $q, NotificationService, EnvConfig, AppConfig, MessageConfig) {

        /**
         * @description
         * Http GET request.
         *
         * @params {Object} params
         * @return {Object}
         * @public
         */
        function httpGet (params) {
            return _doRequest('GET', params);
        }

        /**
         * @description
         * Http POST request.
         *
         * @params {Object} params
         * @return {Object}
         * @public
         */
        function httpPost (params) {
            return _doRequest('POST', params);
        }

        /**
         * @description
         * Http PATCH request.
         *
         * @param  {Object} params
         * @return {Object}
         * @public
         */
        function httpPatch (params) {
            return _doRequest('PATCH', params);
        }

        /**
         * @description
         * Http PUT request.
         *
         * @param  {Object} params
         * @return {Object}
         * @public
         */
        function httpPut (params) {
            return _doRequest('PUT', params);
        }

        /**
         * @description
         * Http DELETE request.
         *
         * @param  {Object} params
         * @return {Object}
         * @public
         */
        function httpDelete (params) {
            return _doRequest('DELETE', params);
        }

        /**
         * @description
         * Start HTTP request.
         *
         * @param  {String} method
         * @param  {Object} params
         * @return {Object}
         * @private
         */
        function _doRequest (method, params) {
            var config = _configuration(method, params.url, params.data);
            angular.extend(params, config);
            return _httpRequest(params);
        }

        /**
         * @description
         * Get HTTP config.
         *
         * @param  {String} method
         * @param  {String} url
         * @param  {Object} data
         * @return {Object}
         * @private
         */
        function _configuration (method, url, data) {
            var _url = EnvConfig.API.BASE + url;
            var config = {};

            if (method === 'GET') {
                config = _configurationGet(_url, data);
            } else {
                config = {
                    method: method,
                    url: _url,
                    data: data
                };
            }

            _includeAuthorization(config);
            return config;
        }

        /**
         * @description
         * Get HTTP config.
         *
         * @param  {String} url
         * @param  {Object} data
         * @return {Object}
         * @private
         */
        function _configurationGet (url, data) {
            var config = {
                    method: 'GET',
                    url: url
                };

            if (data) {
                angular.extend(config, {
                    transformRequest: _formPostParamTransformFn,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    params: data
                });
            }

            return config;
        }

        /**
         * @description
         * Include auth token in request header.
         *
         * @param  {Object} config
         * @private
         */
        function _includeAuthorization (config) {
            angular.extend(config, {
                headers: {
                    'X-Auth-Token': localStorage[AppConfig.HEADER.TOKEN]
                }
            });
        }

        /**
         * @description
         * Send HTTP request.
         *
         * @param  {Object} params
         * @return {Object}
         * @private
         */
        function _httpRequest (params) {
            var deferred = $q.defer();

            /**
             * @description
             * On HTTP success fn.
             *
             * @param  {Object} response
             * @return {Object}
             * @private
             */
            function _onSuccess (response) {
                _displaySuccess(params, response);
                deferred.resolve(response.data);
            }

            /**
             * @description
             * On HTTP error fn.
             *
             * @param  {Object} response
             * @return {Object}
             * @private
             */
            function _onError (response) {
                _displayError(params, response);
                deferred.reject(response.data);
            }

            /**
             * @description
             * Clean HTTP request fn.
             *
             * @return void
             * @private
             */
            function _cleanRequest () {
                deferred.promise.abort = angular.noop;
                deferred = deferred.promise = null;
            }


            // attach abort method in order to cancel request.
            deferred.promise.abort = function () {
              deferred.resolve();
            };

            $http(params)
                .then(_onSuccess)
                .catch(_onError)
                .finally(_cleanRequest);

            return deferred.promise;
        }

        /**
         * @description
         * Log HTTP response.
         *
         * @param  {Object}  data
         * @param  {Integer} status
         * @param  {Object}  config
         * @return {Object}
         * @private
         */
        function _logResponse (data, status, config) {
            $log.debug(data, status, config);
        }

        /**
         * @description
         * Transform URI.
         *
         * @param  {Object}
         * @return {String}
         * @private
         */
        function _formPostParamTransformFn (obj) {
            var str = [];

            for (var item in obj) {
                if (obj.hasOwnProperty(item)) {
                    str.push(encodeURIComponent(item) + '=' + encodeURIComponent(obj[item]));
                }

            }

            return str.join('&');
        }

        /**
         * @description
         * Check if notification messages are enabled.
         *
         * @param  {Object} obj
         * @param  {String} type
         * @return {Boolean}
         * @private
         */
        function _resolveEnabledMessages (obj, type) {
            return obj.messages && obj.messages[type] && obj.messages[type].enabled;
        }

        /**
         * @description
         * Display success notification.
         *
         * @param  {Object} params
         * @param  {Object} res
         * @return {Object}
         * @private
         */
        function _displaySuccess (params, res) {
            var successType = (params.messages && params.messages.update) && 'update' || 'success';

            _logResponse(res.data, res.status, res.config);

            if (res.config.method !== 'GET' && _resolveEnabledMessages(params, successType)) {
                return NotificationService.success({message: params.messages[successType].text ||
                       MessageConfig.success});
            }
        }

        /**
         * @description
         * Display success notification.
         *
         * @param  {Object} params
         * @param  {Object} res
         * @return {Object}
         * @private
         */
        function _displayError (params, res) {
            _logResponse(res.data, res.status, res.config);
            return _resolveEnabledMessages(params, 'error') &&
                   NotificationService.error({message: params.messages.error.text ||
                   MessageConfig.error});
        }

        /**
         * @description
         * Public HttpRequestService API.
         */
        return {
            get: httpGet,
            post: httpPost,
            patch: httpPatch,
            put: httpPut,
            delete: httpDelete
        };
    }
})();
