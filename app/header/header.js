'use strict';

angular.module('appHeader', ['myApp.authServices'])

.component('appHeader', {
    templateUrl: 'header/header.html',
    controller: 'HeaderCtrl'
})
.controller('HeaderCtrl', ['$location', 'AuthService', function($location, AuthService) {
    var ctrl = this;
    ctrl.getClass = function (path) {
        return ($location.path() === path) ? 'active' : '';
    }
    ctrl.logoutUser = function() {
        AuthService.userIsAuthenticated = false;
        $location.path('/login');
    }
 }]);