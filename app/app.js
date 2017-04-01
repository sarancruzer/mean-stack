/*
 * App definition
 */

//var app = angular.module('app', ['ngRoute','ui.router','ngResource','satellizer','ngMessages','ngValidate','ngFileUpload','nya.bootstrap.select','angular-flexslider','ui.bootstrap.modal','ngAnimate', 'vAccordion','angularMoment','ngTagsInput','summernote','ngTouch',"angucomplete-alt",'ngSlimScroll','highcharts-ng','angular.css.injector','videosharing-embed','720kb.tooltips']);
var app = angular.module('app', ['ui.router']);

//var rootUrl = location.protocol+"//"+location.hostname+"/";

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.10.0 - 2014-01-14
 * License: MIT
 */




// (function () {
//     'use strict';

//     angular
//         .module('app', ['ui.router'])
//         .config(config)
//         .run(run);

//     function config($stateProvider, $urlRouterProvider) {
//         // default route
//         $urlRouterProvider.otherwise("/");

//         $stateProvider
//             .state('home', {
//                 url: '/',
//                 templateUrl: 'home/index.html',
//                 controller: 'Home.IndexController',
//                 controllerAs: 'vm',
//                 data: { activeTab: 'home' }
//             })
//             .state('account', {
//                 url: '/account',
//                 templateUrl: 'account/index.html',
//                 controller: 'Account.IndexController',
//                 controllerAs: 'vm',
//                 data: { activeTab: 'account' }
//             });
//     }

//     function run($http, $rootScope, $window) {
//         // add JWT token as default auth header
//         $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

//         // update active tab on state change
//         $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//             $rootScope.activeTab = toState.data.activeTab;
//         });
//     }

//     // manually bootstrap angular after the JWT token is retrieved from the server
//     $(function () {
//         // get JWT token from server
//         $.get('/app/token', function (token) {
//             window.jwtToken = token;

//             angular.bootstrap(document, ['app']);
//         });
//     });
// })();