(function(){
    'use strict';

    angular
        .module('MessengerCheckerApp')
        .controller('DashboardCtrl', DashboardCtrl)

        DashboardCtrl.$inject = ['$window'];
        function DashboardCtrl($window){
            var vm = this;
            
            vm.activeView = {code:'INVALIDWORDS', desc:'Invalid Words'};

            vm.changeView = function(data){
                return vm.activeView = (data.code == 'HOME') ? {code:'INVALIDWORDS', desc:'Invalid Words'} :{code:'HOME', desc:'Home'};
            };
        }
})();