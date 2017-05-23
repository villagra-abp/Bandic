<?php
require_once "./Services/TicketService.php";
require_once "SupportResource.php";
/***********************************************TICKET****************************************/
class TicketResource{
	public static function methodTicket($method,$type){	
		switch ($method) {
			case 'GET'://consulta
				TicketResource::getTicket($type);
				break;
			case 'PUT'://insertar
				TicketResource::putTicket($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	
	public static function putTicket($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // ticket
				if(TicketResource::ValidPut($objArr))
					$dataArray = TicketService::insertTicket($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function getTicket($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				$params = SupportResource::getParams(2);
					
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(TicketResource::ValidGet($where))
					$dataArray = TicketService::getTickets($where,$order,$pagination);
				break;
			case '2':
				$dataArray = TicketService::getTicketById($_GET['resource2']);
				break;
			case '5':
				if($_GET['resource2'] == "detalles")
					$dataArray = TicketService::getDetalles($_GET['resource3']);
				if($_GET['resource2'] == "factura")
					$dataArray = TicketService::getFactura($_GET['resource3']);
				if($_GET['resource2'] == "lineafactura")
					$dataArray = TicketService::getLineaFactura($_GET['resource3']);
				if($_GET['resource2'] == "tpv") {
					$params = SupportResource::getParams(3);
						
					//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
					$order = SupportResource::extractOrder($params);
					$pagination = SupportResource::extractPagination($params);
					$where = SupportResource::extractWhere($params);
					$where["ticket.tpv"] = $_GET['resource3'];
					$dataArray = TicketService::getTicketsTpv($where,$order,$pagination);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>4){	//4 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","usuario", "fecha", "tpv");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}else if($key=="fecha" && !SupportResource::isDate($key_value)){
					SupportResource::echoError("formato fecha no soportado");
					return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>4){	//4 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","usuario", "fecha", "tpv");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(TicketResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)>4 && count($arrayKeys)<3){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","usuario", "fecha");
		$arraycol =array("id","usuario", "fecha", "tpv");
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
		if(TicketResource::ContentObjArray($objArr))
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
				case 'usuario':
					if($key_value==null){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("usuario requerido");
						$return=false;
						break 2;
					}
					if(strlen($key_value) > 12) {
						SupportResource::echoError("formato usuario incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'fecha':
					if($key_value==null){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("fecha requerida");
						$return=false;
						break 2;
					}/*
					if(!SupportResource::isDate($key_value)) {
						SupportResource::echoError("formato fecha incorrecto");
						$return=false;
						break 2;
					}*/
					break;
				case 'tpv':
					if(strlen($key_value) > 100){
						SupportResource::echoError("formato tpv incorrecto");
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