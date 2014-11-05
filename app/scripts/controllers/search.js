'use strict';

/**
 * @ngdoc function
 * @name blloonApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller for the search page
 */
angular.module('blloonApp')
  .controller('SearchCtrl', ['$scope', '$rootScope', '$timeout', 'book',
      'searchState', 'bookService',
      function ($scope, $rootScope, $timeout, book, searchState, bookService) {
        var searchTimeout, page, moreToLoad,
            limit = 20;

        // Scope variables
        // The var q is inside an object so that it can be updated using
        // ng-model
        $scope.formData = { q : '' };
        $scope.books = [];
        $scope.loading = false;
        $scope.noResults = false;
        $scope.placeholder = '';

        // Scope functions
        $scope.queryChange = function() {
          $scope.noResults = false;
          if ($scope.formData.q === '') {
            $scope.clear();
          } else {
            $timeout.cancel(searchTimeout);
            searchTimeout = $timeout(search, 500);
          }
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
        $rootScope.$on('$locationChangeStart', function(event, next) {
          var udid = next.split('/').pop();

          book.data = $.grep($scope.books, function(e) {
            return e.udid === udid;
          })[0];

          saveState();
        });

        // Private functions
        var init = function() {
          generatePlaceholder();
          recoverState();
        };

        var search = function() {
          initPagination();
          loadNextPage();
        };

        var loadNextPage = function() {
          if ($scope.loading || !moreToLoad) { return; }

          $scope.loading = true;

          bookService.search({
            'page': page,
            'q': $scope.formData.q,
            'per_page': limit
          }, function(books) {
            $scope.noResults = ((books.length === 0) && (page === 1));
            $scope.books = $scope.books.concat(books);
            $scope.loading = false;
            page++;
            moreToLoad = (books.length === limit);
          });
        };

        var initPagination = function() {
          $scope.books = [];
          $scope.loading = false;
          $scope.noResults = false;
          page = 1;
          moreToLoad = true;
        };

        var saveState = function() {
          searchState.formData = $scope.formData;
          searchState.books = $scope.books;
          searchState.loading = $scope.loading;
          searchState.noResults = $scope.noResults;
          searchState.placeholder = $scope.placeholder;
        };

        var recoverState = function() {
          if (Object.keys(searchState).length !== 0) {
            $scope.formData = searchState.formData;
            $scope.books = searchState.books;
            $scope.loading = searchState.loading;
            $scope.noResults = searchState.noResults;
            $scope.placeholder = searchState.placeholder;
          }
        };

        var generatePlaceholder = function() {
          var authors = ['Murakami', 'Tolkien', 'Kyle Simpson', 'Lorca'],
              topics = ['love', 'drama', 'comic', 'sci-fi', 'crime'],
              authorRandom = Math.floor(Math.random()*(authors.length)),
              topicRandom = Math.floor(Math.random()*(topics.length)),
              author = authors[authorRandom],
              topic = topics[topicRandom];

          $scope.placeholder = 'Try \'' + author + '\' or \'' + topic + '\'';
        };

        init();
      }
  ]);
