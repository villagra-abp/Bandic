<?php
include_once "./conection.php";

require_once "MasterDAO.php";

class UsuarioDAO {
	public static function getProductosByUsuario ($table,$columns,$where,$order,$pagination) {
	//	select id, nombre, descripcion from "Keyband".asignar_producto,"Keyband".producto where usuario='7380' and id = producto
		
		$dataArray = array();
		try {
			//Crear conexion
			$conection = openConection();
			//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			if($where)
				$sql = $sql.MasterDAO::constructWhere($where);
			$sql = $sql." AND id=producto ";
			if($order)
				$sql = $sql.MasterDAO::constructOrderBy($order);
			if($pagination)
				$sql = $sql.MasterDAO::constructPagination($pagination);
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo

				var_dump(http_response_code(500));
				return "Ocurri� un error en la consulta:".error_get_last();

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
	
	public static function getRolByUsuario ($table,$columns,$where,$order,$pagination) {
		//	select id, nombre, descripcion from "Keyband".asignar_producto,"Keyband".producto where usuario='7380' and id = producto
	

		$dataArray = array();
		try {
			//Crear conexion
			$conection = openConection();
			//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
			//Select * from "keyband".usuario_rol as u , "Keyband".usuario as usu where u.usuario="234" and u.usuario = usu.dni
			//Select * from "Keyband".usuario_rol as u , "Keyband".usuario as usu where u.usuario='7380' and u.usuario = usu.dni
			$sql = MasterDAO::constructSelectFrom($table, $columns);
			if($where)
				$sql = $sql.MasterDAO::constructWhere($where);
				$sql = $sql." AND rol = rol ";
				if($order)
					$sql = $sql.MasterDAO::constructOrderBy($order);
					if($pagination)
						$sql = $sql.MasterDAO::constructPagination($pagination);
						$result = @pg_query($conection, $sql);
						if (!$result) {//Resultado erroneo
		
							var_dump(http_response_code(500));
							return "Ocurri� un error en la consulta:".error_get_last();
		
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
}
?>