<?php
require_once "./Dao/MasterDAO.php";
require_once "./Dao/EstanciaDAO.php";

/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class EstanciaService {
	public static function getEstancias ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll('estancia',null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getEstanciaById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('estancia',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function getAforoByEstancia ($id) {
		$dataArray = EstanciaDAO::getAforoById($id);
		echo json_encode($dataArray); 
	}
	
	public static function getEstanciaByCapacidad ($capacidad,$id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('estancia',["capacidad"],$primaries);
		echo json_encode($dataArray); 
	}
	
	public static function insertEstancia($obj) {
		$dataArray = MasterDAO::insert('estancia',$obj);
		echo json_encode($dataArray);
	}
	
	public static function updateEstancia($obj,$id) {
		$primaries = [
			"id" => $id
		];
		$dataArray = MasterDAO::update('estancia',$obj,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function borrarEstancia($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('estancia',$primaries);
		echo json_encode($dataArray);
	}

}
?>