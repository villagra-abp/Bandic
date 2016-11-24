<?php
require_once "./Services/EstanciaService.php";
require_once "SupportResource.php";

/***********************************************Estancia RESOURCE****************************************/
class EstanciaResource{
	
	public static function methodEstancia($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consultar estancia
				EstanciaResource::getEstancia($type);
				break;
			case 'POST'://modificar estancia
				EstanciaResource::postEstancia($type);
				break;
			case 'PUT'://crear estancia
				EstanciaResource::putEstancia($type);
				break;
			case 'DELETE'://eliminar estancia
				EstanciaResource::deleteEstancia($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}

	public static function getEstancia($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   //estancia
				//Cojo los parametros que me han pasado por URL
				$params = SupportResource::getParams(1);

				//Extraigo los parametros de order,filtros y de paginacion que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);

				EstanciaService::getEstancias($where,$order,$pagination);
				break;
			case '2':   //estancia/id
				EstanciaService::getEstanciaById($_GET['resource2']);
				break;

			case '5': //estancia/capacidad/id o /estancia/aforo/id
				if($_GET['resource2']=='capacidad'){
					EstanciaService::getEstanciaByCapacidad($_GET['resource3']);
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

	public static function putEstancia($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // estancia
				$dataArray = EstanciaService::insertEstancia($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function postEstancia($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //estancia/id
				$dataArray = EstanciaService::updateEstancia($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}

	}

	public static function deleteEstancia($type){
		switch ($type) {
			case '2':   //estancia/id
				$dataArray = EstanciaService::borrarEstancia($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}
	}
}

?>
