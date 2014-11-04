'use strict';

describe('Controller: SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('blloonApp'));

  it('should be initialized correctly', inject(function ($controller) {
    var scope = {},
        controller = $controller('SearchCtrl', { $scope: scope });

    expect(scope.books.length).toBe(0);
    expect(scope.loading).toBe(false);
    expect(scope.noResults).toBe(false);
    expect(scope.placeholder).not.toBe('');
    expect(scope.formData.q).toBe('');
  }));
});
