<?php
require_once "./Dao/MasterDAO.php";

/***********************************************Ticket Service****************************************/

class TicketService {
	public static function insertTicket($obj) {
		$dataArray = MasterDAO::insert('ticket',$obj);
		echo json_encode($dataArray);
	}
	
	public static function getTickets($where,$order,$pagination) {
		$table = "ticket";
		$dataArray = MasterDAO::getAll($table,null,$where,$order,$pagination);
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
		/////////////consulta 1//////////////
		$where["ticket.id"] = $id;
		$where["ticket.usuario"] = "usuario.dni";
		$dataArray = MasterDAO::getAll(["usuario, ticket"],["usuario.nombre, usuario.dni, ticket.fecha"],$where,null,null);
		echo json_encode($dataArray);
		////////////consulta 2///////////////
		/*
		$where2["linea_ticket.ticket"] = $id;
		$where2["producto.id"] = "linea_ticket.producto";
		$dataArray2 = MasterDAO::getAll(["linea_ticket, producto"],["linea_ticket.cantidad, linea_ticket.precio, producto.nombre, linea_ticket.cantidad*linea_ticket.precio as importe"],$where2,null,null);
		echo json_encode($dataArray2);
		*/
	}
	
	public static function getLineaFactura($id) {
		$where["linea_ticket.ticket"] = $id;
		$where["producto.id"] = "linea_ticket.producto";
		$dataArray = MasterDAO::getAll(["linea_ticket, producto"],["linea_ticket.cantidad, linea_ticket.precio, producto.nombre, linea_ticket.cantidad*linea_ticket.precio as importe"],$where,null,null);
		echo json_encode($dataArray);
	}
}

?>