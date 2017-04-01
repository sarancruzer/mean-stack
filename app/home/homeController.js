app.controller("HomeController",function ($http,$rootScope,$scope,$window,UserService){

        // $scope.init = function(){
        //     var request = {
        //         method:"POST",
        //         url:"/api/sponsorOnBoardingDepends",
        //         data:{},
        //         headers : {'Content-Type' : 'application/json'},
        //     };
        //     $http(request).then(function successCallback(response) {
        //         var data = response.data.result;
                                
        //     }, function errorCallback(response) {
        //         $scope.SpError=response.data.error;
        //         if(response.status == 404){
        //             $scope.SpError = response.statusText;
        //         }
        //     });
        // };

        $scope.init = function(){
            console.log("init called");
            // get current user
            UserService.GetCurrent().then(function (user) {
                $scope.user = user;
            });
        }

        $scope.init();
        

});


// (function () {
//     'use strict';

//     angular
//         .module('app')
//         .controller('Home.IndexController', Controller);

//     function Controller(UserService) {
//         var vm = this;

//         vm.user = null;

//         initController();

//         function initController() {
//             // get current user
//             UserService.GetCurrent().then(function (user) {
//                 vm.user = user;
//             });
//         }
//     }

// })();