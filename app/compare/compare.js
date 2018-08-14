'use strict';

angular.module('myApp.compare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compare', {
    templateUrl: 'compare/compare.html',
    controller: 'CompareCtrl'
  });
}])

.controller('CompareCtrl', [function() {

}]);