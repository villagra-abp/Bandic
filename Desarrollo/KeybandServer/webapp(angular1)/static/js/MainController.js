var app = angular.module("myApp", ['ngRoute','ngFileUpload', 'ngSanitize']);

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
    .when("/restorepassword", {
        templateUrl : "pages/restorepassword.html"
    })
    
    .when("/promocion", {
        templateUrl : "pages/promocion.html"
    })
    .when("/ticket", {
    	templateUrl : "pages/ticket.html"
    })
});

app.controller("myCtrl", function($scope,$http,$location) {
	
    /* ************************************ LOGIN - TOKEN  *******************************************/
	
	function cambiarToken($token){
	    	config = {headers: {
	       	  	'Authorization': $token
	       	  }
	        };
	 }
  
    $scope.login = function(){
            var enviar = {"dni":$scope.dni,"password":$scope.password};  
            $http.post("../rest/login",enviar).success(function(response,headers){     
            	console.log(response);  
              //$scope.respuesta = response; 
            	sessionStorage["usertoken"] = response[0].token;
            	cambiarToken(sessionStorage["usertoken"]);
                console.log(sessionStorage["usertoken"]); 
            });
            
    }
    
    $scope.restorePassword = function(){
        var enviar = {"email":$scope.restorepassword};  
        $http.post("../rest/login/password",enviar).success(function(response,headers){     
        	console.log(response);  
        });
    }
    
    $scope.updatePassword = function() {
    	//console.log($location.absUrl());
    	//console.log($location.absUrl().split('?').pop());
    	var enviar = {token:$location.absUrl().split('?').pop(),password:$scope.updatepassword};
        $http.post("../rest/login/passwordrestore",enviar).then(function(response,headers){     
        	console.log(response);  
        });
    }
});



