var app = angular.module('socialNetwork', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'ngLetterAvatar']);

app.config(['$routeProvider', '$httpProvider', '$sceDelegateProvider', 'URL',
    function ($routeProvider, $httpProvider, $sceDelegateProvider, URL) {

    $httpProvider.interceptors.push('responseObserver');
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Fix AngularJS bug
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(google|facebook)\.com(/.*)?$',
        URL + "**"
    ]);

    $routeProvider
        .when('/profile', {
            templateUrl: 'partials/profile.html',
            controller: 'profileController'
        })
        .when('/profile/:profileId', {
            templateUrl: 'partials/profile.html',
            controller: 'profileController'
        })
        .when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'usersController'
        })
        .when('/messages', {
            templateUrl: 'partials/messages.html',
            controller: 'messagesController'
        })
        .when('/messages/:profileId', {
            templateUrl: 'partials/dialog.html',
            controller: 'dialogController'
        })
        .when('/friends', {
            templateUrl: 'partials/users.html',
            controller: 'friendsController'
        })
        .when('/settings', {
            templateUrl: 'partials/settings.html',
            controller: 'settingsController'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController'
        })
        .when('/signUp', {
            templateUrl: 'partials/signup.html',
            controller: 'signUpController'
        }).when('/mysongs', {
            templateUrl: 'partials/mysongs.html',
            controller: 'mySongsController'
        }).when('/allsongs', {
            templateUrl: 'partials/allsongs.html',
            controller: 'allSongsController'
        })
        .otherwise(
            {
                redirectTo: '/profile'
            }
        )
    ;

}]);

app.factory('responseObserver', ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {

    return {
        'responseError': function (errorResponse) {

            function handleLogin() {
                if ($location.path() != "login" && $location.path() != "signUp") {
                    $rootScope.targetUrl = "#" + $location.path();
                }
                $location.path("/login");
            }

            switch (errorResponse.status) {
                case 401: handleLogin(); break;
                case 403: handleLogin(); break;
                case 419: handleLogin(); break;
                case 440: handleLogin(); break;
            }
            return $q.reject(errorResponse);
        }
    };

}]);

app.constant('URL', 'http://ec2-18-222-62-87.us-east-2.compute.amazonaws.com:8080');
// app.constant('URL', 'https://social-network-spring.herokuapp.com');