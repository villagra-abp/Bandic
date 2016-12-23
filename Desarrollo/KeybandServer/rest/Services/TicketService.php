<?php
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************Ticket Service****************************************/

class TicketService {
	public static function insertTicket($obj) {
		$primaries = [
				"id" => $obj['id']
		];
		$primaries2 = [
				"id" => $obj['usuario']
		];
		$primaries3 = [
				"id" => $obj['tpv']
		];
		if(SupportService::IdValido('ticket',$primaries,"Ya hay un ticket con ese id") &&
			SupportService::FkValido('usuario',$primaries2,"El usuario del ticket debe ser un usuario existente") &&
			SupportService::FkValido('tpv',$primaries3,"El tpv del ticket debe ser un tpv existente")){
			$dataArray = MasterDAO::insert('ticket',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function getTickets($where,$order,$pagination) {
		$table = "ticket";
		$dataArray = MasterDAO::getAll($table,null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getTicketById($id) {
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else {
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
	}
	
	public static function getFactura($id) {
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else {
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
	}
	
	public static function getLineaFactura($id) {
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else {
			$where["linea_ticket.ticket"] = $id;
			$where["producto.id"] = "linea_ticket.producto";
			$dataArray = MasterDAO::getAll(["linea_ticket, producto"],["linea_ticket.cantidad, linea_ticket.precio, producto.nombre, linea_ticket.cantidad*linea_ticket.precio as importe"],$where,null,null);
			echo json_encode($dataArray);
		}
	}
	
	public static function getTicketsTpv($where,$order,$pagination) {
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else {
			$where["ticket.id"] = "linea_ticket.ticket";
			$dataArray = MasterDAO::getAll(["ticket", "linea_ticket"],["linea_ticket.cantidad*linea_ticket.precio as importe, ticket.fecha"],$where,$order,$pagination);
			echo json_encode($dataArray);
		}
	}
}

?>