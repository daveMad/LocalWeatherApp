(function () {
    var app = angular.module('app');

    app.controller('indexController', function ($scope, ipService, weatherService) {
        // initialize fields
        $scope.errorMessage = null;
        $scope.location = null;
        $scope.weather = null;
        $scope.currentDegree = null;
        $scope.currentLocation = null;
        $scope.isFahrenheit = true;

        var init = function () {
            ipService.getIp().then(function (response) {
                $scope.errorMessage = null;
                var location = response.data;
                getWeather(location.city, location.country);
            }, function (err) {
                console.log(err.statusText);
                $scope.errorMessage = 'Cannot Get Ip Information';
            });
        };

        var getWeather = function (city, country) {
            weatherService.getWeather(city, country).then(function (response) {
                $scope.weather = response.data;
                $scope.currentDegree = convertDegree(true, $scope.weather.main.temp);
                changeWeatherStatus($scope.weather.weather[0].main);
            }, function (err) {
                console.log(err.statusText);
                $scope.errorMessage = 'Cannot Get Weather Data';
            });
        };

        var convertDegree = function (fToC, value) {
            if (fToC) { // Fahrenheit to Celsius
                value = ((value - 32) * (5)) / (9);
            } else { // Reverse
                value = ((value * 9) / (5)) + (32);
            }

            return parseInt('' + value);
        };

        function toggleDegree() {
            $scope.isFahrenheit = !$scope.isFahrenheit;
        };

        function changeIcon(icon) {
            $("div." + icon).removeClass("hide");
        };

        function changeWeatherStatus(status) {
            switch (status = status.toLowerCase()) {
                case 'dizzle':
                    changeIcon('sun-shower');
                    break;
                case 'clouds':
                    changeIcon('cloudy');
                    break;
                case 'rain':
                    changeIcon('rainy');
                    break;
                case 'snow':
                    changeIcon('flurries');
                    break;
                case 'clear':
                    changeIcon('sunny');
                    break;
                case 'thunderstom':
                    changeIcon('thunder-storm');
                    break;
                default:
                    $('div.clouds').removeClass('hide');
                    break;
            }
        };

        init();
    });


}());