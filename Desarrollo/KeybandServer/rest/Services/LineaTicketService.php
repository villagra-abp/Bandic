<?php
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************Linea Ticket Service****************************************/

class LineaTicketService {
	public static function insertLineaTicket($obj) {
		$primaries = [
				"id" => $obj['ticket']
		];
		$primaries2 = [
				"id" => $obj['producto']
		];
		$primaries3 = [
				"id" => $obj['id']
		];
		if(SupportService::IdValido('linea_ticket',$primaries3,"Ya hay una linea de ticket con ese id") &&
			SupportService::FkValido('ticket',$primaries,"El ticket de la linea de ticket debe ser un ticket existente") &&
			SupportService::FkValido('producto',$primaries2,"El producto de la linea de ticket debe ser un producto existente")){
			$dataArray = MasterDAO::insert('linea_ticket',$obj);
			echo json_encode($dataArray);
		}
	}
}

?>