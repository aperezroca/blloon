'use strict';

/**
 * @ngdoc function
 * @name blloonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blloonApp
 */
angular.module('blloonApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
