<?php
require_once "./Dao/PulseraDAO.php";
require_once "./Dao/MasterDAO.php";

/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class PulseraService {
	public static function getPulseras ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll("pulsera",null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getPulseraById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('pulsera',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertPulsera($obj) {
		$dataArray = MasterDAO::insert('pulsera',$obj);
		echo json_encode($dataArray);
	}
	
	public static function updatePulsera($obj,$id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::update('pulsera',$obj,$primaries);
		echo json_encode($dataArray);
	}
	public static function deletePulsera($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('pulsera',$primaries);
		echo json_encode($dataArray);
	}

}
?>