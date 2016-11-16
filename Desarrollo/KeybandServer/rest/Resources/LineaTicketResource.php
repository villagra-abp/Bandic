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
				$dataArray = LineaTicketService::insertLineaTicket($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
}

?>