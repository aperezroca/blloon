'use strict';

/**
 * @ngdoc function
 * @name blloonApp.service:BookService
 * @description
 * # BookService
 * Service to fetch books from Blloon API
 */
angular.module('blloonApp')
  .service('bookService', ['$http', '$q', 'blloonAPI',
      function ($http, $q, blloonAPI) {
        this.search = function(params, callback) {
          return $http.get(blloonAPI + '/books', { params: params })
            .success(callback);
        };

        this.getById = function(id, callback) {
          return $http.get(blloonAPI + '/books/' + id)
            .success(callback);
        };
      }
  ]);
