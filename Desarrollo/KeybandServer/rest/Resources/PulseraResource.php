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
}
?>