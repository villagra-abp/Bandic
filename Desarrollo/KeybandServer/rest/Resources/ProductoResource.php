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
	/*todas estas filtran por argumentos, ir añadiendo if o switch conforme vayan saliendo peticiones*/
	public static function getProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				$params = SupportResource::getParams(1);
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				
				$dataArray = ProductoService::getProductos($where,$order,$pagination);
				break;
			case '2':
				$dataArray = ProductoService::getProductoById($_GET['resource2']);
				break;
			case '4':
				if($_GET['resource2'] == "categoria") {
					$params = SupportResource::getParams(2);
					
					//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where = SupportResource::extractWhere($params);
					
					$dataArray = CategoriaService::getCategorias($where,$order,$pagination);
				}
				
				if($_GET['resource2'] == "empleado") {
					$params = SupportResource::getParams(2);
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where = SupportResource::extractWhere($params);
						
					$dataArray = ProductoService::getProductoEmpleado($where,$order,$pagination);
				}
				break;		
			case '5':
				$params = SupportResource::getParams(3);
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				$where['categoria_producto'] = $_GET['resource3'];
				
				$dataArray = ProductoService::getProductos($where,$order,$pagination);
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
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
}