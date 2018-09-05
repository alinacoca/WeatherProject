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
    AuthService.setUserAuthenticated(ctrl.user);
    if(AuthService.userIsAuthenticated){
      document.getElementById('negative-feedback-login').style.display = "none";
      $location.path('/home');
    }
    else {
      document.getElementById('negative-feedback-login').style.display = "block";
    }
  }
}])