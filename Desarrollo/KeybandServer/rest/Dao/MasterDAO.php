<?php

class MasterDAO {
	
	public static function delete($table,$primaries) {
		/*EJEMPLO
		 * $table = "usuario"
		 	$primaries = ["dni":"dnifalso123"]
       	$primaries hay que construirlo en el service apartir de la URL. Como estamos en UsuarioService obviamente sabemos 
       	cual es la clave primaria de usuario - Soporta varias claves primarias
		 */
		if(!$table || !$primaries) 
			return "Tienes que pasar lo que quieres insertar o la tabla";
		$dataArray = array();
		try {
			$conection = MasterDAO::openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "DELETE FROM ".$table;
			$sql = $sql.MasterDAO::constructWhere($primaries);
			$result = pg_query($conection, $sql);
				
			if (!$result) {//Resultado erroneo
					
				return "Ocurrio un error.\n";
					
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	
	public static function update($table,$obj,$primaries) {
		/*EJEMPLO
		 $table = "usuario"
		 $obj = ["dni":"dnifalso123","nombre":"UpdatePrueba","apellidos":camporandom,
        	    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
        	    "provincia":"Alicante","rol":"Cliente","estancia":null,
        	    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"];
       	$primaries = ["dni"="dnifalso123"]
       	
       	$obj te viene del FRONT tal cual, pero $primaries hay que construirlo en el service. Como estamos en UsuarioService obviamente sabemos 
       	cual es la clave primaria de usuario por lo tanto la extraemos del $obj en un nuevo array - Soporta varias claves primarias
		 */
		if(!$obj || !$table || !$primaries)
			return "Tienes que pasar lo que quieres insertar o la tabla";
		$dataArray = array();
		try {
			$conection = MasterDAO::openConection();
			/*UPDATE films SET kind = 'Dramatic', actor = 'Juanxo' WHERE kind = 'Drama' AND jefe='juanxo'*/
			$sql = "UPDATE ".$table." SET ";
			
			$i = 0;
			$keys = "";
			$values = "";
			
			foreach($obj as $key => $key_value) {
				if($i==0) {
					if(!$key_value)
						$sql = $sql.$key."= NULL";
					else
						$sql = $sql.$key."='".$key_value."'";
				} else {
					if(!$key_value)
						$sql = $sql.",".$key."= NULL";
					else
						$sql = $sql.",".$key."='".$key_value."'";
				}
				$i++;
			}
			$sql = $sql.MasterDAO::constructWhere($primaries);
			
			$result = pg_query($conection, $sql);
			
			if (!$result) {//Resultado erroneo
			
				return "Ocurrio un error.\n";
			
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			//Cierro conexion
			pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function insert ($table, $obj) {
		/*EJEMPLO
		 
		 $table = "usuario"
		 $obj = ["dni":dnirandom,"nombre":$scope.nombre,"apellidos":"deSamu",
        	    "sexo":"F","pais":"Espa\u00f1a","localidad":"San Vicente",
        	    "provincia":"Alicante","rol":"Cliente","estancia":null,
        	    "empleado":"f","email":"juliana@gmail.com","fecha_nacimiento":"2002-12-10"];
       	Este objeto te debe venir así del FRONT supuestamente
		 */
		if(!$obj || !$table)
			return "Tienes que pasar lo que quieres insertar o la tabla";
	
			$dataArray = array();
			try {
				//Crear conexion
				$conection = MasterDAO::openConection();
				/*INSERT INTO films (code, title, did, date_prod, kind)
			    VALUES ('T_601', 'Yojimbo', 106, DEFAULT, 'Drama');*/
				$sql = "INSERT INTO ".$table." (";
				
				$i = 0;
				$keys = "";
				$values = "";
				foreach($obj as $key => $key_value) {
					if($i == 0) {
						$keys = $keys.$key;
						if(!$key_value)
							$values = $values."NULL";
						else
							$values = $values."'".$key_value."'";
					}else{
						$keys = $keys.",".$key;
						if(!$key_value)
							$values = $values.",NULL";
						else
							$values = $values.",'".$key_value."'";
					}
					$i++;
				}
				$sql = $sql.$keys.") VALUES (".$values.")";

				$result = pg_query($conection, $sql);
	
				if (!$result) {//Resultado erroneo
	
					return "Ocurrio un error.\n";
	
				}else{//Resultado correcto
					 $dataArray = $obj;
				}
				//Cierro conexion
				pg_close($conection);
	
			}catch (Exception $e) {//TODO Exception generica maaaal
				//throw new Exception ($e->getMessage());
			}
	
			return $dataArray;
	}
	public static function getAll ($table,$columns,$where,$order,$pagination) {
		/*
		 Ejemplo:
		 $table = "usuario" - No puede ser null
		 $columns = ["nombre","apellidos"] - Si es null hace Select *
		 $where = ["nombre"=>"Manuel","sexo"=>"M"] - Nullable
		 $order = ["order"=>"Asc","by"=>"nombre"] - Nullable
		 $pagination = ["initrow"=>"0","pageSize"=>"15"] - Nullable
		 Las filas comienzan en 0, por lo tanto si quieres coger las 5 primeras tienes que pasar initrow=0,pageSize=5.
		 Si quieres las siguientes 5 initrow=5,pagesize=5
		 */
		if(!$table)
			return "Tienes que pasar la tabla";
		
		$dataArray = array();
		try {
			//Crear conexion
			$conection = MasterDAO::openConection();
			//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			if($where)
				$sql = $sql.MasterDAO::constructWhere($where);
			if($order)
				$sql = $sql.MasterDAO::constructOrderBy($order);
			if($pagination)
				$sql = $sql.MasterDAO::constructPagination($pagination);
			$result = pg_query($conection, $sql);

			if (!$result) {//Resultado erroneo

				echo "Ocurrio un error.\n";

			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			//Cierro conexion
			pg_close($conection);

		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
			//throw new Exception ($e->getMessage());
		}

		return $dataArray;
	}
	public static function getById ($table,$columns,$primaries) {
		/*
		 EJEMPLO:
		 $table = "usuario"
		 $columns = ["nombre","apellidos"] - Si es null hace Select *
		 $primaries = ["dni":"dnifalso123"]
		 $primaries hay que construirlo en el service a partir de la URL. Como estamos en UsuarioService obviamente sabemos 
       	cual es la clave primaria de usuario - Soporta varias claves primarias
		 */
		$dataArray = array();
		
		if(!$primaries || !$ids || !$table)
			return "Es necesarios que pases clave primaria y los ids y la tabla";
		else
			if(count($primaries))
				return "Tienen que tener el mismo numero de primarias, que de ids";
		
		try {
			//Crear conexion
			$conection = MasterDAO::openConection();
				
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			$sql = $sql.MasterDAO::constructWhere($primaries);
			$result = pg_query($conection, $sql);
	
			if (!$result) {//Resultado erroneo
	
				echo "Ocurrio un error.\n";
	
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			//Cierro conexion
			pg_close($conection);
	
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
			//throw new Exception ($e->getMessage());
		}
	
		return $dataArray;
	}
	public function constructPagination($pagination){
		//recibe un array asociativo $pagination = ["initrow"=>"0","pageSize"=>"15"]
		//LIMIT 15 OFFSET 0 
		$limit = $pagination["initrow"] + $pagination["pageSize"];
		$sql = " LIMIT ".$limit." OFFSET ".$pagination["initrow"];
		return $sql;
	}
	public function constructOrderBy($order){
		//recibe un array asociativo $order = ["order"=>"Asc","by"=>"nombre"}
		$sql = " ORDER BY ".$order["by"]." ";
		if($order["order"])
			$sql = $sql.$order["order"];
		return $sql;
	}
	public function constructWhere($primaries){
		//recibe un array asociativo [clave->valor] - $primaries = ["dni" => "dnifalso123"]
		$sql = " WHERE ";
		$i=0;
		foreach($primaries as $key => $key_value) {
			if($i == 0) {
				$sql = $sql.$key."='".$key_value."'";
			}else{
				$sql = $sql."AND ".$key."='".$key_value."'";
			}
			$i++;
		}
		return $sql;
	}
	public function constructSelectFrom($table,$columns){
		if($columns){
			$sql = 'SELECT ';
			for($i=0;$i<count($columns);$i++){
				if($i==0){
					$sql = $sql.$columns[$i];
				}else{
					$sql = $sql.",".$columns[$i];
				}
			}
			$sql = $sql." FROM ".$table;
		}else{
			$sql = 'SELECT * FROM '.$table;
		}
		return $sql;
	}
	public function openConection(){
		//Parametros para la conexion
		try{
			
			$string = "host=elmer-02.db.elephantsql.com port=5432 dbname=ibtdrmai user=ibtdrmai password=RGeQRmOB8RIinvLqkIBV2TW49_ClE81w";
			$conection = pg_pconnect($string);
			//TODO esquema por defecto
			if(!$conection){
				echo "La conexion no funciona";
			}
			$set = 'SET search_path = "Keyband"';
			$rec1 = pg_query($conection, $set);
		}catch(Exception $e){
			echo "PutoErrordemierda";
		}
		return $conection;
	}
}
?>