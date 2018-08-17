'use strict';

angular.module('appHeader', [])

.component('appHeader', {
    templateUrl: 'header/header.html',
    controller: 'HeaderCtrl'
})
.controller('HeaderCtrl', function($location) {
    this.getClass = function (path) {
        return ($location.path() === path) ? 'active' : '';
    }
 });