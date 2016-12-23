<?php
require_once "./Services/LineaTicketService.php";
require_once "SupportResource.php";

/* **********************************************LINEATICKET*************************************** */

class LineaTicketResource{
	public static function methodLineaTicket($method,$type){
		switch ($method) {
			case 'PUT'://insertar
				LineaTicketResource::putLineaTicket($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	
	public static function putLineaTicket($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // lineaticket
				if(LineaTicketResource::ValidPut($objArr))
					$dataArray = LineaTicketService::insertLineaTicket($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>5){	//5 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","ticket", "producto", "cantidad", "precio");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}else if(($key=="cantidad" || $key=="precio") && !is_numeric($key_value)){
					SupportResource::echoError("formato cantidad o precio no soportado");
					return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>5){	//5 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","ticket", "producto", "cantidad", "precio");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(LineaTicketResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys) != 5){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","ticket", "producto", "cantidad", "precio");
		$arraycol = array("id","ticket", "producto", "cantidad", "precio");
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
		if(LineaTicketResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ContentObjArray($objArr){
		$return=true;
		foreach($objArr as $key => $key_value){
			switch ($key){	//tantos case como columnas. Mirad el script actualizado o $array de ValidGet
				case 'id':
					if($key_value==null) {
						SupportResource::echoError("id requerido");
						$return=false;
						break 2;
					}
					if(strlen($key_value) > 100){
						SupportResource::echoError("formato id incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'ticket':
					if($key_value==null) {
						SupportResource::echoError("ticket requerido");
						$return=false;
						break 2;
					}
					if(strlen($key_value) > 100){
						SupportResource::echoError("formato ticket incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'producto':
					if($key_value==null) {
						SupportResource::echoError("producto requerida");
						$return=false;
						break 2;
					}
					if(strlen($key_value) > 100){
						SupportResource::echoError("formato producto incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'cantidad':
					if($key_value==null) {
						SupportResource::echoError("cantidad requerida");
						$return=false;
						break 2;
					}
					if(!is_numeric($key_value)){
						SupportResource::echoError("formato cantidad incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'precio':
					if($key_value==null) {
						SupportResource::echoError("precio requerido");
						$return=false;
						break 2;
					}
					if(!is_numeric($key_value)){
						SupportResource::echoError("formato precio incorrecto");
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