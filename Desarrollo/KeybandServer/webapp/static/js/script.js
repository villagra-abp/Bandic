var app = angular.module("myApp", []); 

var config;

app.controller("myCtrl", function($scope,$http) {
	
	function cambiarToken($token){
	    	config = {headers: {
	       	  	'Authorization': $token
	       	  }
	        };
	 }
  
    $scope.login = function(){
            var enviar = {"dni":$scope.dni,"password":$scope.password};  
            $http.post("../../rest/login",enviar).success(function(response,headers){     
            	console.log(response);  
              //$scope.respuesta = response; 
            	sessionStorage["usertoken"] = response.token;
            	cambiarToken(sessionStorage["usertoken"]);
                console.log(sessionStorage["usertoken"]); 
            });
            
    }
     
    $scope.listarUsuarios = function(){
  
        $http.get("../../rest/usuario",config).success(function(response){     
        	console.log(config); 
        	console.log(response);
        	sessionStorage["usertoken"] = response[1].token;
        	cambiarToken(sessionStorage["usertoken"]);
        	//console.log(sessionStorage["usertoken"]); 
        	
        	$scope.respuesta = response; 
        });
    }
    
	var dnirandom = Math.floor((Math.random() * 10000) + 1);

    $scope.nombre=0;
    $scope.addUsuario = function() {
    	
    	var dnirandom = Math.floor((Math.random() * 10000) + 1);
        var enviar = {"dni":dnirandom,"nombre":"Prueba"	,"apellidos":"deSamu",
        	    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
        	    "provincia":"Alicante","rol":"Cliente","estancia":null,
        	    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"};
    	$http.put("../../rest/usuario",enviar).then(function(response){
	    	console.log(response);
	    	$scope.nombre++;
	    	$scope.respuesta=response;
    	});
    };
    $scope.addPulsera = function() {
        var enviar = {"id": "8034", "usuario": null, "estado_pulsera": "Desactivada"};
    	$http.put("../../rest/pulsera",enviar).then(function(response){
	    	console.log(response);
	    	$scope.insetarPulsera=response;
    	});
    };
    $scope.addRol = function() {
        var enviar = {"id": dnirandom, "empleado": true};
    	$http.put("../../rest/rol",enviar).then(function(response){
	    	console.log(response);
	    	$scope.insetarRol=response;
    	});
    };
    
    $scope.editUsuario = function() {
    	var camporandom = Math.floor((Math.random() * 10000) + 1);

        var enviar = {"dni":$scope.actualizarUsuario,"nombre":"UpdatePrueba","apellidos":camporandom,
        	    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
        	    "provincia":"Alicante","rol":"Cliente","estancia":null,
        	    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"};
    	    $http.post("../../usuario/"+$scope.actualizarUsuario,enviar).then(function(response){
    	console.log(response);
    	$scope.respuesta=response;

    });
    	
    }
    
    $scope.editPulsera= function() {
        var enviar = {"id":$scope.actualizarPulsera,"usuario": null, "estado_pulsera": "Activada"};
    	    $http.post("../../rest/pulsera/"+$scope.actualizarPulsera,enviar).then(function(response){
    	console.log(response);
    	$scope.respuesta=response;

    });
    	
    }
    
    $scope.deleteUsuario = function() {
    	$http.delete("../../rest/usuario/"+$scope.borrar).then(function(response){
    		console.log(response);
        	$scope.respuesta=response;

    	});
    	
    }
    $scope.deletePulsera = function() {
    	$http.delete("../../rest/pulsera/"+$scope.borrarPulsera).then(function(response){
    		console.log(response);
        	$scope.respuesta=response;

    	});
    	
    }
    $scope.deleteRol = function() {
    	$http.delete("../../rest/rol/"+$scope.borrarRol).then(function(response){
    		console.log(response);
        	$scope.respuesta=response;

    	});
    	
    }
$scope.addEstancia = function() {
    	
    	var idrandom = Math.floor((Math.random() * 10000) + 1);

    	var enviar = {"id":$scope.id + idrandom, "capacidad":$scope.capacidad, "publica":$scope.publica}; 
    	
    	$http.put("../../rest/estancia",enviar).then(function(response){
    	console.log(response);
    });
    	
    };
    
    $scope.editEstancia = function() {
   	
    	var enviar = {"id":$scope.idedit, "capacidad":$scope.capacidad, "publica":$scope.publica}; 

    	$http.post("../../rest/estancia/"+$scope.idedit,enviar).then(function(response){
    	console.log(response);
    	$scope.respuesta=response;

    	    });	
    }
    
    $scope.deleteEstancia = function() {
    	$http.delete("../../rest/estancia/"+$scope.iddelete).then(function(response){
    		console.log(response);
        	$scope.respuesta=response;

    	});
    	
    }
    $scope.getAforoById = function() {
    	$http.get("../../rest/estancia/aforo/"+$scope.idaforo).then(function(response){
    		console.log(response);
        	$scope.respuestaAforo=response;

    	});
    	
    }
    $scope.pruebas = function(){
    	//get usuarios
    	$http.get("../../rest/usuario").then(function(response){
    		console.log(response);
    		$scope.respuestaUsuarios = response;
    	});
    	$http.get("../../rest/pulsera").then(function(response){
    		console.log(response);
    		$scope.respuestaPulseras = response;
    	});
    	$http.get("../../rest/rol").then(function(response){
    		console.log(response);
    		$scope.respuestaRol = response;
    	});
    }
});