<?php
require_once "./Classes/Pulsera.php";

class PulseraDAO {

	public static function getEstado() {
	
		$dataArray = array();
	
			try {
				$conection = openConection();
				$sql = "SELECT * FROM estado_pulsera";
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
			}catch (Exception $e) {//TODO Exception generica maaaal
				echo "Excepcion";
				//throw new Exception ($e->getMessage());
			}
			return $dataArray;
	}
}
?>