<?php
require_once "./Dao/MasterDAO.php";

/***********************************************Linea Ticket Service****************************************/

class LineaTicketService {
	public static function insertLineaTicket($obj) {
		$dataArray = MasterDAO::insert('linea_ticket',$obj);
		echo json_encode($dataArray);
	}
}

?>