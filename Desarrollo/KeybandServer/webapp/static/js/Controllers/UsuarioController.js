app.controller("UsuarioController", function($scope,$http) {
	
    $scope.listarUsuarios = function(){
        $http.get("../rest/usuario",config).success(function(response){     
        	console.log(response);
        	$scope.respuesta = response; 
        });
    }
    $scope.usuarioById = function(){
        $http.get("../rest/usuario/"+$scope.byid).success(function(response){     
        	console.log(response);

        	$scope.respuesta = response; 
        });
    }
    
    $scope.filtrarUsuarios = function(){
    	var url= constructURL();
        $http.get("../rest/usuario"+url,config).success(function(response){     
        	console.log(response);

        	$scope.respuesta = response; 
        });
    }
	var dnirandom = Math.floor((Math.random() * 10000) + 1);
    $scope.addUsuario = function() {
    	
        var enviar = {"dni":$scope.dni,"nombre":$scope.nombre,"apellidos":$scope.apellidos,
        	    "sexo":$scope.sexo,"pais":$scope.pais,"localidad":$scope.localidad,
        	    "provincia":$scope.provincia,"rol":$scope.rol,"estancia":$scope.estancia,
        	    "empleado":$scope.empleado,"email":$scope.email,"fecha_nacimiento":$scope.fecha, "fecha_entrada":"11-12-2000", "fecha_salida":"11-12-2000"};
    	$http.put("../rest/usuario",enviar).then(function(response){
	    	console.log(response);
	    	$scope.listarUsuarios();
    	});
    };
    
    $scope.editUsuario = function() {
        var enviar = {"dni":$scope.dni,"nombre":$scope.nombre,"apellidos":$scope.apellidos,
        	    "sexo":$scope.sexo,"pais":$scope.pais,"localidad":$scope.localidad,
        	    "provincia":$scope.provincia,"rol":$scope.rol,"estancia":$scope.estancia,
        	    "empleado":$scope.empleado,"email":$scope.email,"fecha_nacimiento":$scope.fecha, "fecha_entrada":"11-12-2000", "fecha_salida":"11-12-2000"};

        $http.post("../rest/usuario/"+$scope.dni,enviar).then(function(response){
    	    	$scope.listarUsuarios();

        });
    };
    
    $scope.deleteUsuario = function(id) {
    	if(confirmDelete("usuario","id",id))
	    	$http.delete("../rest/usuario/"+id).then(function(response){
	    		console.log(response);
	    		$scope.listarUsuarios();
	    	});
    };
    
    $scope.getRoles = function() {
    	$http.get("../rest/usuario/rol/" + $scope.dni).then(function(response){
    		$scope.roles = response;
    	});
    }
    
    $scope.addRol = function() {
        var enviar = {"usuario" : $scope.dniRol, "rol" : $scope.rol};
    	$http.put("../rest/usuario/rol/" + $scope.dniRol, enviar).then(function(response){
	    	$scope.getRoles();
    	});
    };
    
    $scope.deleteRol = function() {
	 	if(confirmDelete("rol", $scope.rol, $scope.dniRol)){
	 		$http.delete("../rest/usuario/rol/" + $scope.dniRol + "/" + $scope.rol).then(function(response){
	         	$scope.getRoles();
	     	});
	 	}
	 }
    
    function confirmDelete(tabla, rol, dni) {
        var r = confirm("Seguro que quieres eliminar el " + tabla +" " + rol + " del usuario " + dni);
        if (r)
            return true;
        else
            return false;
    }
    
    function constructURL(enviar){
        var enviare = {"dni":$scope.dni,"nombre":$scope.nombre,"apellidos":$scope.apellidos,
        	    "sexo":$scope.sexo,"pais":$scope.pais,"localidad":$scope.localidad,
        	    "provincia":$scope.provincia,"rol":$scope.rol,"estancia":$scope.estancia,
        	    "empleado":$scope.empleado,"email":$scope.email,"fecha_nacimiento":$scope.fecha,
        	    "order":$scope.order,"by":$scope.by,"initrow":$scope.initrow,"pagesize":$scope.pagesize};

    	var url = "?";
    	var i = 0;
    	for (var obj in enviare){
    		if(enviare[obj]){
    			if(i>0)
    				url+="&";
    			url+=obj+"="+enviare[obj];
    		}
    	    i++;
    	}
    	if(url!="?")
    		return url;
    	else
    		return "";
    }
    
});