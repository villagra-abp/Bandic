<?php
require_once "./Services/CategoriaService.php";
/***********************************************CATEGORIA RESOURCE****************************************/
class CategoriaResource{
	public static function methodCategoriaProducto($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				CategoriaResource::getCategoria($type);
				break;
			case 'POST'://inserta
				CategoriaResource::postCategoria($type);
				break;
			case 'PUT'://actualiza
				CategoriaResource::putCategoria($type);
				break;
			case 'PATH'://actualiza
				UsuarioResource::pathCategoria($type);
				break;
			case 'DELETE'://elimina
				CategoriaResource::deleteCategoria($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
			
		}
	}
	
	public static function getCategoria($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				CategoriaService::getCategorias();
				break;
			case '2':   //usuario/id
				CategoriaService::getCategoriaById($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function putCategoria($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // insertar nueva categoria
				$dataArray = CategoriaService::insertCategoria($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function postCategoria($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //categoria/id
				$dataArray = CategoriaService::updateCategoria($objArr,$_GET['resource2']);
				break;
			case '5':   //recurso/id
				if($_GET['resource2']=="pulsera"){  //usuario/pulsera/id
						
				}else{
					//metodo no soportado
					header('HTTP/1.1 405 Method Not Allowed');
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	
	}
	
	public static function deleteCategoria($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = CategoriaService::deleteCategoria($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
}

?>