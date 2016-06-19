'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'myApp.books',
  'myApp.books.detail',
  'myApp.quotes',
  'myApp.post',
  'myApp.version'
])
.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) { 
		$stateProvider
  $urlRouterProvider.otherwise('/books/');
}]);
