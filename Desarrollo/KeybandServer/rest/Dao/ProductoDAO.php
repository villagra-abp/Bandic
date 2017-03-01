<?php
require_once "./Classes/Producto.php";

class ProductoDAO{
	public static function getProductosReservables($table,$columns,$where,$order,$pagination){
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
			if($where) {
				if(isset($where["id"]) && in_array($where["id"],$where)) {
					$where["producto.id"] = $where["id"];
					unset($where["id"]);
				}
				$sql = $sql.MasterDAO::constructWhere($where);
			}
				if($order)
					$sql = $sql.MasterDAO::constructOrderBy($order);
					if($pagination)
						$sql = $sql.MasterDAO::constructPagination($pagination);
						$result = @pg_query($conection, $sql);
						if (!$result) {//Resultado erroneo
							header('HTTP/1.1 200 Ocurrio un error en la consulta');
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
}