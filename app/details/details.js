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
    controller: function DetailsCtrl($scope) {
        console.log($scope.weatherDetails);
    }
});