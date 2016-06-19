'use strict';

angular.module('myApp.books', ['ui.router', 'ngResource'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('books', {
    url: '/books/:id',
    templateUrl: 'books/list.html',
    controller: 'booksCtrl'
  });
}])

.controller('booksCtrl', [ '$scope', 'Book', function($scope, Book) {
  $scope.books = Book.query();
  $scope.ensureImageLink = function(src) {
  	var default_src = '/resource/book.jpg';
  	if (src == "") {
  		src = default_src;
  	}
  	return src;
  };
}])

.factory('Book', ['$resource', function($resource){
    return $resource('/resource/books.json', null, {});
}]);