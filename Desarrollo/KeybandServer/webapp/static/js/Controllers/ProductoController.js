app.config(function($routeProvider) {
    $routeProvider
    .when("/detalleProducto/:id", {
        templateUrl : "pages/detalleProducto.html"
    })
    .when("/crearProducto", {
    	templateUrl : "pages/crearProducto.html"
    })
    .when("/editarProducto/:id", {
    	templateUrl : "pages/editarProducto.html"
    })
}),

app.controller("ControllerProducto", function($scope, $http, $routeParams, Upload) {
	/* ************************************ PRODUCTO *******************************************/
	$scope.getProductos = function() {
		$http.get("../rest/producto").then(function(response){
			 console.log(response);
			 $scope.respuesta=response;
		 });
	};
	
	$scope.getDetails = function(){
		$scope.id = $routeParams.id;
		$http.get("../rest/producto/"+$scope.id).then(function(response){
			 console.log(response);
			 $scope.respuestaProducto=response;
			 $scope.nombreEdit = response.data[0].nombre;
			 $scope.descripcionEdit = response.data[0].descripcion;
			 $scope.tweetEdit = response.data[0].tweet;
			 $scope.categoriaEdit = response.data[0].categoria_producto;
			 $scope.estanciaEdit = response.data[0].estancia;
			 $scope.imagen = response.data[0].imagen;
			 $scope.imagen_redes = response.data[0].imagen_redes;
		 });
	};
	
	var id = Math.floor((Math.random() * 1000) + 1);
	
	
	$scope.onFileSelect = function(file) {
		console.log(file);
		    if (!file) return;
		    Upload.upload({
		        url: '../rest/upload.php/?id='+id+'&&method=put&&RRSS=n',
		        data: {file: file, username: $scope.username}
		      }).then(function(resp) {
		        // file is uploaded successfully
		        console.log(resp.data);
		        if(resp.data == "Error en la subida de foto")
		        	document.getElementById("errorUploadfoto").innerHTML = "Por favor, seleccione una foto de menos de 2MB";
		        else {
		        	document.getElementById("errorUploadfoto").innerHTML = "";
		        }
		      });    
    };
    
    $scope.onFileSelectRRSS = function(file) {
		console.log(file);
		    if (!file) return;
		    Upload.upload({
		        url: '../rest/upload.php/?id='+id+'&&method=put&&RRSS=s',
		        data: {file: file, username: $scope.username}
		      }).then(function(resp) {
		        // file is uploaded successfully
		        console.log(resp.data);
		        if(resp.data == "Error en la subida de foto")
		        	document.getElementById("errorUploadfoto").innerHTML = "Por favor, seleccione una foto de menos de 2MB";
		        else {
		        	document.getElementById("errorUploadfoto").innerHTML = "";
		        }
		      });    
    };
    
    $scope.getCategorias = function() {
    	$http.get("../rest/categoria").then(function(response){
			 var categorias = [];
			 angular.forEach(response.data, function(value, key) {
				  categorias.push(value.id);
			 });
			 $scope.categorias = categorias;
		 });
    }
    
    $scope.getEstancias = function() {
    	$http.get("../rest/estancia").then(function(response){
			 var estancias = [];
			 angular.forEach(response.data, function(value, key) {
				  estancias.push(value.id);
			 });
			 $scope.estancias = estancias;
		 });
    }
    
	$scope.addProducto = function() {      
       //put producto
       	var idrandom = id;	
		var image = document.getElementById("fileToUpload").value;
		var imageRRSS = document.getElementById("fileToUploadRRSS").value;
		var filename = image.replace(/^.*\\/, "");
		var filenameRRSS = imageRRSS.replace(/^.*\\/, "");
		//alert(filename);*/
		
		if(!$scope.nombre)
			document.getElementById("sinNombre").innerHTML = "Debes introducir el nombre del producto";
		else {
			var enviar = {"id":idrandom,"nombre": $scope.nombre,"descripcion": $scope.descripcion,
					"precio": $scope.precio,"iva": $scope.iva,"tweet": $scope.tweet,
					"cantidad_disponible": $scope.cantidad_disponible,"categoria_producto":$scope.categoria_producto,"estancia":$scope.estancia,"imagen":filename,
					"imagen_redes":filenameRRSS};
			
			 $http.put("../rest/producto",enviar)
			 
			 .success(function(response){
				 console.log(response);
		    	 $scope.respuesta=response;
			 });
		}
		 
	}

	$scope.onFileSelectEdit = function(file) {
		console.log(file);
		    if (!file) return;
		    Upload.upload({
		        url: '../rest/upload.php/?id='+$routeParams.id+'&&method=post&&RRSS=n',
		        data: {file: file, username: $scope.username}
		      }).then(function(resp) {
		        // file is uploaded successfully
		        console.log(resp.data);
		      });    
    };
    
    $scope.onFileSelectEditRRSS = function(file) {
		console.log(file);
		    if (!file) return;
		    Upload.upload({
		        url: '../rest/upload.php/?id='+$routeParams.id+'&&method=post&&RRSS=s',
		        data: {file: file, username: $scope.username}
		      }).then(function(resp) {
		        // file is uploaded successfully
		        console.log(resp.data);
		      });    
    };

	$scope.editProducto = function() {
		//Coger los parametros asi para editar, con ng-model no va
		var nombre = document.getElementById("nombre").value;
		var descripcion = document.getElementById("descripcion").value;
		var precio = document.getElementById("precio").value;
		var iva = document.getElementById("iva").value;
		var tweet = document.getElementById("tweet").value;
		var cantidad_disponible = document.getElementById("cantidad_disponible").value;
		
		var categoria = document.getElementById("categoria_producto").value.split(":");
		var categoria_producto = categoria[1];
		var est = document.getElementById("estancia").value.split(":");
		var estancia = est[1];
		$scope.id = $routeParams.id;
		//////////////////////////////////////////////////////////////
		var foto = document.getElementById("fileToUploadEdit").value;
		var fotoRRSS = document.getElementById("fileToUploadEditRRSS").value;
		var filename = foto.replace(/^.*\\/, "");
		var filenameRRSS = fotoRRSS.replace(/^.*\\/, "");
		var enviar = {};
		
		if(filename == "" && filenameRRSS != "") {
			enviar = {"id": $scope.id,"nombre": nombre,"descripcion": descripcion,
				"precio": precio,"iva": iva,"tweet": tweet,
				"cantidad_disponible": cantidad_disponible,"categoria_producto":categoria_producto,"estancia":estancia, "imagen_redes":filenameRRSS};
		}
		else if(filename != "" && filenameRRSS == "") {
			enviar = {"id": $scope.id,"nombre": nombre,"descripcion": descripcion,
					"precio": precio,"iva": iva,"tweet": tweet,
					"cantidad_disponible": cantidad_disponible,"categoria_producto":categoria_producto,"estancia":estancia, "imagen":filename};
		}
		else if(filename!= "" && filenameRRSS != "") {
			enviar = {"id": $scope.id,"nombre": nombre,"descripcion": descripcion,
					"precio": precio,"iva": iva,"tweet": tweet,
					"cantidad_disponible": cantidad_disponible,"categoria_producto":categoria_producto,"estancia":estancia, "imagen":filename, "imagen_redes":filenameRRSS};
		}
		else {
			enviar = {"id": $scope.id,"nombre": nombre,"descripcion": descripcion,
					"precio": precio,"iva": iva,"tweet": tweet,
					"cantidad_disponible": cantidad_disponible,"categoria_producto":categoria_producto,"estancia":estancia};
		}
		
		$http.post("../rest/producto/"+$scope.id,enviar).then(function(response){
			 console.log(response);
			 $scope.respuesta=response;
			 $scope.newNombre++;
		 });
	}
	

	$scope.deleteProducto = function(id) {
	    Upload.upload({
	        url: '../rest/upload.php/?id='+id+'&&method=delete',
	        data: {file: 'undefined', username: $scope.username}
	      }).then(function(resp) {
	        // file is uploaded successfully
	        console.log(resp.data);
	      });
	    
		$http.delete("../rest/producto/"+id).then(function(response){
			console.log(response);
			$scope.respuesta=response;
			$scope.getProductos();
		}); 
	}
		/*****ASIGNAR PRODUCTO******/
	
		$scope.asignarProducto = function() {
			var enviar = {"usuario":$scope.asigUsuario,"producto":$scope.asigProducto};
			$http.put("../rest/producto/empleado",enviar).then(function(response){
				 console.log(response);
				 //$scope.respuesta=response;
			 });
		}
		
		$scope.getProductosReservables = function() {
			$http.get("../rest/producto/reservable").then(function(response){
				 console.log(response);
				 $scope.respuestaReservables=response;
			 });
		}
		
		$scope.reservarProducto = function(id) {
			var enviar = {"usuario":$scope.reservaUsuario,"producto":id};
			$http.put("../rest/producto/usuario",enviar).then(function(response){
				 console.log(response);
			 });
		}
		
	});
