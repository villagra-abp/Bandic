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
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getPulsera($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams();		
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				
				PulseraService::getPulseras($where,$order,$pagination);
				break;
				
			case '2':   //usuario/id
				PulseraService::getPulseraById($_GET['resource2']);
				break;
				
			case '4': //pulsera/estado
				if($_GET['resource2']=='estado'){

					PulseraService::getEstado();
				}
				break;
			case '5': //estancia/capacidad/id o /estancia/aforo/id
				if($_GET['resource2']=='estado'){
					PulseraService::getEstanciaByCapacidad($_GET['resource2'],$_GET['resource3']);
				}
				else if($_GET['resource2']=='aforo'){
					EstanciaService::getAforoByEstancia($_GET['resource3']);
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
			case '2':   //usuario/id
				$dataArray = PulseraService::updatePulsera($objArr,$_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="pulsera"){  //usuario/pulsera/id
						
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
			case '2':   //usuario/id
				$dataArray = PulseraService::deletePulsera($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
}
?>