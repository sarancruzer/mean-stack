﻿app.controller("AccountController",function ($http,$rootScope,$scope,$window,UserService,FlashService){


        $scope.init = function(){
            console.log("init called");
            var request = {
                method:"POST",
                url : '/api/users/current',
                data:{},
                headers : {'Content-Type' : 'application/json'},
            };
            $http(request).then(function successCallback(response) {
                console.log(response);
                console.log(response.data.firstName);
                $scope.user = response.data;
            }, function errorCallback(response) {
                console.log(response);
                
            });

        }
        $scope.init();


        $scope.saveUser = function(){
            var _id = $scope.user._id;
            console.log("_id "+$scope.user._id);
            //var _id = "58df46403a12152327bf5d63";
            console.log("init called "+_id);
            var request = {
                method:"POST",
                url : '/api/users/'+_id,
                data:{user:$scope.user},
                headers : {'Content-Type' : 'application/json'},
            };
            $http(request).then(function successCallback(response) {
                console.log(response);
                console.log(response.data);
                //$scope.user = response.data;
                $scope.ASuccess = response.data;
            }, function errorCallback(response) {
                console.log(response);
                
            });

        }

        $scope.deleteUser = function(){



        }


        // $scope.deleteUser = function(){
        //      console.log("deleteUser called");
        //      UserService.Delete(user._id)
        //         .then(function () {
        //             // log user out
        //             $window.location = '/login';
        //         })
        //         .catch(function (error) {
        //             FlashService.Error(error);
        //         });            
        // }
        // $scope.deleteUser();
        

});


// (function () {
//     'use strict';

//     angular
//         .module('app')
//         .controller('Account.IndexController', Controller);

//     function Controller($window, UserService, FlashService) {
//         var vm = this;

//         vm.user = null;
//         vm.saveUser = saveUser;
//         vm.deleteUser = deleteUser;

//         initController();

//         function initController() {
//             // get current user
//             UserService.GetCurrent().then(function (user) {
//                 vm.user = user;
//             });
//         }

//         function saveUser() {
//             UserService.Update(vm.user)
//                 .then(function () {
//                     FlashService.Success('User updated');
//                 })
//                 .catch(function (error) {
//                     FlashService.Error(error);
//                 });
//         }

//         function deleteUser() {
//             UserService.Delete(vm.user._id)
//                 .then(function () {
//                     // log user out
//                     $window.location = '/login';
//                 })
//                 .catch(function (error) {
//                     FlashService.Error(error);
//                 });
//         }
//     }

// })();