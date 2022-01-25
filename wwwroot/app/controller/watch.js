angular
.module("work")
.controller("watch", function($scope, $interval){
    watchStatus = 0;
    $scope.time = [];
    $scope.relax = 0;
    $scope.relaxMax = 15;
    $scope.workMax = 45;
    $scope.work = 0;
    $scope.time.hour = "--";
    $scope.time.minute = "--";
    $scope.time.second = "--";
    $scope.changeWork = function(){
        $scope.workMax = $("#watch input[name='work']").val();
    }
    $scope.changeRelax = function(){
        $scope.relaxMax = $("#watch input[name='relax']").val();
    }
    $scope.notify = function(text){
        new Notification(text);
    }
    $scope.stop = function(){
        $("#watch").toggleClass("active");
        $("#watch .pause").removeClass("active");
        $interval.cancel(timer);
        $scope.time.hour = "--";
        $scope.time.minute = "--";
        $scope.time.second = "--";
    }
    $scope.pause = function(){
        $("#watch .pause").toggleClass("active");
        if(watchStatus == 1){
            watchStatus = 0;
            timer = $interval(watchHandle, 1000);
        }else{
            watchStatus = 1;
            $interval.cancel(timer);
        }
    }
    $scope.start = function(){
        $scope.time.hour = "00";
        $scope.time.minute = "00";
        $scope.time.second = "00";
        $("#watch").toggleClass("active");
        timer = $interval(watchHandle, 1000);
    }
    function watchHandle(){
        if($scope.time.second < 59){
            $scope.time.second++;
        }else{
            $scope.time.second = 0;
            if($scope.time.minute < 59){
                $scope.time.minute++;
                if($scope.work >= $scope.workMax){
                    $scope.relax++;
                }else{
                    $scope.work++;
                }
                if($scope.work == $scope.workMax){
                    $scope.work = 0;
                    $scope.notify("Hey, you should stop working a bit!");
                    $("#watch").toggleClass("stop");
                }
                if($scope.relax == $scope.relaxMax){
                    $scope.relax = 0;
                    $scope.notify("Come on buddy your time out is over!");
                    $("#watch").toggleClass("stop");
                }
            }else{
                $scope.time.minute = 0;
                $scope.time.hour++;
            }
        }
        if($scope.time.second.toString().length == 1)
            $scope.time.second = "0" + $scope.time.second;
        if($scope.time.minute.toString().length == 1)
            $scope.time.minute = "0" + $scope.time.minute;
        if($scope.time.hour.toString().length == 1)
            $scope.time.hour = "0" + $scope.time.hour;
    }
});