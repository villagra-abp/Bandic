app.controller("RolController", function($scope,$http) {
	
	 $scope.getRol = function(){
		 $http.get("../rest/rol").then(function(response){
	    		$scope.respuestaRol = response;
	    	});
	 }
	 
    $scope.addRol = function() {
    		
    	var enviar = {"id": $scope.idRol , "empleado": $scope.empleadoRol};
    
      // var enviar = {"id": $scope.idRol , "empleado": true};
    	$http.put("../rest/rol" , enviar).then(function(response){
	    	$scope.getRol();
	    	console.log(response);
    	});
    };
    
    /* ************ ESTA MIERDA NO FUNCIONA BIEN *********************/
    $scope.editRol = function() {
    	var enviar = {"id": $scope.idRol , "empleado": $scope.empleadoRol};
    	console.log(enviar);
    	$http.post("../rest/rol/"+$scope.idRol,enviar).then(function(response){
	    	console.log(response);
	    	$scope.respuesta=response;
	    	$scope.getRol();
    	});
    }
  
    $scope.deleteRol = function(id) {
    	$http.delete("../rest/rol/" + id).then(function(response){
        	$scope.getRol();
    	});
    }
    
    $scope.getPermiso = function(){
		 $http.get("../rest/rol/permiso/" + $scope.rol).then(function(response){
	    		$scope.respuestaPermisos = response;
	    });
	 }
    
	$scope.addPermiso = function() {
        var enviar = {"rol" : $scope.rol , "permiso" : $scope.permiso};
    	$http.put("../rest/rol/permiso/" + $scope.rol , enviar).then(function(response){
    		console.log(response);
	    	$scope.getPermiso();
    	});
    };
    
    $scope.deletePermiso = function() {
	 	if(confirmDelete("permiso" , $scope.rol , $scope.permiso)){
	 		$http.delete("../rest/rol/permiso/" + $scope.rol + "/" + $scope.permiso).then(function(response){
	         	$scope.getPermiso();
	     	});
	 	}
	 }
    
    function confirmDelete(tabla, rol, permiso) {
        var r = confirm("Seguro que quieres eliminar el " + tabla + " " + permiso + " del rol " + rol);
        if (r)
            return true;
        else
            return false;
    }
    
});