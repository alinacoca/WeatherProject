'use strict';

angular.module('myApp.home', ['ngRoute', 'myApp.authServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    requireLogin: true
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
    const valCelsius = 273.15;
    $http.get('https://api.openweathermap.org/data/2.5/weather', config)
      .then(function(resp){
        ctrl.weatherDetails.humidity = resp.data.main.humidity;
        ctrl.weatherDetails.pressure = resp.data.main.pressure;
        ctrl.weatherDetails.temp = resp.data.main.temp - valCelsius;
        ctrl.weatherDetails.temp_max = resp.data.main.temp_max - valCelsius;
        ctrl.weatherDetails.temp_min = resp.data.main.temp_min - valCelsius;
        ctrl.weatherDetails.sunrise = ctrl.timeConverter(resp.data.sys.sunrise);
        ctrl.weatherDetails.sunset = ctrl.timeConverter(resp.data.sys.sunset);
        ctrl.weatherDetails.visibility = resp.data.visibility;
        ctrl.weatherDetails.description = resp.data.weather[0].description;
        ctrl.weatherDetails.main = resp.data.weather[0].main;
        ctrl.weatherDetails.windSpeed = resp.data.wind.speed;
        ctrl.weatherDetails.windDeg = resp.data.wind.deg;
        ctrl.enableTable = true;
      })
  }

  ctrl.timeConverter = function(timestamp){
    var a = new Date(timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    var time = hour + ':' + min + ':' + sec ;
    return time;
  }
})
