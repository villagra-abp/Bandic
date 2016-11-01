<?php
require_once "./Dao/UsuarioDAO.php";
require_once "./Dao/MasterDAO.php";

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
		$dataArray = MasterDAO::insert('usuario',$obj);
		echo json_encode($dataArray);
	}
	
	public static function updateUsuario($obj,$id) {
		$primaries = [
			"dni" => $id
		];
		$dataArray = MasterDAO::update('usuario',$obj,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function deleteUsuario($id) {
		$primaries = [
				"dni" => $id
		];
		$dataArray = MasterDAO::delete('usuario',$primaries);
		echo json_encode($dataArray);
	}
	
	public static function asignarPulsera($pulsera, $id, $usuario, $dni) {
		$primaries = [
				"dni" => $dni
		];
		$usuario = MasterDAO::getById('usuario',null,$primaries);
		$primaries = [
				"id" => $id
		];
		$pulsera = MasterDAO::getById('pulsera',null,$primaries);
		echo json_encode($pulsera);
		
		//$dataArray = UsuarioDAO::asignarPulsera();
		//echo json_encode($dataArray);
	}

}
?>