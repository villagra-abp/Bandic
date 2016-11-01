<?php
	function openConection(){
			//Parametros para la conexion
			try{
				$array_ini = parse_ini_file("fileini.ini");
				$string = "host=".$array_ini['host']." port=".$array_ini['port']." dbname=".$array_ini['dbname']." user=".$array_ini['user']." password=".$array_ini['password'];
				//print_r($string);
				$conection = pg_pconnect($string);
				//TODO esquema por defecto
				$set = 'SET search_path = "Keyband"';
				$rec1 = pg_query($conection, $set);
			}catch(Exception $e){
				echo "PutoErrordemierda";
			}
			return $conection;
	}
?>