<?php
require_once "./Classes/Usuario.php";

class UsuarioDAO {

	public function openConection(){
		//Parametros para la conexion
		try{		
			$string = "host=elmer-02.db.elephantsql.com port=5432 dbname=ibtdrmai user=ibtdrmai password=RGeQRmOB8RIinvLqkIBV2TW49_ClE81w";
			$conection = pg_pconnect($string);
			//TODO esquema por defecto
			$set = 'SET search_path = "Keyband"';
			$rec1 = pg_query($conection, $set);
		}catch(Exception $e){
			echo "PutoErrordemierda";
		}
		return $conection;
	}


}
?>