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
	/*todas estas filtran por argumentos, ir añadiendo if o switch conforme vayan saliendo peticiones*/
	public static function getProducto($type){
	}
	public static function postProducto($type){
	}
	public static function putProducto($type){
	}
	public static function pathProducto($type){
	}
	public static function deleteProducto($type){
	}
}