(function () {
    'use strict';

    angular.module('tsApp.service.userAuth', [
        'tsApp.service.httpRequest',
        'tsApp.service.utility',
        'tsApp.service.message',
        'tsApp.config'
    ]).factory('UserService', UserService);

    UserService.$inject = ['$rootScope', '$interval', '$http', '$q', '$location', 'HttpRequestService', 'MessageService', 'UtilityService', 'AppConfig'];
    function UserService ($rootScope, $interval, $http, $q, $location, HttpRequestService, MessageService, UtilityService, AppConfig) {

        var currentUser = {};
        var userFetching = false;

        /**
         * @description
         * Login user.
         *
         * @param  {Object} _cfg
         * @return {Bool}
         * @public
         */
        function login (_cfg) {
            _removeAuthToken();

            var params = {
                    url: AppConfig.API.SIGN_IN,
                    data: _cfg,
                    messages: MessageService.getMessage('error')('LOGIN')
                };

            return HttpRequestService.post(params).then(function (response) {
                if (response.message === 'SUCCESS') {
                    _setAuthToken('PHOTOGRAPHER:' + response.data.token);
                    angular.extend(currentUser, response.data.user);
                    _setHeaders();

                    $rootScope.$broadcast(AppConfig.BROADCAST.USER_LOGIN, currentUser);
                    $location.path(AppConfig.ROUTE.USER);
                }
                return _userAuthenticated();
            }).catch(function (e) {
                return e;
            });
        }

        /**
         * @description
         * Register user fn.
         *
         * @param  {Object} data
         * @return {Object}
         * @public
         */
        function register (data) {
            var params = {
                    url: AppConfig.API.SIGN_UP,
                    data: data,
                    messages: MessageService.getMessage()('REGISTER')
                };

            return HttpRequestService.post(params).then(function (response) {
                return response;
            });
        }

        /**
         * @description
         * Logout user.
         *
         * @return {Object}
         * @public
         */
        function logout () {
            var params = {
                    url: AppConfig.API.SIGN_OUT,
                    data: {
                        token: _getAuthToken()
                    }
                };

            return HttpRequestService.get(params).then(function (response) {
                if (response) {
                    currentUser = {};
                    _removeAuthToken();
                    $location.path(AppConfig.ROUTE.NO_USER);
                }
            });
        }

        /**
         * @description
         * Ping current user.
         *
         * @return {Object}
         * @public
         */
        function pingUser () {
            if (!_userAuthenticated()) {

                if (userFetching) {
                    return _resolveUserFetch();
                }

                userFetching = true;
                return _getUserData({type: 'USER_PROFILE'}, function () {
                    return $q.when(angular.copy(currentUser));
                });
            }

            return $q.when(angular.copy(currentUser));
        }

        /**
         * @description
         * Get current user on manual page refresh.
         *
         * @param {Object} params
         * @return {Object}
         * @private
         */
        function _getUserData (params, cb) {
            return HttpRequestService.get({url: AppConfig.API[params.type]}).then(function (response) {
                userFetching = false;

                if (!response) {
                    return $q.reject('No User');
                }

                angular.extend(currentUser, response);
                _setHeaders();
                return cb && cb(currentUser);
            });
        }

        /**
         * @description
         * Set common request headers.
         *
         * @private
         */
        function _setHeaders () {
            $http.defaults.headers.common[AppConfig.HEADER.AUTHORIZATION] = _getAuthToken();
        }

        /**
         * @description
         * Resolve async user fetch to only one fetch request.
         *
         * @return {Object}
         * @private
         */
        function _resolveUserFetch () {
            return $q.when((function () {
                var defer = $q.defer();

                var interval = $interval(function () {
                    if (!UtilityService.isEmpty(currentUser)) {
                        $interval.cancel(interval);
                        defer.resolve(currentUser);
                    }
                }, 100);

                return defer.promise;
            })());
        }

        /**
         * @description
         * Check if user is authenticated.
         *
         * @return {Bool}
         * @private
         */
        function _userAuthenticated () {
            return (!UtilityService.isEmpty(currentUser) && angular.isDefined(localStorage[AppConfig.HEADER.TOKEN]));
        }

        /**
         * @description
         * Check storage on manual page refresh.
         *
         * @return {String}
         * @private
         */
        function _getAuthToken () {
            return localStorage.getItem(AppConfig.HEADER.TOKEN);
        }

        /**
         * @description
         * Remove previous auth token.
         *
         * @private
         */
        function _removeAuthToken () {
            localStorage.removeItem(AppConfig.HEADER.TOKEN);
        }

        /**
         * @description
         * Set auth token.
         *
         * @param {String} token - current user token.
         * @private
         */
        function _setAuthToken (token) {
            localStorage.setItem(AppConfig.HEADER.TOKEN, token);
        }

        /**
         * @description
         * UserService API
         *
         * @public
         */
        return {
            login: login,
            register: register,
            logout: logout,
            pingUser: pingUser
        };
    }
})();
