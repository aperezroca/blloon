'use strict';

/**
 * @ngdoc function
 * @name blloonApp.controller:BookDetailCtrl
 * @description
 * # BookDetailCtrl
 * Controller for the page of the detail of a book
 */
angular.module('blloonApp')
  .controller('BookDetailCtrl', ['$scope', '$http', '$routeParams', '$sce',
      '$location', '$anchorScroll', 'blloonAPI', 'book',
      function ($scope, $http, $routeParams, $sce, $location,
          $anchorScroll, blloonAPI, book) {

        // Scope variables
        $scope.book = null;

        // Scope functions
        $scope.renderHtml = function(htmlCode) {
          return $sce.trustAsHtml(htmlCode);
        };

        $scope.goToDescription = function() {
          $location.hash('book-description');

          $anchorScroll();
        };

        // Private functions
        var loadBook = function() {
          $http.get(blloonAPI + '/books/' + $routeParams.udid)
            .then(function(data) {
              $scope.book = data.data;
            });
        }

        // Check if the book has been passed by the previous route,
        // otherwise fetch it from the API
        if (book.data) { $scope.book = book.data; }
        else { loadBook(); }
      }
  ]);
