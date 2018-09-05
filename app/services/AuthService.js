'use strict';

angular.module('myApp.authServices', [])

.service('AuthService', function(){
    this.userIsAuthenticated = false;

    this.setUserAuthenticated = function(_user){
        let users = localStorage.getItem('users');
        if (users) {
            users = JSON.parse(users);
            users.forEach(user => {
                if (user.username === _user.username && user.password === _user.password){
                    this.userIsAuthenticated = true;
                }
            });
        }
    };

    this.getUserAuthenticated = function(){
        return this.userIsAuthenticated;
    };
});