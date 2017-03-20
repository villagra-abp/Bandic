<?php
require_once "./Dao/RolDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class RolService {
	public static function getRol ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll("rol",null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getRolById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('rol',null,$primaries);
		echo json_encode($dataArray);
	}

	public static function insertRol($obj) {
	
		$primaries = [
				"id" => $obj['id']
		];
		if(SupportService::IdValido('rol',$primaries,"Ya hay un rol con ese id")){
			$dataArray = RolDAO::PutRol($obj);
			echo json_encode($dataArray);
		}
		
	}
	
	public static function updateRol($obj,$id) {
		$primaries = [
				"id" => $id
		];
		if($obj['id']!=$id){    //si intento modificar el id
			$primariesaux = [
					"id" => $obj['id']
			];
			if(SupportService::IdValido('rol',$primariesaux,"Ya hay una rol con ese id")){
				$dataArray = RolDAO::EditRol('rol',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}else{
			$dataArray = RolDAO::EditRol($obj);
			echo json_encode($dataArray);
		};
	}
	public static function deleteRol($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = RolDAO::DeleteRol($id);
		echo json_encode($dataArray);
	}
	
	public static function getPermisoByRol($id) {

		//$table = ['rol_permiso as ro','rol as r', 'permiso as p'];
		$dataArray = RolDAO::getPermisoByRol($id);
		echo json_encode($dataArray);
	}
	
	public static function insertPermisoRol($obj) {
		
		$primaries = [ "rol" =>$obj['rol'] , "permiso" => $obj['permiso']];
		$primaries2 = [
				"id" => $obj['rol']
		];
		$primaries3 = [
				"id" => $obj['permiso']
		];
		if(SupportService::FkValido('rol',$primaries2,"No existe un rol con este id") &&
				SupportService::FkValido('permiso',$primaries3,"No existe un permiso con este id") &&
				SupportService::IdValido('rol_permiso',$primaries,"Ya hay una relacion entre este rol y este permiso")){
					$dataArray = MasterDAO::insert('rol_permiso',$obj);
					echo json_encode($dataArray);
		}
	}
	
	public static function deletePermisoRol($rol, $permiso) {
		$primaries = [ "rol" => $rol , "permiso" => $permiso ];
		$dataArray = MasterDAO::delete('rol_permiso' , $primaries);
		echo json_encode($dataArray);
	}

}
?>