<?php
require_once "./Classes/Rol.php";

class RolDAO {
	public static function PutRol($rol){
		$dataArray = array();
		/*if($rol == "undefined" || $permisos == "undefined"){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en PermisoDAO no son correctos";
			return $dataArray;
		}*/
		try {
			$string = "INSERT INTO permisos_rol VALUES ";
			for($i = 0; $i<count($rol['permisos']); $i++){
				if($i!=intval(count($rol['permisos']))-1)
					$string = $string."('".$rol['id']."','".$rol['permisos'][$i]."'),";
					else
						$string = $string."('".$rol['id']."', '".$rol['permisos'][$i]."')";
			}
			$conection = openConection();
			$bool = "false";
			if($rol['empleado']==1 || $rol['empleado'] == true)
				$bool = "true";
			$sql = "INSERT INTO rol values ('".$rol['id']."', '".$bool."')";
			$result = @pg_query($conection, $sql);
		
			if (!$result) {
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{
				if(count($rol['permisos'])>0){
					$result = @pg_query($conection, $string);
					if (!$result) {
						header('HTTP/1.1 200 Error con la base de datos');
						return error_get_last();
					}
				}
			}
		
			@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $dataArray;
	}
	public static function EditRol($rol){
		$dataArray = array();
		/*if($rol == "undefined" || $permisos == "undefined"){
		 header('HTTP/1.1 200 Los parametros no son correctos');
		 $dataArray['message'] = "Los parametros en PermisoDAO no son correctos";
		 return $dataArray;
			}*/
		try {
			$sql2 = "INSERT INTO permisos_rol VALUES ";
			for($i = 0; $i<count($rol['permisosnuevos']); $i++){
				if($i!=intval(count($rol['permisosnuevos']))-1)//si no es el ultimo
					$sql2 = $sql2."('".$rol['id']."','".$rol['permisosnuevos'][$i]."'),";
					else
						$sql2 = $sql2."('".$rol['id']."', '".$rol['permisosnuevos'][$i]."')";
			}
			$sql3 = "DELETE from permisos_rol where rol='".$rol['id']."' and (";
			for($j = 0; $j<count($rol['permisoseliminados']); $j++){
				if($j!=intval(count($rol['permisoseliminados']))-1)//si no es el ultimo
					$sql3 = $sql3."permiso='".$rol['permisoseliminados'][$j]."' or ";
					else
						$sql3 = $sql3."permiso='".$rol['permisoseliminados'][$j]."')";
			}
			$conection = openConection();
			$bool = "false";
			if($rol['empleado']==1 || $rol['empleado'] == true)
				$bool = "true";
				$sql1 = "UPDATE rol set empleado = ".$bool." where id ='".$rol['id']."'";
				$result = @pg_query($conection, $sql1);
				if (!$result) {
					header('HTTP/1.1 200 Error con la base de datos');
					return error_get_last();
				}else{
					if(count($rol['permisosnuevos'])!=0){
						$result = @pg_query($conection, $sql2);
						if (!$result) {
							header('HTTP/1.1 200 Error con la base de datos');
							return error_get_last();
						}else{
							if(count($rol['permisoseliminados'])!=0){
								$result = @pg_query($conection, $sql3);
								if (!$result) {
									header('HTTP/1.1 200 Error con la base de datos');
									return error_get_last();
								}
							}
							
						}
					}
					else if(count($rol['permisoseliminados'])!=0){
						$result = @pg_query($conection, $sql3);
						if (!$result) {
							header('HTTP/1.1 200 Error con la base de datos');
							return error_get_last();
						}
					}
					
				}
	
				@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $dataArray;
	}
	public static function DeleteRol($rol){
		$dataArray = array();
		/*if($rol == "undefined" || $permisos == "undefined"){
		 header('HTTP/1.1 200 Los parametros no son correctos');
		 $dataArray['message'] = "Los parametros en PermisoDAO no son correctos";
		 return $dataArray;
			}*/
		try {
			$string = "DELETE FROM permisos_rol Where rol='".$rol."'";
			
			$conection = openConection();
			
				$sql = "DELETE FROM rol where id='".$rol."'";
				$result = @pg_query($conection, $string);
	
				if (!$result) {
					header('HTTP/1.1 200 Error con la base de datos');
					return error_get_last();
				}else{
					$result = @pg_query($conection, $sql);
					if (!$result) {
						header('HTTP/1.1 200 Error con la base de datos');
						return error_get_last();
					}
				}
	
				@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $dataArray;
	}
	public static function getPermisoByRol($id){
		$dataArray = array();
		try {
			$string = "SELECT p.* from permiso as p, permisos_rol as pr where p.id=pr.permiso and pr.rol ='".$id."'";
			$conection = openConection();
			$result = @pg_query($conection, $string);
		
				if (!$result) {
					header('HTTP/1.1 200 Error con la base de datos');
					return error_get_last();
				}else{
					$count = pg_numrows($result);
					for($i=0; $i<$count; $i++) {
						$row = pg_fetch_assoc ($result);
						$dataArray[] = $row;
					}
				}
		
				@pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $dataArray;
	}
	
}
?>