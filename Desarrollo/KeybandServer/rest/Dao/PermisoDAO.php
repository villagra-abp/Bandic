<?php

class PermisoDAO {
	public static function getPermisoByUsuario($usuario, $permiso){
		$dataArray = array();
		if($usuario == "undefined" || $permiso == "undefined"){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray[] = "permiso denegado";	//creo que sobra, no es lo mismo paramametros incorrectos que permiso denegado
		}
		try {
			$conection = openConection();
			$sql = "SELECT * FROM permisos where rol = '".$usuario."' and estancia = '".$permiso."'";
			$result = pg_query($conection, $sql);
				
			if (!$result) {
				header('HTTP/1.1 500 Resultado erroneo');
				echo "Ocurrio un error.\n";
		
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
				
			pg_close($conection);
		}catch (Exception $e) {//TODO Exception generica maaaal
			echo "Excepcion";
		}
		return $dataArray;
	}
}
?>