    /* ************************************* PULSERA *******************************************/
app.controller("PulseraController", function($scope,$http) {   
    $scope.addPulsera = function() {
        var enviar = {"id": $scope.idPulsera, "usuario": $scope.usuarioPulsera, "estado_pulsera": $scope.estado_pulsera.id};
    	$http.put("../rest/pulsera", enviar).then(function(response){
	    	console.log(response);
	    	$scope.insetarPulsera = response;
	    	$scope.getPulseras();
    	});
    };
    
    $scope.getPulseras = function(){
    	$http.get("../rest/pulsera").then(function(response){
    		console.log(response);
    		$scope.respuestaPulseras = response;
    		$scope.getEstados();
    	});
    }
    
    $scope.getEstados = function() {
    	$http.get("../rest/pulsera/estado").then(function(response){
    		console.log(response);
    		$scope.estados = response;
    	});
    }
    
	 $scope.editPulsera = function() {
	        var enviar = {"id":$scope.idPulsera,"usuario": $scope.usuarioPulsera,"estado_pulsera": $scope.estado_pulsera.id};
	        console.log(enviar);
	    	$http.post("../rest/pulsera/"+$scope.idPulsera,enviar).then(function(response){
		    	console.log(response);
		    	$scope.respuesta = response;
		    	$scope.getPulseras();
	    	});
	    }
	
	 $scope.deletePulsera = function(id) {
	 	if(confirmDelete("pulsera", "id", id)){
	 		$http.delete("../rest/pulsera/"+id).then(function(response){
	     		console.log(response);
	         	$scope.respuesta=response;
	         	$scope.getPulseras();
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