<?php
require_once "./Dao/PermisoDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class PermisoService {
	public static function getPermisos ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll("permiso",null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getPermisoById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('permiso',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertPermiso($obj) {
		$primaries = [
				"id" => $obj['id']
		];
		if(SupportService::IdValido('permiso',$primaries,"Ya hay un permiso con ese id")){
			$dataArray = MasterDAO::insert('permiso',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function updatePermiso($obj,$id) {
		$primaries = [
				"id" => $id
		];
		if($obj['id']!=$id){    //si intento modificar el id
			$primariesaux = [
					"id" => $obj['id']
			];
			if(SupportService::IdValido('permiso',$primariesaux,"Ya hay un permiso con ese id")){
				$dataArray = MasterDAO::update('permiso',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}else{
			$dataArray = MasterDAO::update('permiso',$obj,$primaries);
			echo json_encode($dataArray);
		};
	}
	public static function deletePermiso($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('permiso',$primaries);
		echo json_encode($dataArray);
	}


}
?>