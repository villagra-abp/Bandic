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
			case 'POST'://inserta
				RolResource::postRol($type);
				break;
			case 'PUT'://actualiza
				RolResource::putRol($type);
				break;
			case 'DELETE'://elimina
				RolResource::deleteRol($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getRol($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams(1);

				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(RolResource::ValidGet($where))
					RolService::getRol($where,$order,$pagination);
					break;
			case '2':   //usuario/id
				RolService::getRolById($_GET['resource2']);
				break;
					
			case '5':

				if($_GET['resource2'] == "permiso"){
					$params = SupportResource::getParams(3);
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where =  SupportResource::extractWhere($params);

					$where['rol.id'] = $_GET['resource3'];
					$where['rol_permiso.rol'] = "rol.id";
					//$where['ro.permiso'] = "p.id";
					RolService::getPermisoByRol($where,$order,$pagination);
				}
				break;
				
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postRol($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //usuario/id
				if(RolResource::ValidPost($objArr))
				$dataArray = RolService::updateRol($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}

	}
	
	public static function putRol($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				if(RolResource::ValidPut($objArr))
					$dataArray = RolService::insertRol($objArr);
				break;
				
			case '5':
				if(SupportResource::ValidResource($_GET['resource2']) && $_GET['resource2'] == "permiso") {
					if(RolResource::ValidPut2($objArr))
						$dataArray = RolService::insertPermisoRol($objArr);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowedgggg');
				break;
		}
	}
	public static function deleteRol($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = RolService::deleteRol($_GET['resource2']);
				break;
				
			case '6':
				if($_GET['resource2'] == "permiso") {
					$dataArray = RolService::deletePermisoRol($_GET['resource3'] , $_GET['resource4']);
				}
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
		$array = array("id","empleado");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}else if($key=="empleado" && !SupportResource::isBool($key_value)){
					SupportResource::echoError("filtro de tipo no soportado");
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
		$array = array("id","empleado");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(RolResource::ContentObjArray($objArr))
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
		$arrayNotNull=array("id","empleado");
		$arraycol =array("id","empleado");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $arraycol)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		for ($i = 0; $i < count($arrayNotNull); $i++) {
			if(!in_array($arrayNotNull[$i],$arrayKeys)){
				SupportResource::echoError("Falta algun parametro requerido");
				return false;
			}

		}
		if(RolResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}

	public static function ValidPut2($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=2){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("rol","permiso");
		$arraycol =array("rol","permiso");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $arraycol)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		for ($i = 0; $i < count($arrayNotNull); $i++) {
			if(!in_array($arrayNotNull[$i],$arrayKeys)){
				SupportResource::echoError("Falta algun parametro requerido");
				return false;
			}
	
		}
		if(RolResource::ContentObjArray($objArr))
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
				case 'rol':
					if($key_value==null){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("rol no puede ser null");
						$return=false;
						break 2;
					}
					break;
				case 'permiso':
					if($key_value==null){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("permiso no puede ser null");
						$return=false;
						break 2;
					}
					break;
				case 'empleado':
					
					if(!SupportResource::isBool($key_value)){
						SupportResource::echoError("empleado tiene que ser true o false");
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