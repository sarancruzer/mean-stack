app.controller("ManageuserController",function ($http,$rootScope,$scope,$window,UserService,FlashService){

        $scope.currentpage=1;

        $scope.init = function(){
            console.log("user init called");
            var request = {
               method:"GET",
               url : 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/US/anywhere/anytime/anytime?apiKey=cl825011481956579722252478082527',
               data:{},
               headers: {'Content-Type': 'application/json'}                
           };
            $http(request).then(function successCallback(response) {
                console.log(response);
                $scope.users = response.data;
            }, function errorCallback(response) {
                console.log(response);
                
            });

        }
        $scope.init();
     
});
