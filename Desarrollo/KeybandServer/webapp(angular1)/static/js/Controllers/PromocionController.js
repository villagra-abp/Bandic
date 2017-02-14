    /* ************************************ PULSERA *******************************************/
app.controller("PromocionController", function($scope,$http) {   

	CKEDITOR.replace( 'desc' );
	
$scope.addPromocion = function() {
	
	$scope.descripcionPromocion=CKEDITOR.instances.desc.getData();
	
	console.log($scope.descripcionPromocion);
     var enviar = {"id": $scope.idPromocion, "titulo": $scope.tituloPromocion, "descripcion": $scope.descripcionPromocion};
      
        $http.put("../rest/promocion",enviar).then(function(response){
	    	console.log(response);
	    	$scope.insetarPromocion=response;
	    	$scope.getPromociones();
    	});
    };
    
    $scope.getPromociones = function(){
    	$http.get("../rest/promocion").then(function(response){
    		console.log(response);
    		$scope.respuestaPromociones = response;
    	
    	});
    }
    

    
	$scope.editPromocion = function() {
		$scope.descripcionPromocion=CKEDITOR.instances.desc.getData();
        var enviar = {"id": $scope.idPromocion, "titulo": $scope.tituloPromocion, "descripcion": $scope.descripcionPromocion};
    	console.log(enviar);
        $http.post("../rest/promocion/"+$scope.idPromocion,enviar).then(function(response){
	    	console.log(response);
	    	$scope.respuesta=response;
	    	$scope.getPromociones();
    	});
	    	    
	    }
	 
	
	 $scope.deletePromocion = function(id) {
	 	if(confirmDelete("promocion", "id", id)){
	 		$http.delete("../rest/promocion/"+id).then(function(response){
	     		console.log(response);
	         	$scope.promocion=response;
	         	$scope.getPromociones();
	
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