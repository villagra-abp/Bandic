    /* ************************************ ESTANCIA *******************************************/
app.controller("EstanciaController", function($scope,$http) {    
    $scope.getEstancias = function(){
    	$http.get("../rest/estancia").then(function(response){
    		console.log(response);
    		$scope.respuestaEstancia = response;
    	});
    }
    
    $scope.getPublicas = function(){
    	$http.get("../rest/estancia?publica=t").then(function(response){
    		//console.log(response);
    		$scope.respuestaEstancia = response;
    	});
    }
    
    $scope.getPrivadas = function(){
    	$http.get("../rest/estancia?publica=f").then(function(response){
    		//console.log(response);
    		$scope.respuestaEstancia = response;
    	});
    }
    
    
    $scope.addEstancia = function() {
			    	var idrandom = Math.floor((Math.random() * 100) + 1);
			    	var publica  = $scope.publica;
			    	
			    	console.log
			    	
			    	if($scope.publica == undefined){
						 $scope.publica  = "false";
					}
					else if($scope.publica == true){
						 $scope.publica  = "true";
					}
					else if($scope.publica == false){
						 $scope.publica  = "false";
					}
					else if($scope.publica == 'true'){
						 $scope.publica  = "false";
					}
			    	
			    	var enviar = {"id":$scope.id + idrandom, "capacidad":$scope.capacidad, "publica":$scope.publica}; 
			    	if($scope.publica  == "true"){
				    	$http.put("../rest/estancia",enviar).then(function(response){
				    		console.log(response);		
				    		$scope.getPublicas();
				    	});		
			    	}
			    	if($scope.publica  == "false"){
				    	$http.put("../rest/estancia",enviar).then(function(response){
				    				console.log(response);
				    				$scope.getPrivadas();
				    	});		
			    	}
    }
    
    $scope.editEstancia = function() {
    	$http.get("../rest/estancia/"+$scope.id).then(function(response){
    		if(response.data[0].publica == 'f'){
    			var publica  = $scope.publica;
    			 if($scope.publica == undefined)
    				 $scope.publica  = "false";
    			 else
    				 $scope.publica  = "true";
    		 	var enviar = {"id":$scope.id, "capacidad":$scope.capacidad, "publica":$scope.publica}; 
    	    	$http.post("../rest/estancia/"+$scope.id,enviar).then(function(response){
    	    		$scope.respuesta=response;
    	    		if(response.statusText!='OK')
		    			console.log(response);
		    		else
		    			$scope.getPrivadas();
    	    	});
    		}
    		else{
    			var publica  = $scope.publica;
    			if($scope.publica == undefined)
    				 $scope.publica  = "false";
    			else
    				 $scope.publica  = "true";
    			
    			var enviar = {"id":$scope.id, "capacidad":$scope.capacidad, "publica":$scope.publica}; 

    	    	$http.post("../rest/estancia/"+$scope.id,enviar).then(function(response){
    	    		$scope.respuesta=response;
    	    		if(response.statusText!='OK')
		    			console.log(response);
		    		else
		    			$scope.getPublicas();
    	    	});	
    		}
    	});
    }
    
    $scope.deleteEstancia = function($id) {
    	if(confirmDelete("estancia", "identificador", $id)){
	    	$http.get("../rest/estancia/"+$id).then(function(response){
	    		if(response.data[0].publica == 'f'){
	    			$http.delete("../rest/estancia/"+$id).then(function(response){
	    	    		console.log(response);
	    	        	$scope.respuesta=response;
	    	        	$scope.getPrivadas();
	    	    	});
	    		}
	    		else{
	    			$http.delete("../rest/estancia/"+$id).then(function(response){
	    	    		console.log(response);
	    	        	$scope.respuesta=response;
	    	        	$scope.getPublicas();
	    	    	});
	    		}	
	    	});
    	}
    }
    $scope.getAforoById = function() {
    	$http.get("../rest/estancia/aforo/"+$scope.idaforo).then(function(response){
        	$scope.respuesta=response.data[0].count;
        	$scope.getDatosAdicionales($scope.idaforo);
    	});	
    }
    
    $scope.getDatosAdicionales = function($id) {
    	$http.get("../rest/estancia/capacidad/"+$id).then(function(response){
    		console.log(response);
        	$scope.respuestaAforo=response;
    	});	
    }
    
    function confirmDelete(tabla, id, valor) {
        var r = confirm("Seguro que desea eliminar la " + tabla + "con el " + id + ": " + valor);
        if (r)
            return true;
        else
            return false;
    }
});