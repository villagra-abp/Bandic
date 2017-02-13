<?php

class PermisoDAO {
	public static function getPermisoByUsuario($usuario, $permiso){
		$dataArray = array();
		if($usuario == "undefined" || $permiso == "undefined"){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en MasterDAO no son correctos";
			return $dataArray;
		}
		try {
			$conection = openConection();
			$sql = "SELECT * FROM permisos where rol = '".$usuario."' and estancia = '".$permiso."'";
			$result = @pg_query($conection, $sql);
				
			if (!$result) {
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{
				$count = pg_numrows($result);
				if($count!=0)
					$dataArray[] = "ok";
				else
					$dataArray[] = "permiso denegado";
				/*for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}*/
			}
				
			@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $dataArray;
	}
	public static function getAutorizathed($id_permiso, $user){
		$valid = false;
		try {
			$conection = openConection();
			$sql = "select * from permisos_rol as pr, usuario_rol as ur where pr.id_permiso='".$id_permiso."' and pr.id_rol=ur.id_rol and ur.dni='".$user."';";
			$result = @pg_query($conection, $sql);
	
			if (!$result) {
				header('HTTP/1.1 200 Error con la base de datos');
				return false;
			}else{
				$count = pg_numrows($result);
				if($count!=0)
					$valid = true;
			}
	
			@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $valid;
	}
}
?>