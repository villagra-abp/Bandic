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
				header('HTTP/1.1 501 Not Implemented');
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
				$dataArray = TicketService::getTickets($where,$order,$pagination);
				break;
			case '2':
				$dataArray = TicketService::getTicketById($_GET['resource2']);
				break;
			case '5':
				if($_GET['resource2'] == "factura")
					$dataArray = TicketService::getFactura($_GET['resource3']);
				if($_GET['resource2'] == "lineafactura")
					$dataArray = TicketService::getLineaFactura($_GET['resource3']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
}

?>