<?php
require_once "./Services/PermisoService.php";
require_once "SupportResource.php";

/* **********************************************Permiso RESOURCE*************************************** */
class PermisoResource{
	
	public static function methodPermiso($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				PermisoResource::getPermiso($type);
				break;
			case 'POST'://inserta
				PermisoResource::postPermiso($type);
				break;
			case 'PUT'://actualiza
				PermisoResource::putPermiso($type);
				break;
			case 'DELETE'://elimina
				PermisoResource::deletePermiso($type);
				break;
			default://metodo NO soportado
				echo 'METODO NO SOPORTADO';
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getPermiso($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams();		
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				
				PermisoService::getPermisos($where,$order,$pagination);
				break;
			case '2':   //usuario/id
				PermisoService::getPermisoById($_GET['resource2']);
				break;
			case '3':   //permiso/usuario/accion
				PermisoService::getPermisoByUsuario($_GET['resource2'], $_GET['resource3']);
				break;
			default:
				echo "M�todo no soportado";
				break;
		}
	}
	public static function postPermiso($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = PermisoService::updatePermiso($objArr,$_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="permiso"){  //usuario/Permiso/id
						
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
	}
	public static function putPermiso($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   
				$dataArray = PermisoService::insertPermiso($objArr);
				break;
			default:
				echo "M�todo no soportado";
				break;
		}
	}
	public static function deletePermiso($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = PermisoService::deletePermiso($_GET['resource2']);
				break;
			default:
				echo "M�todo no soportado";
	
				break;
		}
	}
}
?>