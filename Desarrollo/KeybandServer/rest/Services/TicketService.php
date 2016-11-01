<?php
require_once "./Dao/MasterDAO.php";

/***********************************************Ticket Service****************************************/

class TicketService {
	public static function insertTicket($obj) {
		$dataArray = MasterDAO::insert('ticket',$obj);
		echo json_encode($dataArray);
	}
	
	public static function getTickets () {
		$table = "ticket";
		$columns = [/*"id","comestible"*/];
		$where = [/*"nombre"=>"Manuel","sexo"=>"M"*/];
		$order = [/*"order"=>"Asc","by"=>"nombre"*/];
		$pagination = [/*"initrow"=>"0","pageSize"=>"5"*/];
		$dataArray = MasterDAO::getAll($table,$columns,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getTicketById($id) {
		$primaries = [
				"id" => $id,
		];
		$primaries2 = [
				"ticket" => $id,
		];
		$dataArray = MasterDAO::getById('ticket',null,$primaries);
		echo json_encode($dataArray);
		///////////Get lineas de ticket, por ticket//////////////////////
		$dataArray2 = MasterDAO::getById('linea_ticket',null,$primaries2);
		echo json_encode($dataArray2);
	}
	
	public static function getFactura($id) {
		
	}
}

?>