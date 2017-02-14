
/* ************************************ CATEGORIA *******************************************/

app.controller("CategoriaController", function($scope, $http) {
	
	$scope.getCategoria = function(){
		 $http.get("../rest/categoria").then(function(response){
	    		console.log(response);
	    		$scope.respuestaCategoria = response;
	    	});
	 }
	
	function getCategoria(){
		 $http.get("../rest/categoria").then(function(response){
	    		console.log(response);
	    		$scope.respuestaCategoria = response;
	    	});
	}
	
	 $scope.addCategoria = function() {
		 var comestible = $scope.comestible;
		 if($scope.comestible == undefined)
			 $scope.comestible = "false";
		 var enviar = {"id":$scope.nuevaCategoria,"comestible":$scope.comestible};
		 $http.put("../rest/producto/categoria",enviar).then(function(response){
			 console.log(response);
			 $scope.respuesta=response;
			getCategoria();
		 });		 
	 }
	 
	 $scope.newNombre = 1;
	 
	 $scope.editCategoria = function() {
		 var comestible = Math.round(Math.random());
		 
		 if(comestible == 0)
			 var enviar = {"comestible":"true"};
		 else
			 var enviar = {"comestible":"false"};

		 $http.post("../rest/producto/categoria/"+$scope.editCat,enviar).then(function(response){
			 console.log(response);
			 $scope.respuesta=response;
			 $scope.newNombre++;
			 getCategoria();
		 });		 
	 }
	 
	 $scope.deleteCategoria = function($id) {
		 $http.delete("../rest/producto/categoria/"+$id).then(function(response){
			 console.log(response);
			 $scope.respuesta=response;
			 getCategoria();
		 });
	 }
});
