<?php
require_once "./Dao/RolDAO.php";
require_once "./Dao/MasterDAO.php";

/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class RolService {
	public static function getRol ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll("rol",null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getPulseraById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('pulsera',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertRol($obj) {
		$dataArray = MasterDAO::insert('rol',$obj);
		echo json_encode($dataArray);
	}
	
	public static function updateRol($obj,$id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::update('pulsera',$obj,$primaries);
		echo json_encode($dataArray);
	}
	public static function deleteRol($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('rol',$primaries);
		echo json_encode($dataArray);
	}

}
?>