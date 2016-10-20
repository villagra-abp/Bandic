<?php

class MasterDAO {
	
	public static function delete($table,$primaries) {
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
				throw new Exception ($e->getMessage());
			}
	
			return $dataArray;
	}
	public static function getAll ($table,$columns) {
		//FUNCIONA PASANDOLE LA TABLA Y LAS COLUMNAS QUE QUIERES 
		//EJEMPLO: GETALL('usuario',['dni','nombre'])
		//si $columnas == null significa SELECT *
		if(!$table)
			return "Tienes que pasar la tabla";
		
		$dataArray = array();
		try {
			//Crear conexion
			$conection = MasterDAO::openConection();
			
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			
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
		//FUNCIONA COMO GETALL PERO CON LAS CLAVES PRIMARIAS Y LOS IDS EN ORDEN
		//EJEMPLO: GETBYID('usu_act',null,['usuario','actividad'],['123456789X','actividad2'])
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
	public function constructWhere($primaries){
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
			$set = 'SET search_path = "Keyband"';
			$rec1 = pg_query($conection, $set);
		}catch(Exception $e){
			echo "PutoErrordemierda";
		}
		return $conection;
	}
}
?>