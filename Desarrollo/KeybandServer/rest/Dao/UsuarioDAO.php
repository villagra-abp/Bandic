<?php
require_once "./Classes/Usuario.php";

class UsuarioDAO {

	public static function getUsuarios () {
		$dataArray = array();
		try {
			//Crear conexion
			$conection = UsuarioDAO::openConection();
				
			$sql = 'SELECT * FROM usuario';
			$result = pg_query($conection, $sql);
				
			if (!$result) {//Resultado erroneo

				echo "Ocurrio un error.\n";

			}else{//Resultado correcto
				$dataArray = UsuarioDAO::prepareDataArray($result);
			}
			//Cierro conexion
			pg_close($conection);
				
		}catch (Exception $e) {//TODO Exception generica maaaal
			throw new Exception ($e->getMessage());
		}

		return $dataArray;
	}
	public static function getUsuarioById ($id) {
		$dataArray = array();
		try{
			$conection = UsuarioDAO::openConection();
			//Sentencia
			/*Función para escapar los caracteres extraños en caso de que no puedas pasarlo por parametros
			 $elemento= pg_escape_string($data);
			 $sql = 'SELECT * FROM '.$elemento;
			 $result = pg_query($conection, $sql);*/
				
			//Importante pasarlo con esta función para evitar inyecciones
			$sql = 'SELECT * FROM usuario WHERE dni = $1';
			$result = pg_query_params($conection, $sql, array($id));//Array con los parámetros
				
			if (!$result) {//Resultado erroneo
					
				echo "Ocurrio un error.\n";
					
			}else{//Resultado correcto

				$dataArray = UsuarioDAO::prepareDataArray($result);

			}
			//Cierro conexion
			pg_close($conection);
		}catch (Exception $e){//TODO Exception generica maaaal
			throw new Exception ($e->getMessage());
		}

		return $dataArray;

	}

	public function prepareDataArray($result) {
		$dataArray = array();
		//Creo un array con el resultado
		$count = pg_numrows($result);
		for($i=0; $i<$count; $i++) {
			$row = pg_fetch_row($result);
			$dataArray[] = new Usuario (
					$row[0],
					$row[1],
					$row[2],
					$row[3],
					$row[4],
					$row[5],
					$row[6],
					$row[7],
					$row[8],
					$row[9],
					$row[10],
					$row[11]
					);
		}
		return $dataArray;
	}

	public function openConection(){
		//Parametros para la conexion
		try{		
			$string = "host=elmer-02.db.elephantsql.com port=5432 dbname=ibtdrmai user=ibtdrmai password=RGeQRmOB8RIinvLqkIBV2TW49_ClE81w";
			$conection = pg_pconnect($string);
			//TODO esquema por defecto
			$set = 'SET search_path = "Keyband"';
			$rec1 = pg_query($conection, $set);
		}catch(Exception $e){
			echo "Ha petao esto";
		}
		return $conection;
	}


}
?>