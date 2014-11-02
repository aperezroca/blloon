'use strict';

/**
 * @ngdoc overview
 * @name blloonApp
 * @description
 * # blloonApp
 *
 * Main module of the application.
 */
angular
  .module('blloonApp', ['ngRoute']);

// Constant definition
angular.module('blloonApp').value('blloonAPI', 'http://turbine-production-eu.herokuapp.com');

// Routes
angular.module('blloonApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/books/:udid', {
        templateUrl: 'views/book-detail.html',
        controller: 'BookDetailCtrl'
      })
  }])
