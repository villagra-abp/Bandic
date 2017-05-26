<?php
require_once "./Dao/PulseraDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
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
		$primaries = [
				"dni" => $obj['usuario']
		];
		$primaries2 = [
				"id" => $obj['id']
		];
		$primaries3 = [
				"id" => $obj['estado_pulsera']
		];
		if($primaries!=null){
			if(
					SupportService::FkValido('estado_pulsera',$primaries3,"El estado tiene que coincidir con un estado de pulsera v�lido (activa, sin asignar, inactiva") &&
					SupportService::IdValido('pulsera',$primaries2,"Ya hay una pulsera con ese ID")){
						$dataArray = MasterDAO::insert('pulsera',$obj);
						echo json_encode($dataArray);
			}
		}
		else{
			if(SupportService::FkValido('usuario',$primaries,"No existe un usuario con este DNI") &&
					SupportService::FkValido('estado_pulsera',$primaries3,"El estado tiene que coincidir con un estado de pulsera v�lido (activa, sin asignar, inactiva") &&
					SupportService::IdValido('pulsera',$primaries2,"Ya hay una pulsera con ese ID")){
						$dataArray = MasterDAO::insert('pulsera',$obj);
						echo json_encode($dataArray);
			}
		}
		
	}
	
	public static function updatePulsera($obj,$id) {
		$primaries = [
				"id" => $id
		];
		$primaries2 = [
				"id" => $obj['id']
		];
		$primaries3 = [
				"id" => $obj['estado_pulsera']
		];
		$primaries4 = [
				"dni" => $obj['usuario']
		];
		if($obj['id']!=$id){    //si intento modificar el id
			$primariesaux = [
					"id" => $obj['id']
			];
			if(SupportService::FkValido('usuario',$primaries4,"No existe un usuario con este DNI") &&
				SupportService::FkValido('estado_pulsera',$primaries3,"El estado tiene que coincidir con un estado de pulsera v�lido (activa, sin asignar, inactiva") &&
				SupportService::IdValido('pulsera',$primaries2,"Ya hay una pulsera con ese ID")){
				$dataArray = MasterDAO::update('pulsera',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}else{
			if(SupportService::FkValido('usuario',$primaries4,"No existe un usuario con este DNI") &&
				SupportService::FkValido('estado_pulsera',$primaries3,"El estado tiene que coincidir con un estado de pulsera v�lido (activa, sin asignar, inactiva")){
						$dataArray = MasterDAO::update('pulsera',$obj,$primaries);
						echo json_encode($dataArray);
			}
		};
		
	}
	public static function deletePulsera($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('pulsera',$primaries);
		echo json_encode($dataArray);
	}
	
	public static function getEstado () {
		$dataArray = PulseraDAO::getEstado();
		echo json_encode($dataArray);
	}

}
?>