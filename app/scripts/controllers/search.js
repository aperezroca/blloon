'use strict';

/**
 * @ngdoc function
 * @name blloonApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller for the search page
 */
angular.module('blloonApp')
  .controller('SearchCtrl', ['$scope', '$http', '$rootScope',
      'blloonAPI', 'book',
      function ($scope, $http, $rootScope, blloonAPI, book) {
        var searchTimeout, page, moreToLoad,
            limit = 20;

        // Scope variables
        // The var q is inside an object so that it can be updated using
        // ng-model
        $scope.formData = { q : '' };
        $scope.books = [];
        $scope.loading = false;

        // Scope functions
        $scope.queryChange = function() {
          if ($scope.formData.q === '') { return; }

          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(search, 500);
        };

        $scope.onScroll = function() {
          if (!$scope.loading) {
            loadNextPage();
          }
        };

        $scope.clear = function() {
          initPagination();
          $scope.formData.q = '';
        };

        // Scope events
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
          var udid = next.split('/').pop();

          book.data = $.grep($scope.books, function(e) {
            return e.udid === udid;
          })[0];
        });

        // Private functions
        var search = function() {
          initPagination();
          loadNextPage();
        };

        var loadNextPage = function() {
          if ($scope.loading || !moreToLoad) { return; }

          $scope.loading = true;

          $http.get(blloonAPI + '/books', {
              params : {
                'page' : page,
                'q' : $scope.formData.q,
                'per_page' : limit
              }
            })
            .success(function (data) {
              $scope.books = $scope.books.concat(data);
              $scope.loading = false;
              page++;
              moreToLoad = (data.length === limit);
            });
        };

        var initPagination = function() {
          $scope.books = [];
          $scope.loading = false;
          page = 1;
          moreToLoad = true;
        };
      }
  ]);
