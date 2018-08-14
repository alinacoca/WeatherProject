'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($http) {
  var ctrl = this;
  ctrl.myCoordinates = {};
  ctrl.enableTable = false;
  ctrl.findCurrentLocation = function() {
    $http.get('http://ip-api.com/json')
      .then(function(coordinates) {
        ctrl.myCoordinates.lat = coordinates.data.lat;
        ctrl.myCoordinates.lon = coordinates.data.lon;
        ctrl.myCoordinates.city = coordinates.data.city;
        ctrl.myCoordinates.country = coordinates.data.country;
        ctrl.displayWeather(ctrl.myCoordinates);
    })
  }

  ctrl.displayWeather = function(coordinates) {
    var config = {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
        appid: '961f60d638110243b033e57dc9f4822c'
      }
    }
    ctrl.weatherDetails = {};
    $http.get('https://api.openweathermap.org/data/2.5/weather', config)
      .then(function(resp){
        ctrl.weatherDetails.humidity = resp.data.main.humidity;
        ctrl.weatherDetails.pressure = resp.data.main.pressure;
        ctrl.weatherDetails.temp = resp.data.main.temp;
        ctrl.weatherDetails.temp_max = resp.data.main.temp_max;
        ctrl.weatherDetails.temp_min = resp.data.main.temp_min;
        ctrl.weatherDetails.sunrise = resp.data.sys.sunrise;
        ctrl.weatherDetails.sunset = resp.data.sys.sunset;
        ctrl.weatherDetails.visibility = resp.data.visibility;
        ctrl.weatherDetails.description = resp.data.weather[0].description;
        ctrl.weatherDetails.main = resp.data.weather[0].main;
        ctrl.weatherDetails.windSpeed = resp.data.wind.speed;
        ctrl.weatherDetails.degSpeed = resp.data.wind.deg;
        ctrl.enableTable = true;
      })
  } 
});
