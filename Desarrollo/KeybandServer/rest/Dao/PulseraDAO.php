<?php
require_once "./Classes/Pulsera.php";

class PulseraDAO {

	public static function getEstado() {
	
		$dataArray = array();
	
			try {
				//Crear conexion
				$conection = openConection();
				//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
				$sql = "SELECT * FROM estado_pulsera";
				//echo $sql;
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
					
				pg_close($conection);
			}catch (Exception $e) {//TODO Exception generica maaaal
				echo "Excepcion";
				//throw new Exception ($e->getMessage());
			}
	
			return $dataArray;
	}
}
?>