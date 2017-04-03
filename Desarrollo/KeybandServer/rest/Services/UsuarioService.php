<?php
require_once "./Dao/UsuarioDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class UsuarioService {
	public static function getUsuarios ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll("usuario",null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getUsuarioById ($id) {
		$primaries = [
				"dni" => $id,
		];
		$dataArray = MasterDAO::getById('usuario',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertUsuario($obj) {
		$primaries = array("dni" => $obj["dni"]);
		$primaries2 = array("email" => $obj["email"]);
		if(SupportService::IdValido("usuario",$primaries,"Ya existe un usuario con ese DNI") && SupportService::IdValido("usuario",$primaries2,"Ya existe un usuario con ese email")){
			
			$dataArray = MasterDAO::insert('usuario',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function updateUsuario($obj,$id) {
		$primaries = [
			"dni" => $id
		];
		if(!SupportService::IdValido("usuario",$obj["dni"],"No existe ningun usuario con ese DNI")){
			$dataArray = MasterDAO::update('usuario',$obj,$primaries);
			echo json_encode($dataArray);
			
		}
	}
	
	public static function deleteUsuario($id) {
		$primaries = [
				"dni" => $id
		];
		$dataArray = MasterDAO::delete('usuario',$primaries);
		echo json_encode($dataArray);
	}
	
	
	public static function getProductosByUsuario($where,$order,$pagination) {
		//	select id, nombre, descripcion from "Keyband".asignar_producto,"Keyband".producto where usuario='7380' and id = producto
		
		$columnas = ['dni', 'nombre'];
		$table = ['usuario_rol','rol'];

		$dataArray = UsuarioDAO::getProductosByUsuario($table,$columnas,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getRolByUsuario($where,$order,$pagination) {
		$columnas = ['dni' , 'nombre' , 'ur.rol'];
		$table = ['usuario_rol as ur' , 'usuario as u'];
	
		$dataArray = MasterDAO::getAll($table, $columnas, $where, $order, $pagination);
		echo json_encode($dataArray);
	}
	
	public static function insertRolUsuario($obj) {
		$dataArray = UsuarioDAO::InsertUsuarioRol($obj);
		echo json_encode($dataArray);
	}
	
	public static function deleteRolUsuario($dni , $rol) {
		$primaries = ["usuario" => $dni,"rol" => $rol ];
		
		$dataArray = MasterDAO::delete('usuario_rol' , $primaries);
		echo json_encode($dataArray);
	}

}
?>