'use strict';

angular.module('weatherDetails', [])

.component('weatherDetails', {
    templateUrl: 'details/details.html',
    bindings: {
        weatherDetails: '=',
        enableError: '=',
        errMessage: '=',
        enableDetails: '='
    },
    controller: 'DetailsCtrl'
})
.controller('DetailsCtrl', function($scope) {
    console.log($scope);
 });