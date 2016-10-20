<?php
require_once "./Dao/UsuarioDAO.php";
require_once "./Dao/MasterDAO.php";

/***********************************************USUARIO Service****************************************/
/*AQUÍ LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRAÁ QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class UsuarioService {
	public static function getUsuarios () {
		//getAll ($table,$columns)
		$dataArray = MasterDAO::getAll('usuario',null);
		echo json_encode($dataArray);
	}
	
	public static function getUsuarioById ($id) {
		$primaries = [
				"dni" => $id,
		];
		//getById(tabla,columnas,ArrayAsociativoPrimarias[Clave -> Valor])
		$dataArray = MasterDAO::getById('usuario',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertUsuario($obj) {
		//insert(tabla,objetoainsertar)
		$dataArray = MasterDAO::insert('usuario',$obj);
		echo json_encode($dataArray);
	}
	
	public static function updateUsuario($obj) {
		$primaries = [
			"dni" => $obj["dni"]
		];
		//update(tabla,ArrayAsociativoCamposAActualizar[Clave -> Valor],ArrayAsociativoPrimarias[Clave -> Valor])
		$dataArray = MasterDAO::update('usuario',$obj,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function deleteUsuario($obj) {
		$primaries = [
				"dni" => $obj
		];
		//delete($tabla,ArrayAsociativoPrimarias[Clave -> Valor])
		$dataArray = MasterDAO::delete('usuario',$primaries);
		echo json_encode($dataArray);
	}

}
?>