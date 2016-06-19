'use strict';

angular.module('myApp.post', ['ui.router', 'ngResource'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('post', {
    url: '/post/:id',
    templateUrl: 'post/post.html',
    controller: 'postCtrl'
  });
}])

.controller('postCtrl', [ '$scope', function($scope) {
}]);