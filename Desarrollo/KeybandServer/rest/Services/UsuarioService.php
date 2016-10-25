<?php
require_once "./Dao/UsuarioDAO.php";
require_once "./Dao/MasterDAO.php";

/***********************************************USUARIO Service****************************************/
/*AQUÍ LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRAÁ QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class UsuarioService {
	public static function getUsuarios () {
		$table = "usuario";
		$columns = ["nombre","apellidos"];
		$where = ["nombre"=>"Manuel","sexo"=>"M"];
		$order = ["order"=>"Asc","by"=>"nombre"];
		$pagination = ["initrow"=>"0","pageSize"=>"5"];
		$dataArray = MasterDAO::getAll($table,$columns,$where,$order,$pagination);
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

}
?>