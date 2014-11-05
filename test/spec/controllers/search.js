'use strict';

describe('Controller: SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('blloonApp'));

  it('should be initialized correctly', inject(function($controller) {
    var scope = {},
        controller = $controller('SearchCtrl', { $scope: scope });

    expect(scope.books.length).toBe(0);
    expect(scope.loading).toBe(false);
    expect(scope.noResults).toBe(false);
    expect(scope.placeholder).not.toBe('');
    expect(scope.formData.q).toBe('');
  }));


  describe('book searching', function() {
    var timeout, httpBackend, scope = {};

    beforeEach(inject(function($controller, $timeout, $httpBackend) {
      var controller = $controller('SearchCtrl', { $scope: scope }),
          page1Response = (new Array(20)).map(function(i, e) { return { udid: i, title: i.toString() } });

      timeout = $timeout;
      httpBackend = $httpBackend;

      scope.formData.q = 'dan brown';
      scope.queryChange();

      httpBackend
        .whenGET('http://turbine-production-eu.herokuapp.com/books?page=1&per_page=20&q=dan+brown')
        .respond(page1Response);

      timeout.flush();
      httpBackend.flush();
    }));

    it('should fetch data correctly', function(done) {
      expect(scope.books.length).toBe(20);
      expect(scope.loading).toBe(false);
      expect(scope.noResults).toBe(false);
      expect(scope.formData.q).toBe('dan brown');
    });

    it('should paginate correctly', function(done) {
      var page2Response = (new Array(20)).map(function(i, e) { return { udid: i+20, title: (i+20).toString() } });

      scope.onScroll();

      expect(scope.loading).toBe(true);

      httpBackend
        .whenGET('http://turbine-production-eu.herokuapp.com/books?page=2&per_page=20&q=dan+brown')
        .respond(page2Response);

      httpBackend.flush();

      expect(scope.books.length).toBe(40);
      expect(scope.loading).toBe(false);
      expect(scope.noResults).toBe(false);
      expect(scope.formData.q).toBe('dan brown');
    });

    it('should clear the results correctly', function(done) {
      scope.clear();

      expect(scope.books.length).toBe(0);
      expect(scope.loading).toBe(false);
      expect(scope.noResults).toBe(false);
      expect(scope.formData.q).toBe('');
    });
  });
});
