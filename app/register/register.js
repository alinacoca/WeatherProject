'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl',
    requireLogin: false
  });
}])

.controller('RegisterCtrl', ['$window', function($window) {
  var ctrl = this;
  ctrl.registerUser = function() {
    var users = JSON.parse(localStorage.getItem('users'));
    if(users === null) {
      users = [];
    }
    users.push(ctrl.user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(localStorage);
  }
}])