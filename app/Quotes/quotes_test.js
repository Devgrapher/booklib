'use strict';

describe('myApp.Quotes module', function() {

  beforeEach(module('myApp.Quotes'));

  describe('Quotes controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var QuotesCtrl = $controller('QuotesCtrl');
      expect(QuotesCtrl).toBeDefined();
    }));

  });
});