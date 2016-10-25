var app = angular.module("myApp", []); 


app.controller("myCtrl", function($scope,$http) {
/*   $http.get("http://localhost/SampleWS/rest/usuario").then(function (response) {
      console.log(response);
    });*/

    $scope.nombre=0;
    $scope.addUsuario = function() {
    	var dnirandom = Math.floor((Math.random() * 10000) + 1);

        var enviar = {"dni":dnirandom,"nombre":$scope.nombre,"apellidos":"deSamu",
        	    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
        	    "provincia":"Alicante","rol":"Cliente","estancia":null,
        	    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"};
    	   $http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario",enviar).then(function(response){
    	console.log(response);
    	$scope.nombre++;
    	$scope.respuesta=response;
    });
    	
    };
    
    $scope.editUsuario = function() {
    	var camporandom = Math.floor((Math.random() * 10000) + 1);

        var enviar = {"dni":$scope.actualizar,"nombre":"UpdatePrueba","apellidos":camporandom,
        	    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
        	    "provincia":"Alicante","rol":"Cliente","estancia":null,
        	    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"};
    	    $http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/"+$scope.actualizar,enviar).then(function(response){
    	console.log(response);
    	$scope.respuesta=response;

    });
    	
    }
    
    $scope.deleteUsuario = function() {
    	$http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/"+$scope.borrar).then(function(response){
    		console.log(response);
        	$scope.respuesta=response;

    	});
    	
    }
});