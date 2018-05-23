(function(){
    'use strict';
    
    angular
        .module('MessengerCheckerApp',['ui.router', 'ngSanitize', 'LocalStorageModule'])
        .config(Config)

    Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'localStorageServiceProvider']
    function Config($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, localStorageServiceProvider){
        
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            controller: 'DashboardCtrl as dc',
            templateUrl: 'dashboard/master.html?v=20180522'
        })
                
        $urlRouterProvider.otherwise('/dashboard');

        localStorageServiceProvider
            .setPrefix('test')
            .setStorageType('sessionStorage');
    }
})();