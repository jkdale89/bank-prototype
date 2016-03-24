'use strict';

/* App Module */

angular.module('ravenApp', [
    'ngRoute',
    'Animations',
    'Controllers',
    'Filters',
    'Services',
    'Directives',
    'ui.bootstrap.tpls',
    'ui.bootstrap.modal',
    'ui.bootstrap'
  ])

  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/main/:awesome?', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        }).
      when('/alt', {
        templateUrl: 'views/alt.html',
        controller: 'MainCtrl'
      }).
      when('/accounts/:accountNumber/:awesome?', {
        templateUrl: 'views/accounts.html',
        controller: 'ViewAccountRoute'
      }).
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      }).
      when('/bills/:awesome?', {
        templateUrl: 'views/billpay.html',
        controller: 'MainCtrl',
        activetab: 'bills'
      }).
      when('/docs/:awesome?', {
        templateUrl: 'views/docs.html',
        controller: 'MainCtrl',
        activetab: 'docs'
      }).
      when('/help', {
        templateUrl: 'views/help.html',
        controller: 'MainCtrl',
        activetab: 'help'
      }).
      when('/settings/:awesome?', {
        templateUrl: 'views/settings.html',
        controller: 'MainCtrl',
        activetab: 'settings'
      }).
      when('/test', {
        templateUrl: 'views/test.html',
        controller: 'MainCtrl'
      }).
      when('/tools/:awesome?', {
        templateUrl: 'views/tools.html',
        controller: 'MainCtrl',
        activetab: 'tools'
      }).
      when('/transfers/:awesome?', {
        templateUrl: 'views/transfers.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/user-profile/:awesome?', {
        templateUrl: 'views/user-profile.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/account-preferences/:awesome?', {
        templateUrl: 'views/account-preferences.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/security-preferences/:awesome?', {
        templateUrl: 'views/security-preferences.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/text-enrollment/:awesome?', {
        templateUrl: 'views/text-enrollment.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/mobile-authorizations/:awesome?', {
        templateUrl: 'views/mobile-authorizations.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/transfers-to-other/:awesome?', {
        templateUrl: 'views/transfers-to-other.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      when('/transfers-between-other/:awesome?', {
        templateUrl: 'views/transfers-between-other.html',
        controller: 'MainCtrl',
        activetab: 'transfers'
      }).
      otherwise({
        redirectTo: '/main'
      });
    }
  ])
