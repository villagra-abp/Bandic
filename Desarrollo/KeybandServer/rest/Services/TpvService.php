<?php
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************Categoria Service****************************************/

class TpvService {

	public static function getTpvs ($where,$order,$pagination) {
		$table = "tpv";
		$dataArray = MasterDAO::getAll($table,null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}

	public static function getTpvById($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::getById('tpv',null,$primaries);
		echo json_encode($dataArray);
	}

	public static function insertTpv($obj) {
		$dataArray = MasterDAO::insert('tpv',$obj);
		echo json_encode($dataArray);
	}

	public static function updateTpv($obj,$id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::update('tpv',$obj,$primaries);
		echo json_encode($dataArray);
	}

	public static function deleteTpv($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('tpv',$primaries);
		echo json_encode($dataArray);
	}
}

?>