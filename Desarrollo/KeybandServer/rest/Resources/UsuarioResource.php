<?php
require_once "./Services/UsuarioService.php";

/***********************************************USUARIO RESOURCE****************************************/
class UsuarioResource{
	
	public static function methodUsuario($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				UsuarioResource::getUsuario($type);
				break;
			case 'POST'://inserta
				UsuarioResource::postUsuario($type);
				break;
			case 'PUT'://actualiza
				UsuarioResource::putUsuario($type);
				break;
			case 'PATH'://actualiza
				UsuarioResource::pathUsuario($type);
				break;
			case 'DELETE'://elimina
				UsuarioResource::deleteUsuario($type);
				break;
			default://metodo NO soportado
				echo 'METODO NO SOPORTADO';
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getUsuario($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una peticiÃ³n valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				UsuarioService::getUsuarios();
				break;
			case '2':   //usuario/id
				UsuarioService::getUsuarioById($_GET['resource2']);
				break;
			default:
				echo "Método no soportado";
				break;
		}
	}
	public static function postUsuario($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = UsuarioService::updateUsuario($objArr,$_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="pulsera"){  //usuario/pulsera/id
					
				}else{
					//metodo no soportado
					echo "Método no soportado";
				}
				break;
			default:
				echo "Método no soportado";
				
				break;
		}

	}
	public static function putUsuario($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // usuario
				$dataArray = UsuarioService::insertUsuario($objArr);
				break;
			default:
				echo "Método no soportado";
				break;
		}
	}
	public static function pathUsuario($type){
	}
	public static function deleteUsuario($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = UsuarioService::deleteUsuario($_GET['resource2']);
				break;
			default:
				echo "Método no soportado";
		
				break;
		}
	}
}
?>