'use strict';

/**
 * @ngdoc function
 * @name blloonApp.controller:BookDetailCtrl
 * @description
 * # BookDetailCtrl
 * Controller for the page of the detail of a book
 */
angular.module('blloonApp')
  .controller('BookDetailCtrl', ['$scope', '$routeParams', '$sce',
      '$location', 'bookService', 'book',
      function ($scope, $routeParams, $sce, $location, bookService, book) {

        // Scope variables
        $scope.book = null;

        // Scope functions
        $scope.renderHtml = function(htmlCode) {
          return $sce.trustAsHtml(htmlCode);
        };

        // Private functions
        var loadBook = function() {
          bookService.getById($routeParams.udid, function(book) {
            $scope.book = book;
          });
        };

        // Check if the book has been passed by the previous route,
        // otherwise fetch it from the API
        if (book.data) { $scope.book = book.data; }
        else { loadBook(); }
      }
  ]);
