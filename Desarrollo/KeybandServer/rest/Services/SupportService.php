<?php
class SupportService {
	public function echoError($mensaje){
		$dataArray = array();
		header('HTTP/1.1 200 Los parametros no son correctos');
		$dataArray['message'] = "Error: ".$mensaje;
		echo json_encode($dataArray);
	}
	public static function IdValido($table,$primaries,$mensaje){	//devuelve true si NO existe ese elemento en la bbdd
		$dataArray2 = MasterDAO::getById($table,null,$primaries);
		if(count($dataArray2)!=0){
			SupportResource::echoError($mensaje);
			return false;
		}
		return true;
	}
	public static function FKValido($table,$primaries,$mensaje){//devuelve true si existe ese elemento en la bbdd
		$dataArray2 = MasterDAO::getById($table,null,$primaries);//$primaries es un array asociativo donde: clave-> la CP de la tabla que quieres comprobar
		//Ejemplo: Estoy insertando pulsera que tiene FK a usuario. $primaries ser�a clave:dni, valor:El dni que quiero comprobar que exista.
		if(count($dataArray2)==0){
			SupportResource::echoError($mensaje);
			return false;
		}
		return true;
	}
}
?>