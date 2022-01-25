angular
.module("work")
.controller("memo", function($scope, $route, $routeParams, $location, $http){
    $scope.memo = "";
    $scope.apiUrl = window.location.origin;
    $http.get($scope.apiUrl+"/memo/" + $.cookie("br.com.alrp.work")).then(function(response){
        if(response.data != null)
            $scope.memo = response.data.text;
    });
    $scope.saveMemo = function(){
        $http({
            "url": $scope.apiUrl+"/memo/"+$.cookie("br.com.alrp.work"),
            "data": {"userid":$.cookie("br.com.alrp.work"), "text": $("#memo textarea").val()},
            "method": "PUT"
        });
    }
});
