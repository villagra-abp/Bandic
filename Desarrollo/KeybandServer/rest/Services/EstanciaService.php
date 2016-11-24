<?php
require_once "./Dao/MasterDAO.php";
require_once "./Dao/EstanciaDAO.php";

/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class EstanciaService {
	public static function getEstancias ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll('estancia',['id'],$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getEstanciaById ($id) {
		echo json_encode($id);
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else{
			$primaries = [
					"id" => $id,
			];
			$dataArray = MasterDAO::getById('estancia',null,$primaries);
			echo json_encode($dataArray);
		}
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
		if($obj['id'] == null || $obj['capacidad'] == null){
			header('HTTP/1.1 200 No ha introducido ID/Capacidad');
		}
		else{
			$primaries = [
					"id" => $obj['id'],
			];
			$dataArray2 = MasterDAO::getById('estancia',null,$primaries);
			if(count($dataArray2)!=0){
				header('HTTP/1.1 200 ID que ya existe');
			}
			else{
				$dataArray = MasterDAO::insert('estancia',$obj);
				echo json_encode($dataArray);
			}
		}
	}
	
	public static function updateEstancia($obj,$id) {
		if($obj['id'] == null || $id == null ){
			header('HTTP/1.1 200 No ha introducido ningun parametro');
		}
		else{
			if($obj['capacidad'] == null){
				header('HTTP/1.1 200 No ha introducido capacidad');
			}
			else{
				$primaries = [
					"id" => $id
				];
				$dataArray = MasterDAO::update('estancia',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}
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