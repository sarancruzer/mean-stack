app.controller("EdituserController",function ($http,$rootScope,$scope,$state,$window){

        console.log($state.params.id);
        var user_id = $state.params.id;
        $scope.init = function(){
            console.log("user init called");
            var request = {
                method:"POST",
                url : '/api/usersList/getUserById',
                data:{id:user_id},
                headers : {'Content-Type' : 'application/json'},
            };
            $http(request).then(function successCallback(response) {
                console.log(response);
                $scope.user = response.data;
            }, function errorCallback(response) {
                console.log(response);
                
            });

        }
        $scope.init();

        $scope.updateUser = function(){

            console.log("user_data init called");
            var request = {
                method:"POST",
                url : '/api/usersList/updateUser',
                data:{"user_data":$scope.user},
                headers : {'Content-Type' : 'application/json'},
            };
            $http(request).then(function successCallback(response) {
                console.log(response);
                $state.go('userList');
            }, function errorCallback(response) {
                console.log(response);
                
            });

        }

        

});
