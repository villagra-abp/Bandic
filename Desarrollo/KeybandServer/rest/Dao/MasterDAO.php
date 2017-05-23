<?php
include_once "./conection.php";
include_once "./Resources/SupportResource.php";

class MasterDAO {
	
	public static function delete($table,$primaries) {
		/*EJEMPLO
		 * $table = "usuario"
		 	$primaries = ["dni":"dnifalso123"]
       	$primaries hay que construirlo en el service apartir de la URL. Como estamos en UsuarioService obviamente sabemos 
       	cual es la clave primaria de usuario - Soporta varias claves primarias
		 */
		$dataArray = array();
		if(!$table || !$primaries){			
			
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en MasterDAO no son correctos";
			return $dataArray;
		}
		$primaries = MasterDAO::scape_tags($primaries);	//elimina html
		if(!MasterDAO::real_scape($primaries)){	//si entra han intentado inyectar
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Has intentado jugarnosla";
			return $dataArray;
		}
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "DELETE FROM ".$table;
			$sql = $sql.MasterDAO::constructWhere($primaries);
			$result = @pg_query($conection, $sql);
				
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
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
		$dataArray = array();
		if(!$obj || !$table || !$primaries){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en MasterDAO no son correctos";
			return $dataArray;
		}
		$primaries = MasterDAO::scape_tags($primaries);	//elimina html
		if($table=="Promocion"){
			$obj = MasterDAO::scape_tags_promocion($obj);	//elimina html
		}else{
			$obj = MasterDAO::scape_tags($obj);	//elimina html
		}
		if(!MasterDAO::real_scape($primaries)){	//si entra han intentado inyectar
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Has intentado jugarnosla";
			return $dataArray;
		}
		
		try {
			$conection = openConection();
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
			$result = @pg_query($conection, $sql);
			
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 No se ha modificado correctamente');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			//Cierro conexion
			@pg_close($conection);
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
       	Este objeto te debe venir as� del FRONT supuestamente
		 */
		$dataArray = array();
		if(!$obj || !$table){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en MasterDAO no son correctos";
			return $dataArray;
		}

		if($table=="Promocion"){
			$obj = MasterDAO::scape_tags_promocion($obj);	//elimina html
		}else{
			$obj = MasterDAO::scape_tags($obj);	//elimina html
		}
		if(!MasterDAO::real_scape($obj)){	//si entra han intentado inyectar
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Has intentado jugarnosla";
			return $dataArray;
		}
			try {
				//Crear conexion
				$conection = openConection();
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
				//echo $sql;

				$result = @pg_query($conection, $sql);

				if (!$result) {//Resultado erroneo
					header('HTTP/1.1 200 No se ha podido insertar');
					return error_get_last();
	
				}else{//Resultado correcto
					 $dataArray = $obj;
				}
				//Cierro conexion
				@pg_close($conection);
	
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
		$dataArray = array();
		if(!$table){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en MasterDAO no son correctos";
			return $dataArray;
		}
		$where = MasterDAO::scape_tags($where);	//elimina html
		$order = MasterDAO::scape_tags($order);	//elimina html
		$pagination = MasterDAO::scape_tags($pagination);	//elimina html
		if(!MasterDAO::real_scape($where) || !MasterDAO::real_scape($order) || !MasterDAO::real_scape($pagination)){	//si entra han intentado inyectar
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Has intentado jugarnosla";
			return $dataArray;
		}
		try {
			//Crear conexion
			$conection = openConection();
			//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			if($where)
				$sql = $sql.MasterDAO::constructWhere($where);
			if($order)
				$sql = $sql.MasterDAO::constructOrderBy($order);
			if($pagination)
				$sql = $sql.MasterDAO::constructPagination($pagination);
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				//header('HTTP/1.1 200 Ocurrio un error en la consulta');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			//Cierro conexion
			@pg_close($conection);
			
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion que nunca salta, si salta avisar a SAMU";
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
		
		if(!$primaries || !$table) {
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en MasterDAO no son correctos";
			return $dataArray;
		}
		$primaries = MasterDAO::scape_tags($primaries);	//elimina html
		if(!MasterDAO::real_scape($primaries)){	//si entra han intentado inyectar
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Has intentado jugarnosla";
			return $dataArray;
		}

		try {
			//Crear conexion
			$conection = openConection();
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			$sql = $sql.MasterDAO::constructWhere($primaries);
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
	
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			//Cierro conexion
			@pg_close($conection);
	
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion que nunca salta, si salta avisar a SAMU";
				//throw new Exception ($e->getMessage());
		}
	
		return $dataArray;
	}
	public function constructPagination($pagination){
		//recibe un array asociativo $pagination = ["initrow"=>"0","pageSize"=>"15"]
		//LIMIT 15 OFFSET 0 
		$limit = $pagination["pagesize"];
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
				if($key_value=="")
					$sql = $sql.$key." is null ";
					else {
						if(!SupportResource::isTable($key_value)){
							if(!SupportResource::isBool($key_value) && !SupportResource::is_numeric($key,$key_value)) {
								$sql = $sql.$key." LIKE '%".$key_value."%' ";
							}
							else 
								$sql = $sql.$key." = '".$key_value."' ";
						}
						else {
							$sql = $sql.$key." = ".$key_value." ";
						}
					}
			}else{
				if($key_value=="")
					$sql = $sql."AND".$key." is null";
					else {
						if(!SupportResource::isTable($key_value)){
							if(!SupportResource::isBool($key_value) && !SupportResource::is_numeric($key,$key_value))
								$sql = $sql."AND ".$key." LIKE '%".$key_value."%' ";
							else
								$sql = $sql."AND ".$key." = '".$key_value."' ";
						}
						else {
							$sql = $sql."AND ".$key." = ".$key_value." ";
						}
					}
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
			$sql = $sql." FROM ";
			if(is_array($table)){
				for($j=0;$j<count($table);$j++){
					if($j==0)
						$sql = $sql.$table[$j];
						else
							$sql = $sql.",".$table[$j];
				}
			}else{
				$sql = $sql.$table;
			}
		}else{
			$sql = 'SELECT * FROM ';
			if(is_array($table)){
				for($j=0;$j<count($table);$j++){
					if($j==0)
						$sql = $sql.$table[$j];
						else
							$sql = $sql.",".$table[$j];
				}
			}else{
				$sql = $sql.$table;
			}
		}
		return $sql;
	}
	public function scape_tags($var){	/*devuelve la variable sin etiquetas*/
		if(is_array($var))
			$return=MasterDAO::scape_tags_array($var);
		else
			$return=MasterDAO::scape_tags_string($var);
		return $return;
	}
	public function scape_tags_array($array){/*recibe array asociativo*/
		$params =  array();
		$aux ="";
		foreach($array as $key => $key_value) {
			//echo "tags antes: ".$key_value." ";
			$aux=strip_tags($key_value);
			$params += array($key => $aux);
			//echo "tags Despues: ".$aux."\n";
		}
		return $params;
	}
	public function scape_tags_string($string){
		return strip_tags($string);
	}
	public function scape_tags_promocion($array){
		$params =  array();
		$aux ="";
		foreach($array as $key => $key_value) {
			if($key!="descripcion"){
				$aux=strip_tags($key_value);
			}
			else{
				$aux=$key_value;
			}
			$params += array($key => $aux);
			//echo "tags Despues: ".$aux."\n";
		}
		return $params;
	}
	public function real_scape($var){	/*devuelve true si NO hay cambios, false si los hay*/
		if(is_array($var))
			$return=MasterDAO::real_scape_array($var);
		else
			$return=MasterDAO::real_scape_string($var);
		return $return;
	}
	public function real_scape_array($array){/*recibe array asociativo*/
		$cadena= "";
		$caracteres = '& ; " \' = *';	//  \n es necesario?
		$caracteres = explode(' ',$caracteres);
		foreach($array as $key => $key_value) {
			$cadena = str_replace($caracteres,'_',$key_value);
			$cadena=pg_escape_string($cadena);
			if(strcmp($cadena,$key_value) != 0)
				return false;
		}
		return true;
	}
	public function real_scape_string($string){
		$cadena="";
		$caracteres = '& ; " \' = *';	//  \n es necesario?
		$caracteres = explode(' ',$caracteres);
		$cadena = str_replace($caracteres,'_',$string);
		$cadena=pg_escape_string($cadena);
		if(strcmp($cadena,$string) != 0){
			return false;
		}else{
			return true;
		}
	}
}
?>