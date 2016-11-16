<?php
require_once "./Dao/ProductoDAO.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class ProductoService {
	
	public static function getProductos($where,$order,$pagination) {
		$table = "producto";
		$dataArray = MasterDAO::getAll($table,null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getProductoById($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('producto',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function getProductoEmpleado($where,$order,$pagination) {
		$table = "asignar_producto";
		$dataArray = MasterDAO::getAll($table,null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	/*
	public static function getProductoByCategoria($where,$order,$pagination) {
		$dataArray = MasterDAO::getById('producto',null,$primaries);
		echo json_encode($dataArray);
	}
	*/
	public static function insertProducto($obj) {
		$dataArray = MasterDAO::insert('producto',$obj);
		echo json_encode($dataArray);
	}
	
	public static function asignarProducto($obj) {
		if(ProductoService::isEmpleado($obj)) {
			$dataArray = MasterDAO::insert('asignar_producto',$obj);
			echo json_encode($dataArray);
		}
		else {
			$dataArray = "No se puede asignar ese producto a ese usuario";
			echo json_encode($dataArray);
		}
	}
	
	public static function isEmpleado($obj) {
		$primaries = [
				"dni" => $obj['usuario'],
		];
		$dataArray = MasterDAO::getById('usuario',null,$primaries);
		//echo $dataArray[0]['empleado'];
		if($dataArray[0]['empleado'] == "t")
			return true;
		else 		
			return false;	
	}
	
	public static function insertProductoFoto($obj, $id) {	
		$METODO = $_SERVER['REQUEST_METHOD'];
		echo ((string)$obj);
		echo json_encode($METODO);
	}

	
	public static function updateProducto($obj, $id) {
		$primaries = [
				"nombre" => $id
		];
		$dataArray = MasterDAO::update('producto',$obj,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function deleteProducto($id) {
		$primaries = [
				"nombre" => $id
		];
		$dataArray = MasterDAO::delete('producto',$primaries);
		echo json_encode($dataArray);
	}
}
?>