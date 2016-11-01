<?php
require_once "./Services/RolService.php";
require_once "SupportResource.php";

/***********************************************Rol RESOURCE****************************************/
class RolResource{

	public static function methodRol($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				RolResource::getRol($type);
				break;
			/*case 'POST'://inserta
				RolResource::postRol($type);
				break;*/
			case 'PUT'://actualiza
				RolResource::putRol($type);
				break;
			case 'DELETE'://elimina
				RolResource::deleteRol($type);
				break;
			default://metodo NO soportado
				echo 'METODO NO SOPORTADO';
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getRol($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams();

				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);

				RolService::getRol($where,$order,$pagination);
				break;
			case '2':   //usuario/id
				RolService::getRolById($_GET['resource2']);
				break;
			default:
				echo "M�todo no soportado";
				break;
		}
	}
	/*public static function postRol($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //usuario/id
				$dataArray = RolService::updateRol($objArr,$_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="pulsera"){  //usuario/pulsera/id

				}else{
					//metodo no soportado
					echo "M�todo no soportado";
				}
				break;
			default:
				echo "M�todo no soportado";

				break;
		}

	}
	public function prueba(){
		return true;
	}*/
	public static function putRol($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				$dataArray = RolService::insertRol($objArr);
				break;
			default:
				echo "M�todo no soportado";
				break;
		}
	}
	public static function deleteRol($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = RolService::deleteRol($_GET['resource2']);
				break;
			default:
				echo "M�todo no soportado";

				break;
		}
	}
}
?>