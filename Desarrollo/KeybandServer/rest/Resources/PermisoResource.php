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
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getPermiso($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams(1);	
				//SI NO LE PASAS EL 1,2 O LOS Q SEAN AQUI ESTO NO TIRA SI HACES LA LLAMADA A LA API A PELO
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(PermisoResource::ValidGet($where))
					PermisoService::getPermisos($where,$order,$pagination);
				break;
			case '2':   //usuario/id
				PermisoService::getPermisoById($_GET['resource2']);
				break;
			case '3':   //permiso/usuario/accion
				PermisoService::getPermisoByUsuario($_GET['resource2'], $_GET['resource3']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postPermiso($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //usuario/id
				if(PermisoResource::ValidPost($objArr))
					$dataArray = PermisoService::updatePermiso($objArr,$_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="permiso"){  //usuario/Permiso/id
						
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
	public function prueba(){
		return true;
	}
	public static function putPermiso($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   
				if(PermisoResource::ValidPut($objArr))
					$dataArray = PermisoService::insertPermiso($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function deletePermiso($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = PermisoService::deletePermiso($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
	
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>2){	//2 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","descripcion");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>2){	//2 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","descripcion");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(PermisoResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=2){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","descripcion");
		$arraycol = array("id","descripcion");
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
		if(PermisoResource::ContentObjArray($objArr))
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
						SupportResource::echoError("id no puede ser null");
						$return=false;
						break 2;
					}
					break;
				case 'descripcion':
					if($key_value==null){
						SupportResource::echoError("descripcion no puede ser null");
						$return=false;
						break 2;
					}
					break;
			}
		}
		return $return;
	}
}
?>