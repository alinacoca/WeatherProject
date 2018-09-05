'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl',
    requireLogin: false
  });
}])

.controller('RegisterCtrl', ['$location', function($location) {
  var ctrl = this;
  ctrl.messageError = '';

  ctrl.registerUser = function() {
    if (ctrl.verifyUserData(ctrl.user)) {
      var users = JSON.parse(localStorage.getItem('users'));
      if(users === null) {
        users = [];
      }
      users.push(ctrl.user);
      localStorage.setItem("users", JSON.stringify(users));
      document.getElementById('negative-feedback-register').style.display = "none";
      $location.path("/login");
    }
    else {
      document.getElementById('negative-feedback-register').style.display = "block";
    }
  }

  ctrl.verifyUserData = function(_user) {
    var users = JSON.parse(localStorage.getItem('users'));
    var i;
    for (i = 0; i < users.length; i++) {
      if (users[i].email === _user.email){
        ctrl.messageError = 'This email already exists!';
        return false;
      }
      if (users[i].username === _user.username){
        ctrl.messageError = 'This username already exists!';
        return false;
      }
    }
    if(_user.password !== _user.confirmPass) {
      ctrl.messageError = 'Invalid password confirmation!';
      return false;
    }
    return true;
  }
}]);