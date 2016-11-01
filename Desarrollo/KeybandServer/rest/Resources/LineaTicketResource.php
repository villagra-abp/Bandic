<?php
require_once "./Services/LineaTicketService.php";

/***********************************************LINEATICKET****************************************/

class LineaTicketResource{
	public static function methodLineaTicket($method,$type){
		switch ($method) {
			case 'PUT'://insertar
				LineaTicketResource::putLineaTicket($type);
				break;
			default://metodo NO soportado
				echo 'METODO NO SOPORTADO';
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
		}
	}
}

?>

