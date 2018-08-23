'use strict';

angular.module('myApp.login', ['ngRoute', 'myApp.authServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl',
    requireLogin: false
  });
}])

.controller('LoginCtrl', ['AuthService', '$location', function(AuthService, $location) {
  var ctrl = this;
  ctrl.loginUser = function() {
    if(ctrl.user.username === 'user' && ctrl.user.password === 'password'){
      AuthService.setUserAuthenticated(true);
      $location.path('/home');
    }
  }
}])