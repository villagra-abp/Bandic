<?php
require_once "./Classes/Usuario.php";

class UsuarioDAO {
	public static function asignarPulsera () {
	
		$dataArray = array();
		try {
			//Crear conexion
			$conection = openConection();
			//$set = 'SET search_path = "Keyband"';
			//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
			$sql = 'SELECT * FROM usuario';
			pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
			//throw new Exception ($e->getMessage());
		}
	
		return $dataArray;
	}
}
?>