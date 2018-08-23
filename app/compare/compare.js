'use strict';

angular.module('myApp.compare', ['ngRoute',
'weatherDetails'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compare', {
    templateUrl: 'compare/compare.html',
    controller: 'CompareCtrl',
    requireLogin: true
  });
}])

.controller('CompareCtrl', function($http) {
  var ctrl = this;
  ctrl.enableDetails1 = false;
  ctrl.enableDetails2 = false;
  ctrl.enableError1 = false;
  ctrl.enableError2 = false;
  ctrl.errMessage = '';

  ctrl.showDetails = function(city, number) {
    var config = {
      params: {
        q: city,
        appid: '961f60d638110243b033e57dc9f4822c'
      }
    }
    ctrl.weatherDetails = {};
    const valCelsius = 273.15;
    $http.get('https://api.openweathermap.org/data/2.5/weather', config)
    .then(function(resp) {
      ctrl.weatherDetails.country = resp.data.sys.country;
      ctrl.weatherDetails.lat = resp.data.coord.lat;
      ctrl.weatherDetails.lon = resp.data.coord.lon;
      ctrl.weatherDetails.humidity = resp.data.main.humidity;
      ctrl.weatherDetails.pressure = resp.data.main.pressure;
      ctrl.weatherDetails.temp = Math.round((resp.data.main.temp - valCelsius) * 100) / 100;
      ctrl.weatherDetails.temp_max = Math.round((resp.data.main.temp_max - valCelsius) * 100) / 100;
      ctrl.weatherDetails.temp_min = Math.round((resp.data.main.temp_min - valCelsius) * 100) / 100;
      ctrl.weatherDetails.sunrise = ctrl.timeConverter(resp.data.sys.sunrise);
      ctrl.weatherDetails.sunset = ctrl.timeConverter(resp.data.sys.sunset);
      ctrl.weatherDetails.visibility = resp.data.visibility;
      ctrl.weatherDetails.description = resp.data.weather[0].description;
      ctrl.weatherDetails.main = resp.data.weather[0].main;
      ctrl.weatherDetails.windSpeed = resp.data.wind.speed;
      ctrl.weatherDetails.windDeg = resp.data.wind.deg;
      if(number == 1) {
        ctrl.enableError1 = false;
        ctrl.weatherDetails1 = JSON.parse(JSON.stringify(ctrl.weatherDetails));
        ctrl.enableDetails1 = true;
      }
      if(number == 2) {
        ctrl.enableError2 = false;
        ctrl.weatherDetails2 = JSON.parse(JSON.stringify(ctrl.weatherDetails));
        ctrl.enableDetails2 = true;
      }
    }, function() {
      if(number == 1) {  
        ctrl.enableDetails1 = false;
        ctrl.enableError1 = true;
      }
      if(number == 2) {
        ctrl.enableDetails2 = false;
        ctrl.enableError2 = true;
      }
      ctrl.errMessage = 'This city does not exist.';
    });
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
});
