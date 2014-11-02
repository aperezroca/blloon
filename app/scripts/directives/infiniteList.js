'use strict';

angular.module('blloonApp')
  .directive('infiniteList', [
    function() {
      return {
        restrict: 'C',
        scope: {
          onScroll: '='
        },
        link: function($scope, elem) {
          $(window).scroll(function() {
            if (loadMore()) {
              $scope.onScroll();
            }
          });

          var loadMore = function() {
            return $('li', elem).last().visible(true);
          };
        }
      };
    }
  ]);
