'use strict';

angular.module('myApp.books.detail', ['ui.router', 'ngResource'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('book', {
    url: '/books/detail/:bookId',
    templateUrl: 'books/detail.html',
    controller: 'booksDetailCtrl'
  });
}])

.controller('booksDetailCtrl', [ '$scope', '$stateParams', 'Book', function($scope, $stateParams, Book) {
  $scope.book = Book.get({bookId: $stateParams.bookId}, function(book) {
    });
  $scope.ensureImageLink = function(src) {
    var default_src = '/resource/book.jpg';
    if (src == "") {
      src = default_src;
    }
    return src;
  };
  $scope.getSummary = function(text) {
    return text.trunc(120);
  };
  String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0,n-1)+'...' : this;
  };
}])

.factory('Book', ['$resource',
  function($resource){
    return $resource('/resource/:bookId.json', {}, {
      query: {method:'GET', params:{bookId:'books'}, isArray:true}
    });
}]);