'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.compare',
  'weatherDetails'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}])
.controller('AppCtrl', function($location) {
  var app = this;
  app.getClass = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'active' : '';
  }
});
