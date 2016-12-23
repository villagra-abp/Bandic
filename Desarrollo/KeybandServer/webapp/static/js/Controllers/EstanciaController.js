    /* ************************************ ESTANCIA *******************************************/
app.config(function($routeProvider) {
    $routeProvider
    .when("/detalleEstancia/:id", {
        templateUrl : "pages/detalleEstancia.html",
    })
}),

app.controller("EstanciaController", function($scope,$http, $routeParams) {    
    $scope.getEstancias = function(){
    	$http.get("../rest/estancia").then(function(response){
    		console.log(response);
    		$scope.respuestaEstancia = response;
    	});
    }
    
    $scope.getPublicas = function(){
    	$http.get("../rest/estancia?publica=t").then(function(response){
    		console.log(response);
    		$scope.respuestaEstancia = response;
    	});
    }
    
    $scope.getPrivadas = function(){
    	$http.get("../rest/estancia?publica=f").then(function(response){
    		console.log(response);
    		$scope.respuestaEstancia = response;
    	});
    }
    
    
    $scope.addEstancia = function() {
			    	var idrandom = Math.floor((Math.random() * 100) + 1);
			    	var publica  = $scope.publica;
			    	
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
			    	
			    	var enviar = {"id":$scope.id + idrandom, "capacidad":$scope.capacidad, "publica":$scope.publica, "descripcion": $scope.descripcion}; 
			    	if($scope.publica  == "true"){
				    	$http.put("../rest/estancia",enviar).then(function(response){
				    		//console.log(response);		
				    		$scope.getPublicas();
				    	});		
			    	}
			    	if($scope.publica  == "false"){
				    	$http.put("../rest/estancia",enviar).then(function(response){
				    				//console.log(response);
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
    		 	var enviar = {"id":$scope.id, "capacidad":$scope.capacidad, "publica":$scope.publica, "descripcion": $scope.descripcion}; 
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
    			
    			var enviar = {"id":$scope.id, "capacidad":$scope.capacidad, "publica":$scope.publica, "descripcion": $scope.descripcion}; 

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
    
    $scope.deleteEstancia = function(id) {
    	if(confirmDelete("estancia", "identificador", id)){
	    	$http.get("../rest/estancia/" + id).then(function(response){
	    		if(response.data[0].publica == 'f'){
	    			$http.delete("../rest/estancia/" + id).then(function(response){
	    	    		console.log(response);
	    	        	$scope.respuesta=response;
	    	        	$scope.getPrivadas();
	    	    	});
	    		}
	    		else{
	    			$http.delete("../rest/estancia/" + id).then(function(response){
	    	    		console.log(response);
	    	        	$scope.respuesta=response;
	    	        	$scope.getPublicas();
	    	    	});
	    		}	
	    	});
    	}
    }
    
    function confirmDelete(tabla, id, valor) {
        var r = confirm("Seguro que desea eliminar la " + tabla + " con el " + id + ": " + valor);
        if (r)
            return true;
        else
            return false;
    }
    
    $scope.getEstanciaById = function(){
        $http.get("../rest/estancia/"+$scope.byid).then(function(response){     
        
        	$scope.respuestaEstancia = response; 
        	console.log($scope.respuestaEstancia);
        });
    }
    
    $scope.getAforoById = function() {
    	$http.get("../rest/estancia/aforo/" + $scope.idaforo).then(function(response){
        	$scope.respuesta=response.data[0].count;
        	var actual = response.data[0].count;
        	$scope.getDatosAdicionales($scope.idaforo, actual);
    	});	
    }
    
    $scope.getDatosAdicionales = function(id, actual) {
    	$http.get("../rest/estancia/capacidad/" + id).then(function(response){
    		var capacidad = response.data[0].capacidad;
    		var percen = ((actual*100)/capacidad);
    		var total = percen.toFixed(2);
    		$scope.porcentaje = total + '%';
        	$scope.respuestaAforo = response;
    	});	
    }
    
    $scope.getDetallesEstancia = function() {
    	$scope.id = $routeParams.id;
    	$http.get("../rest/estancia/"+$scope.id).then(function(response){
    		console.log(response);
    		$scope.respuestaDetalle = response;
    		var id = $scope.id;
    		$scope.getDatosMesDetalle(id);
    	});	
    }
    
    $scope.getDatosMes = function() {
    	$http.get("../rest/estancia/accesoestancia/" + $scope.idmes).then(function(response){
    		
    		var respuestaMes = [];  
    		var total = 0;		
    		var numero = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    		var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    		var visitas = [0,0,0,0,0,0,0,0,0,0,0,0];	
    		
    		for(var i = 0; i<response.data.length;i++){
    			var fecha = response.data[i].hora_salida;
        		var split = fecha.split("-");   
        		
        		for(var j=0; j<numero.length;j++){
        			if(split[1]==numero[j]){
        				visitas[j]++;
        			}
        		}
    		}
    		for(var b=0; b<meses.length;b++){
    			if(visitas[b]!=0){
    				total = visitas[b] + total;
    				respuestaMes.push({mes: meses[b],visitas:visitas[b]});
    			}
    		}
    		$scope.respuestaMes = respuestaMes;
    		$scope.respuestaMes.push({mes:"Total visitas", visitas: total});
    	});	
    }
    
    $scope.getDatosMesDetalle = function(id) {
    	$http.get("../rest/estancia/accesoestancia/" + id).then(function(response){
    		
    		var respuestaMes = [];  
    		var total = 0;		
    		var numero = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    		var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    		var visitas = [0,0,0,0,0,0,0,0,0,0,0,0];	
    		
    		for(var i = 0; i<response.data.length;i++){
    			var fecha = response.data[i].hora_salida;
        		var split = fecha.split("-");   
        		
        		for(var j=0; j<numero.length;j++){
        			if(split[1]==numero[j]){
        				visitas[j]++;
        			}
        		}
    		}
    		for(var b=0; b<meses.length;b++){
    			if(visitas[b]!=0){
    				total = visitas[b] + total;
    				respuestaMes.push({mes: meses[b],visitas:visitas[b]});
    			}
    		}
    		$scope.respuestaMes = respuestaMes;
    		$scope.respuestaMes.push({mes:"Total visitas", visitas: total});
    	});	
    }
   
});


