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
				echo 'METODO NO SOPORTADO';
				break;
		}
	}
	/*todas estas filtran por argumentos, ir aÃ±adiendo if o switch conforme vayan saliendo peticiones*/
	public static function getProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				$dataArray = ProductoService::getProductos();
				break;
			case '2':
				$dataArray = ProductoService::getProductoById($_GET['resource2']);
				break;
			case '4':
				$dataArray = CategoriaService::getCategorias();
				break;		
			case '5':
				$dataArray = ProductoService::getProductoByCategoria($_GET['resource3']);
		}
	}
	
	public static function postProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '2':
				$dataArray = ProductoService::updateProducto($objArr,$_GET['resource2']);
				break;
			case '5': // producto/foto/id o producto/categoria/id
				if($_GET['resource2'] == "foto")
					$dataArray = ProductoService::insertProductoFoto($objArr);
				if($_GET['resource2'] == "categoria") {
					echo "holitaaaaaaa";
					$dataArray = CategoriaService::updateCategoria($objArr,$_GET['resource3']);
				}
				break;
		}
		
	}
	public static function putProducto($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // producto
				//ProductoResource::uploadFile($objArr);
				$dataArray = ProductoService::insertProducto($objArr);
				break;
			case '4':   // producto/categoria
				//ProductoResource::uploadFile($objArr);
				$dataArray = CategoriaService::insertCategoria($objArr);
				break;
			default:
				echo "Método no soportado";
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
		}
	}
}