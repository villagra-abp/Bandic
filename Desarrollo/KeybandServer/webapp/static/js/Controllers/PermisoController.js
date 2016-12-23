app.controller("PermisoController", function($scope,$http) {
    /* ************************************ PERMISOS *******************************************/
    $scope.comprobarPermiso = function(){
    	$http.get("../rest/permiso/"+ $scope.usuario+ "/" + $scope.accion + "").then(function(response){
    		console.log(response);
    		$scope.respuestaPermisos = response;
    	});
    }
    
    $scope.addPermiso = function() {
        var enviar = {"id": $scope.idPermiso, "descripcion": $scope.descripcionPermiso};
    	$http.put("../rest/permiso", enviar).then(function(response){
	    	console.log(response);
	    	$scope.insetarPermiso = response;
	    	$scope.getPermisos();
    	});
    };
    
    $scope.getPermisos = function(){
    	$http.get("../rest/permiso").then(function(response){
    		console.log(response);
    		$scope.respuestaPermiso = response;
    	});
    }
    
    $scope.editPermiso = function() {
        var enviar = {"id":$scope.idPermiso,"descripcion": $scope.descripcionPermiso};
        console.log(enviar);
    	$http.post("../rest/permiso/"+$scope.idPermiso,enviar).then(function(response){
	    	console.log(response);
	    	$scope.respuesta = response;
	    	$scope.getPermisos();
    	});
    }
    
    $scope.deletePermiso = function(id) {
	 	if(confirmDelete("permiso", "id", id)){
	 		$http.delete("../rest/permiso/"+id).then(function(response){
	     		console.log(response);
	         	$scope.respuesta=response;
	         	$scope.getPermisos();
	     	});
	 	}
	 }
	 
	 function confirmDelete(tabla, id, valor) {
	        var r = confirm("Seguro que quieres eliminar " + tabla + " con " + id + ": " + valor);
	        if (r)
	            return true;
	        else
	            return false;
	    }
});