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
        var searchTimeout,
            page = 1,
            loading = false,
            limit = 20,
            moreToLoad = true;

        // Scope variables
        // The var q is inside an object so that it can be updated using
        // ng-model
        $scope.formData = { q : 'murakami' };
        $scope.books = [];

        // Scope functions
        $scope.queryChange = function() {
          clearTimeout(searchTimeout);

          searchTimeout = setTimeout(search, 500);
        };

        $scope.onScroll = function() {
          if (!loading) {
            loadNextPage();
          }
        };

        // Private functions
        var search = function() {
          page = 1;
          loading = false;
          moreToLoad = true;
          $scope.books = [];
          loadNextPage();
        };

        var loadNextPage = function() {
          if (loading || !moreToLoad) { return; }

          loading = true;

          $http.get(blloonAPI + '/books', {
              params : {
                'page' : page,
                'q' : $scope.formData.q,
                'per_page' : limit
              }
            })
            .success(function (data) {
              $scope.books = $scope.books.concat(data);
              page++;
              loading = false;
              moreToLoad = (data.length === limit);
            });
        };

        search();
      }
  ]);
