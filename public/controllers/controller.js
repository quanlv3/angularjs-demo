var myApp = angular.module('myApp',["ngRoute"]);
/*myApp.config(function($routeProvider){
  $routeProvider.when('/',{
    redirectTo: function(routeParams, path, query_string){
      console.log(routeParams);
      console.log(path);
      console.log(query_string);
    }
  }).when('detail',{
    redirectTo: function(routeParams, path, query_string){
       console.log(routeParams);
       console.log(path);
       console.log(query_string);
    }
  })
})*/
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/contactlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";

  });
};

$scope.sortField = 'number';
$scope.reverse = true;

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);

/*
myApp.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Move on login page");

}]);*/
