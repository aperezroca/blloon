'use strict';

/**
 * @ngdoc function
 * @name blloonApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller for the search page
 */
angular.module('blloonApp')
  .controller('SearchCtrl', ['$scope', '$http', 'blloonAPI',
      function ($scope, $http, blloonAPI) {
        var searchTimeout;

        // Scope variables
        // The var q is inside an object so that it can be updated using
        // ng-model
        $scope.formData = { q : '' };
        $scope.books = [];

        // Scope functions
        $scope.queryChange = function() {
          clearTimeout(searchTimeout);

          searchTimeout = setTimeout(search, 500);
        };

        // Private functions
        var search = function() {
          $http.get(blloonAPI + '/books?q=' + $scope.formData.q)
            .success(function (data) {
              $scope.books = data;
            });
        };
      }
  ]);
