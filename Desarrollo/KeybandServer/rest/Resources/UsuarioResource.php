<?php
require_once "./Services/UsuarioService.php";
require_once "SupportResource.php";

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
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getUsuario($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams(1);		
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				
				UsuarioService::getUsuarios($where,$order,$pagination);
				break;
			case '2':   //usuario/id
				UsuarioService::getUsuarioById($_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="pulsera") {
					//Cojo los par�metros que me han pasado por URL
					$params = SupportResource::getParams(3);
					
					//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					
					$where =  SupportResource::extractWhere($params);
					$where["usuario"] = $_GET['resource3'] ; //a�ado yo mismo el where
						
					PulseraService::getPulseras($where,$order,$pagination);
				}else if($_GET['resource2']=="producto"){
					//Cojo los par�metros que me han pasado por URL
					$params = SupportResource::getParams(3);
						
					//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where =  SupportResource::extractWhere($params);
						
					$where['usuario']= $_GET['resource3'];
					UsuarioService::getProductosByUsuario($where,$order,$pagination);
					
				}else if($_GET['resource2']=="rol"){
					$params = SupportResource::getParams(3);
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where =  SupportResource::extractWhere($params);
						
					$where['u.dni'] = $_GET['resource3'];
					$where['ur.usuario'] = "u.dni";
					UsuarioService::getRolByUsuario($where,$order,$pagination);
				}
				break;
				
			default:
				header('HTTP/1.1 405 Method Not Allowed');
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
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				
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
			case '5':
				if($_GET['resource2'] == "rol") {
					$dataArray = UsuarioService::insertRolUsuario($objArr);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
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
				
			case '6':
				if($_GET['resource2']=="rol") {
					$dataArray = UsuarioService::deleteRolUsuario($_GET['resource3'], $_GET['resource4']);
				}
				break;
				
			default:
				header('HTTP/1.1 405 Method Not Allowed');
		
				break;
		}
	}
}
?>