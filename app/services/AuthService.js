'use strict';

angular.module('myApp.authServices', [])

.service('AuthService', function(){
    this.userIsAuthenticated = false;

    this.setUserAuthenticated = function(_user){
        var users = JSON.parse(localStorage.getItem('users'));
        users.forEach(user => {
            if (user.username === _user.username && user.password === _user.password){
                this.userIsAuthenticated = true;
            }
        });
    };

    this.getUserAuthenticated = function(){
        return this.userIsAuthenticated;
    };
});