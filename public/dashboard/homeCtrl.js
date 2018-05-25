(function(){
    'use strict';

    angular
        .module('MessengerCheckerApp')
        .controller('HomeCtrl', HomeCtrl)
        .controller('InvalidWordCheckerCtrl', InvalidWordCheckerCtrl)

        HomeCtrl.$inject = ['$window', '$scope'];
        function HomeCtrl($window, $scope){
            var vm = this;
            
            var initInvalidWordList = [
                {desc:'crackhead'}
            ];

            var localStorageWordArr = angular.fromJson($window.localStorage.getItem('invalidwords'));            

            if (JSON.stringify(localStorageWordArr) !== JSON.stringify(initInvalidWordList)){
                vm.invalidWordList = localStorageWordArr;
                if (!vm.invalidWordList) vm.invalidWordList = initInvalidWordList;

            } else {
                vm.invalidWordList = initInvalidWordList;
            }

            $scope.$watch('hc.invalidWordList', function(e){
                $window.localStorage.setItem('invalidwords',angular.toJson(e));
            }, true);

            vm.selected = function(i){
                angular.forEach(vm.invalidWordList, function(v,k){
                    if (v.selected) v.selected = false;
                });
                i.selected = true;
                vm.hasSelected = true;               
            };

            vm.addWord = function(data){
                if (vm.frmInvalidWordEntry.$valid) {
                    vm.frmInvalidWordEntry.withError = false;
                    var dataCopy = angular.copy(data);

                    vm.invalidWordList.push(dataCopy);
                    data.desc = '';
                } else {
                    vm.frmInvalidWordEntry.withError = true;
                }
            };
            
            vm.removeWord = function(data){
                angular.forEach(vm.invalidWordList, function(v,k){
                    if (v.selected) vm.invalidWordList.splice(k, 1);;
                });
                vm.hasSelected = false;
            };

            vm.cancelDeletion = function(){
                angular.forEach(vm.invalidWordList, function(v,k){
                    if (v.selected) v.selected = false;
                });
                vm.hasSelected = false;
            };
        
            vm.clear = function(){
                vm.invalidWordList = [];
            }
        }

        InvalidWordCheckerCtrl.$inject = ['$window'];
        function InvalidWordCheckerCtrl($window){
            var vm = this;

            vm.submit = function (data) {
                var dataCopy = angular.copy(data.message);                
                var wordArr = dataCopy.split(" ");
                var dom = "";
                
                var bannedWords = angular.fromJson($window.localStorage.getItem('invalidwords'));

                angular.forEach(wordArr, function(v, k){
                    var newWord = v;

                    bannedWords.some(v2=>{
                        var isInvalid = new RegExp("\\b"+ v2.desc +"\\b","i").test(v);

                        if (isInvalid) {
                            var regX = new RegExp(v2.desc,'gi')
                            newWord = v.replace(regX, function(str, offset, s){
                                var result = '<span class="text-danger">'+str+'</span>';
                                return result;
                            });
                        }
                    });

                    dom = dom + " " + newWord;
                    vm.messageDet.wordsCheckerDom = dom;
                    vm.messageDet.wordsChecker = dataCopy;
                });

                data.message = '';
                vm.messageDet.isSent= true;
            };

            vm.edit = function(data){
                data.message = data.wordsChecker;
                vm.messageDet.isSent= false;
            };

            vm.clear = function(){
                vm.messageDet.message = "";
                vm.messageDet.wordsChecker = "";
                vm.messageDet.wordsCheckerDom = "";
            }
        }
})();