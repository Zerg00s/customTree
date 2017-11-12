

var app = angular.module('app', [
    	'ngSanitize',
        'ui.bootstrap',
        'ngAnimate',
        'textAngular' 
]).run(function ($http) {
    $http.defaults.headers.common.Accept = "application/json;odata=verbose";
});

app.config(function($locationProvider){
    //this allows us to get query string parameters:
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}) 