var app = angular.module("myApp", []); 


app.controller("myCtrl", function($scope,$http) {
/*   $http.get("http://localhost/SampleWS/rest/usuario").then(function (response) {
      console.log(response);
    });*/
	var dnirandom = Math.floor((Math.random() * 10000) + 1);
    var enviar = {"dni":"3674","nombre":"UpdatePrueba","apellidos":"deSamu",
    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
    "provincia":"Alicante","rol":"Cliente","estancia":null,
    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"};
    
    $http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/3674").then(function(response){
    	console.log(response);
    });
/*    $http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario",enviar).then(function(response){
    	console.log(response);
    });*/
 /*   $http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario",enviar).then(function(response){
    	console.log(response);
    });*/
});