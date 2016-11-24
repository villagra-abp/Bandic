var app = angular.module("myApp", ['ngRoute','ngFileUpload']);

var config;
app.config(function($routeProvider) {
    $routeProvider
    .when("/usuario", {
        templateUrl : "pages/usuario.html"
    })
    .when("/categoria", {
        templateUrl : "pages/categoria.html"
    })
    .when("/estancia", {
        templateUrl : "pages/estancia.html"
    })
    .when("/login", {
        templateUrl : "pages/login.html"
    })
    .when("/permiso", {
        templateUrl : "pages/permiso.html"
    })
    .when("/producto", {
        templateUrl : "pages/producto.html"
    })
    .when("/pulsera", {
        templateUrl : "pages/pulsera.html"
    })
    .when("/rol", {
        templateUrl : "pages/rol.html"
    })
});

app.controller("myCtrl", function($scope,$http) {
	
    /* ************************************ LOGIN - TOKEN  *******************************************/
	
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
            	sessionStorage["usertoken"] = response[0].token;
            	cambiarToken(sessionStorage["usertoken"]);
                console.log(sessionStorage["usertoken"]); 
            });
            
    }
});



