'use strict';

angular.module('myApp.quotes', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('quotes', {
    url: '/quotes/:id',
    templateUrl: 'quotes/quotes.html',
    controller: 'quotesCtrl'
  });
}])

.controller('quotesCtrl', [function() {

}]);