<?php
require_once "./Services/TicketService.php";

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
				echo 'METODO NO SOPORTADO';
				break;
		}
	}
	
	public static function putTicket($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // ticket
				//ProductoResource::uploadFile($objArr);
				$dataArray = TicketService::insertTicket($objArr);
				break;
		}
	}
	
	public static function getTicket($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':
				$dataArray = TicketService::getTickets();
				break;
			case '2':
				$dataArray = TicketService::getTicketById($_GET['resource2']);
				break;
			case '5':
				$dataArray = TicketService::getFactura($_GET['resource3']);
				break;
		}
	}
}

?>