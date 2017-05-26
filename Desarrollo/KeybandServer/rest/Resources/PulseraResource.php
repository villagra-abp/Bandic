<?php
require_once "./Services/PulseraService.php";
require_once "SupportResource.php";

/***********************************************Pulsera RESOURCE****************************************/
class PulseraResource{
	
	public static function methodPulsera($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				PulseraResource::getPulsera($type);
				break;
			case 'POST'://inserta
				PulseraResource::postPulsera($type);
				break;
			case 'PUT'://actualiza
				PulseraResource::putPulsera($type);
				break;
			case 'DELETE'://elimina
				PulseraResource::deletePulsera($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}

	public static function getPulsera($type){
		switch ($type) {
			case '1':   // pulsera
				$params = SupportResource::getParams(1);		
				
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(PulseraResource::ValidGet($where))
					PulseraService::getPulseras($where,$order,$pagination);
				break;
				
			case '2':   //pulsera/id
				PulseraService::getPulseraById($_GET['resource2']);
				break;
				
			case '4': //pulsera/estado
				if($_GET['resource2']=='estado'){
					PulseraService::getEstado();
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postPulsera($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //pulsera/id
				if(PulseraResource::ValidPost($objArr))
				$dataArray = PulseraService::updatePulsera($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function putPulsera($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   
				if(PulseraResource::ValidPut($objArr))
				$dataArray = PulseraService::insertPulsera($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function deletePulsera($type){
		switch ($type) {
			case '2':   //pulsera/id
				$dataArray = PulseraService::deletePulsera($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>3){	//11 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","usuario", "estado_pulsera");
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
		$array = array("id","usuario", "estado_pulsera");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(PulseraResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=3){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id", "estado_pulsera");
		$arraycol =array("id","usuario", "estado_pulsera");
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
		if(PulseraResource::ContentObjArray($objArr))
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
				/*case 'usuario':
					if($key_value==null){
						SupportResource::echoError("usuario no puede ser null");
						$return=false;
						break 2;
					}
					break;*/
					case 'estado_pulsera':
						if($key_value==null){
							SupportResource::echoError("el estado de la pulsera tiene que ser activada sin asignar o perdida");
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