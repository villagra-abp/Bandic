var app = angular.module("myApp", []); 


app.controller("myCtrl", function($scope,$http) {
   $http.get("http://localhost/SampleWS/rest/usuario").then(function (response) {
      console.log(response);
    });
    var enviar={
    	usu:"us",
    	pw:"passw"
    };
    $http.post("http://localhost/SampleWS/rest/login",enviar).then(function(response){
    	console.log(response);
    });
});