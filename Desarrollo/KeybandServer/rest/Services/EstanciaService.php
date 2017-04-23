<?php
require_once "./Dao/MasterDAO.php";
require_once "./Dao/EstanciaDAO.php";
require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
class EstanciaService {
	public static function getEstancias ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll('estancia',['id','descripcion'],$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getEstanciaById ($id) {
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else{
			$primaries = [
					"id" => $id,
			];
			$dataArray = EstanciaDAO::getById('estancia',null,$primaries);
			echo json_encode($dataArray);
		}
	}
	
	public static function getAforoByEstancia ($id) {
		$dataArray = EstanciaDAO::getAforoById($id);
		echo json_encode($dataArray); 
	}
	
	public static function getAccesos() {
		$dataArray = EstanciaDAO::getAllAccesos();
		echo json_encode($dataArray);
	}
	
	public static function getAforoByMes ($id) {
		$dataArray = EstanciaDAO::getAforoByMes($id);
		echo json_encode($dataArray);
	}
	
	public static function getEstanciaByCapacidad ($id) {
		if($id == 'undefined')
			header('HTTP/1.1 200 No ha introducido estancia');
			else{
				$primaries = [
						"id" => $id,
				];
				$dataArray = MasterDAO::getById('estancia',["capacidad", "id"],$primaries);
				echo json_encode($dataArray);
			}
	}
	
	public static function insertEstancia($obj) {
		$primaries = [
				"id" => $id
		];
	
		if(SupportService::IdValido('estancia',$primaries,"Ya hay una estancia con ese nombre")){
			//echo json_encode($obj['id']);
			$dataArray = MasterDAO::insert('estancia',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function updateEstancia($obj,$id) {
		$primaries = [
			"id" => $id
		];
		if($obj['id']!=$id){	//si intento modificar el id
			$primariesaux = [
					"id" => $obj['id']
			];
			if(SupportService::IdValido('estancia', $primariesaux,"Ya hay una categoria con ese nombre")){
				$dataArray = MasterDAO::update('estancia',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}else{
			$dataArray = MasterDAO::update('estancia',$obj,$primaries);
			echo json_encode($dataArray);
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