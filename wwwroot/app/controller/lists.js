angular
.module("work")
.controller("lists", function($scope, $http){
    $scope.lists = [];
    $scope.apiUrl = window.location.origin;
    $http.get($scope.apiUrl+"/todo?userid=" + $.cookie("br.com.alrp.work")).then(function(response){
        $scope.lists = response.data;
        for(var a in response.data){
            $scope.lists[a].name = response.data[a].description;
            $scope.lists[a].index = a;
            $scope.lists[a].id = response.data[a].id;
            $scope.lists[a].items = [];    
            $http.get($scope.apiUrl+"/task?listid=" + response.data[a].id).then(function(response){
                
                let index = undefined;
                if(response.data[0] == undefined)
                    return;
                for(var c in $scope.lists){
                    if($scope.lists[c].id == response.data[0].listId)
                        index = c;
                }
                for(var b in response.data){
                    $scope.lists[index].items[b] = [];
                    $scope.lists[index].items[b].id = response.data[b].id;
                    $scope.lists[index].items[b].name = response.data[b].description;
                    $scope.lists[index].items[b].done = response.data[b].completed ==  true ? "done" : "";
                    $scope.lists[index].items[b].completed = response.data[b].completed;
                    $scope.lists[index].items[b].index = b;
                }
            });
        }
    });
    $scope.newList = function(){
        if($(".new-list input").val() == "")
            return false;
        repeat = false;
        for(var a in $scope.lists){
            if($scope.lists[a].description == $(".new-list input").val())
                repeat = true;
        }
        if(repeat)
            return false;
        $http.post($scope.apiUrl+"/todo",{"UserId": $.cookie("br.com.alrp.work"), "Description": $(".new-list input").val()})
            .then(function(response){
                console.log(response);
            id = $scope.lists.length;
            $scope.lists[id] = [];
            $scope.lists[id].index = id;
            $scope.lists[id].id = response.data.id;
            $scope.lists[id].name = response.data.description;
            $scope.lists[id].items = [];
            $(".new-list")[0].reset();
            $(".new-list input").blur();    
        });
    }
    $scope.newItem = function(id, index){
       
        if($(".new-item[name='" + index + "'] input").val() == "")
            return false;
        repeat = false;
        for(var a in $scope.lists[index].items){
            if($scope.lists[index].items[a].name == $(".new-item[name='" + index + "'] input").val())
                repeat = true;
        }
        if(repeat)
            return false;
        $http.post($scope.apiUrl+"/task", {"listid": id, "description": $(".new-item[name='" + index + "'] input").val()})
            .then(function(response){
            count = $scope.lists[index].items.length;
            $scope.lists[index].items[count] = [];
            $scope.lists[index].items[count].index = count;
            $scope.lists[index].items[count].id = response.data.id;
            $scope.lists[index].items[count].name = response.data.description;
            $scope.lists[index].items[count].done = "";
            

            $(".new-item[name='" + index + "']")[0].reset();
            $(".new-item[name='" + index + "'] input").blur();
        });
    }
    $scope.done = function(id, item_id){
        var _done = "";
        var isDone = false;
        if($scope.lists[id].items[item_id].done == "")
        {
            $scope.lists[id].items[item_id].done = "done";
            isDone = true;
        }
        else
        {
            $scope.lists[id].items[item_id].done = "";
            isDone = false;
        }

        let _id = $scope.lists[id].items[item_id].id;
        $http.put($scope.apiUrl+"/task/"+_id, {id : _id,description: $scope.lists[id].items[item_id].name, completed: isDone });
        
    }
    $scope.itemRemove = function(id, item_id){
        
        $http.delete($scope.apiUrl+"/task/"+$scope.lists[id].items[item_id].id)
        .then(function (response){
            $scope.lists[id].items.splice(item_id, 1);
        });
        
    }
    $scope.listRemove = function(id){
        console.log($scope.lists);
        $http.delete($scope.apiUrl+"/list?list_id="+$scope.lists[id].id)
        .then(function (response){
            $scope.lists.splice(id, 1);
        });
        
    }
});