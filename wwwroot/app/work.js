/*var needToConfirm = true;

window.onbeforeunload = confirmExit;
function confirmExit(){
    if(needToConfirm)
        return "Quer fechar essa janela?";
}*/

notifyStatus = false;
Notification.requestPermission(function (permission) {
    notifyStatus = permission;
});

angular
.module("work", ["ngRoute"])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/dashboard.html",
            controller: "dashboard"
        });
})
.directive("watch", function(){
	return {
		templateUrl: "templates/watch.html",
		controller: "watch"
	}
})
.directive("lists", function(){
	return {
		templateUrl: "templates/lists.html?v=1",
		controller: "lists"
	}
})
.directive("memo", function(){
	return {
		templateUrl: "templates/memo.html",
		controller: "memo"
	}
});