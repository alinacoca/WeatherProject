'use strict';

angular.module('myApp.compare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compare', {
    templateUrl: 'compare/compare.html',
    controller: 'CompareCtrl'
  });
}])

.controller('CompareCtrl', function($scope, $http) {
  $scope.showInfo = function(city) {
    var config = {
      params: {
        q: city,
        appid: '961f60d638110243b033e57dc9f4822c'
      }
    }
    $http.get('https://api.openweathermap.org/data/2.5/weather', config)
    .then(function(resp) {
      console.log(resp);
    })
  }
});