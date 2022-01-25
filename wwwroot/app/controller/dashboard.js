angular
.module("work")
.controller("dashboard", function($scope, $route, $routeParams, $location){
    $scope.user_unique = $.cookie("br.com.alrp.work");
    if($scope.user_unique == undefined){
        $scope.user_unique = makeid();
        $.cookie("br.com.alrp.work", $scope.user_unique, {expires: 7*52*20});
    }
    $scope.updateUser = function(){
        $scope.user_unique = $("header input").val();
        $.cookie("br.com.alrp.work", $("header input").val(), {expires: 7*52*20});
        window.location.reload(true);
    }
    function makeid(){
        var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
});