'use strict';

angular.module('myApp.authServices', [])

.service('AuthService', function(){
    this.userIsAuthenticated = false;

    this.setUserAuthenticated = function(value){
        this.userIsAuthenticated = value;
    };

    this.getUserAuthenticated = function(){
        return this.userIsAuthenticated;
    };
});