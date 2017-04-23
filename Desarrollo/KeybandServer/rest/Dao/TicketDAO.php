<?php
include_once "./conection.php";

class TicketDAO {
	
	public static function getDetalle($id) {
		$dataArray = array();
	
		if(!$id){
			header('HTTP/1.1 200 Los parametros no son correctos');
			$dataArray['message'] = "Los parametros en EstanciaDAO no son correctos";
			return $dataArray;
		}
	
			try {
				//Crear conexion
				$conection = openConection();
				//$set = 'SET search_path = "Keyband"';
				//SELECT * FROM "Keyband".usuario where nombre="Manuel" AND sexo='M' ORDER BY nombre ASC LIMIT 15 OFFSET 0
				//$sql = "SELECT hora_salida FROM acceso_estancia WHERE hora_salida is not null AND estancia ='".$id."'";
				//echo $sql;
				$sql = "select li.id, pro.nombre, pro.descripcion, li.cantidad, li.precio, pro.iva, pro.imagen from producto 
						as pro INNER join (ticket as ti INNER JOIN linea_ticket as li on ti.id = li.ticket) on 
						li.producto = pro.id where ti.id ='".$id."'";
				$result = pg_query($conection, $sql);
					
				if (!$result) {//Resultado erroneo
					header('HTTP/1.1 500 Resultado erroneo');
					return "Ocurrio un error en la consulta:".error_get_last();
				
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