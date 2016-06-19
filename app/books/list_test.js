'use strict';

describe('myApp.books module', function() {

  beforeEach(module('myApp.books'));

  describe('list controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var booksCtrl = $controller('BooksCtrl');
      expect(booksCtrl).toBeDefined();
    }));

  });
});