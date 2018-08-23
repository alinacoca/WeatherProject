'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'appHeader',
  'myApp.login',
  'myApp.register',
  'myApp.home',
  'myApp.compare',
  'myApp.authServices'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/login'});

}])

.run(['$rootScope', '$route', 'AuthService', '$location', function($rootScope, $route, AuthService, $location){
  $rootScope.$on("$locationChangeStart", function(event, next, current) {
      for(var i in $route.routes) {
        if(next.indexOf(i) != -1) {
          if($route.routes[i].requireLogin && !AuthService.getUserAuthenticated()) {
            alert("You need to be authenticated to see this page!");
            event.preventDefault();
          }
          if($route.routes[i].requireLogin===false && AuthService.getUserAuthenticated()) {
            $location.path('/home');
          }
        }
      }
  });
}])
.controller('AppCtrl', function() {});
