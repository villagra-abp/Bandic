<?php
require_once "./Services/ProductoService.php";

/***********************************************PRODUCTO****************************************/
class ProductoResource{

	public static function methodProducto($method,$type){
		switch ($method) {
			case 'GET'://consulta
				ProductoResource::getProducto($type);
				break;
			case 'POST'://inserta
				ProductoResource::postProducto($type);
				break;
			case 'PUT'://actualiza			
				ProductoResource::putProducto($type);
				break;
			case 'PATH'://actualiza
				ProductoResource::pathProducto($type);
				break;
			case 'DELETE'://elimina
				ProductoResource::deleteProducto($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*todas estas filtran por argumentos, ir aÃ±adiendo if o switch conforme vayan saliendo peticiones*/
	public static function getProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				$params = SupportResource::getParams(1);
				
				//Extraigo los parï¿½metros de order,filtros y de paginaciï¿½n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(ProductoResource::ValidGet($where))
					$dataArray = ProductoService::getProductos($where,$order,$pagination);
				break;
			case '2':
				$dataArray = ProductoService::getProductoById($_GET['resource2']);
				break;
			case '4':
				if($_GET['resource2'] == "reservable") {
					$params = SupportResource::getParams(2);
					
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where = SupportResource::extractWhere($params);
					if(ProductoResource::ValidGet($where))
						$dataArray = ProductoService::getProductosReservables($where,$order,$pagination);
				}
				if($_GET['resource2'] == "categoria") {
					$params = SupportResource::getParams(2);
					
					//Extraigo los parï¿½metros de order,filtros y de paginaciï¿½n que me interesan
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where = SupportResource::extractWhere($params);
					if(CategoriaResource::ValidGet($where))
						$dataArray = CategoriaService::getCategorias($where,$order,$pagination);
				}
				if($_GET['resource2'] == "tpv") {
					$params = SupportResource::getParams(2);
						
					//Extraigo los parï¿½metros de order,filtros y de paginaciï¿½n que me interesan
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where = SupportResource::extractWhere($params);
					if(ProductoResource::ValidGet($where))
						$dataArray = ProductoService::getProductosTpv($where,$order,$pagination);
				}
				
				break;		
			case '5':
				$params = SupportResource::getParams(3);
					
				//Extraigo los parï¿½metros de order,filtros y de paginaciï¿½n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				
				if($_GET['resource2'] == "categoria") {
					$where['categoria_producto'] = $_GET['resource3'];
					$dataArray = ProductoService::getProductos($where,$order,$pagination);
				}
				if($_GET['resource2'] == "empleado") {
					$where['usuario'] = $_GET['resource3'];
					$dataArray = ProductoService::getProductosAsignados($_GET['resource3'],$where,$order,$pagination);
				}
				//producto/reservas/id
				if($_GET['resource2'] == "reservas") {
					$where['asignar_producto.producto'] = $_GET['resource3'];
					$dataArray = ProductoService::getUsuariosDeProducto($where,$order,$pagination);
				}
				if($_GET['resource2'] == "producto" && $_GET['resource'] == "empleado") {
					$where['asignar_producto.producto'] = $_GET['resource3'];
					$dataArray = ProductoService::getEmpleadoDeProducto($where,$order,$pagination);
				}
				if($_GET['resource2'] == "usuario" && $_GET['resource'] == "reservas") {
					$where['asignar_producto.usuario'] = $_GET['resource3'];
					$dataArray = ProductoService::getReservas($_GET['resource3'],$where,$order,$pagination);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function postProducto($type){
		if($type == 5 && $_GET['resource2'] == "foto"){	
			$obj = file_get_contents('php://input');
			$objArr = $obj;
		}
		else {
			$obj = json_decode( file_get_contents('php://input'));
			$objArr = (array)$obj;
		}
		switch ($type) {
			case '2':
				$dataArray = ProductoService::updateProducto($objArr,$_GET['resource2']);
				break;
			case '5': // producto/foto/id o producto/categoria/id
				if($_GET['resource2'] == "foto") {
					$dataArray = ProductoService::insertProductoFoto($objArr,$_GET['resource3']);
				}
				if($_GET['resource2'] == "categoria") {
					$dataArray = CategoriaService::updateCategoria($objArr,$_GET['resource3']);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
		
	}
	public static function putProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // producto
				$dataArray = ProductoService::insertProducto($objArr);
				break;
			case '4':   // producto/categoria
				if($_GET['resource2'] == "categoria")
					$dataArray = CategoriaService::insertCategoria($objArr);
					//producto/empleado
				if($_GET['resource2'] == "empleado")
					$dataArray = ProductoService::asignarProducto($objArr);
				//producto/usuario
				if($_GET['resource2'] == "usuario") 
					$dataArray = ProductoService::reservarProducto($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	
	public static function pathProducto($type){
	}
	public static function deleteProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '2': //producto/id
				$dataArray = ProductoService::deleteProducto($_GET['resource2']);
				break;
			case '5': //producto/categoria/id
				if($_GET['resource2'] == "categoria") {
					$dataArray = CategoriaService::deleteCategoria($_GET['resource3']);
				}
				if($_GET['resource2'] == "empleado") {
					$dataArray = ProductoService::desasignarProductos($_GET['resource3']);
				}
				break;
			case '6'://producto/empleado/dniempleado/idproducto
				if($_GET['resource2'] == "empleado") {
					$dataArray = ProductoService::desasignarProducto($_GET['resource3'], $_GET['resource4']);
				}
				break;
				
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>11){	//11 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun parï¿½metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","nombre", "descripcion", "precio", "iva", "tweet","cantidad_disponible","categoria_producto","estancia","imagen","imagen_redes");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}else if(($key=="precio" || $key=="iva" || $key=="cantidad_disponible") && !is_numeric($key_value)){
					SupportResource::echoError("filtro de tipo no soportado");
					return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>11){	//2 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array =array("id","nombre", "descripcion", "precio", "iva", "tweet","cantidad_disponible","categoria_producto","estancia","imagen","imagen_redes");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(CategoriaResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)>11 || count($arrayKeys)<2){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","nombre");
		$arraycol = array("id","nombre", "descripcion", "precio", "iva", "tweet","cantidad_disponible","categoria_producto","estancia","imagen","imagen_redes");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $arraycol)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		/*en este caso este bucle sobraria porque arraycol y arraynotnull valen lo mismo, lo dejo para no liar*/
		for ($i = 0; $i < count($arrayNotNull); $i++) {
			if(!in_array($arrayNotNull[$i],$arrayKeys)){
				SupportResource::echoError("Falta algun parametro requerido");
				return false;
			}
	
		}
		if(EstanciaResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ContentObjArray($objArr){
		$return=true;
		foreach($objArr as $key => $key_value){
			switch ($key){	//tantos case como columnas. Mirad el script actualizado o $array de ValidGet
				case 'id':
					if($key_value==null){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("formato id no soportado");
						$return=false;
						break 2;
					}
					break;
				case 'nombre':
					if(1!=1){
						SupportResource::echoError("formato nombre incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'descripcion':
					if(1!=1){
						SupportResource::echoError("formato descripcion incorrecto");
						$return=false;
						break 2;
					}
					break;
			}
		}
		return $return;
	}
}