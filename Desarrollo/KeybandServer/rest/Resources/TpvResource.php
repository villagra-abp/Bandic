<?php
require_once "./Services/TpvService.php";
require_once "SupportResource.php";
/***********************************************TPV****************************************/
class TpvResource{
	public static function methodTpv($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				TpvResource::getTpv($type);
				break;
			case 'POST'://inserta
				TpvResource::postTpv($type);
				break;
			case 'PUT'://actualiza
				TpvResource::putTpv($type);
				break;
			case 'PATH'://actualiza
				TpvResource::pathTpv($type);
				break;
			case 'DELETE'://elimina
				TpvResource::deleteTpv($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
					
		}
	}

	public static function getTpv($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':
				$params = SupportResource::getParams(1);

				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(TpvResource::ValidGet($where))
					$dataArray = TpvService::getTpvs($where,$order,$pagination);
				break;
			case '2':
				if(SupportResource::ValidResource($_GET['resource2']))
					$dataArray = TpvService::getTpvById($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function putTpv($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				if(TpvResource::ValidPut($objArr))
					$dataArray = TpvService::insertTpv($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function postTpv($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //tpv/id
				if(TpvResource::ValidPost($objArr))
					$dataArray = TpvService::updateTpv($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function deleteTpv($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = TpvService::deleteTpv($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>3){	//3 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","nombre", "descripcion");
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
		if(count($objArr)>3){	//4 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","nombre", "descripcion");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(TpvResource::ContentObjArray($objArr))
			return true;
		else
			return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)>3 && count($arrayKeys)<1){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id");
		$arraycol =array("id","nombre", "descripcion");
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
		if(TpvResource::ContentObjArray($objArr))
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
						SupportResource::echoError("Id requerido");
						$return=false;
						break 2;
					}
					if(strlen($key_value) > 100) {
						SupportResource::echoError("formato id incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'nombre':
					if(strlen($key_value) > 100){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("formato nombre incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'descripcion':
					if(strlen($key_value) > 100){
						SupportResource::echoError("formato descripcion incorrecto");
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