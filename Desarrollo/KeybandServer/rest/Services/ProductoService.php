<?php
require_once "./Dao/ProductoDAO.php";
/***********************************************USUARIO Service****************************************/
/*AQUÍ LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRAÁ QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class ProductoService {
	
	public static function getProductos() {
		$table = "producto";
		$columns = [/*"id","comestible"*/];
		$where = [/*"nombre"=>"Manuel","sexo"=>"M"*/];
		$order = [/*"order"=>"Asc","by"=>"nombre"*/];
		$pagination = [/*"initrow"=>"0","pageSize"=>"5"*/];
		$dataArray = MasterDAO::getAll($table,$columns,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getProductoById($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('producto',null,$primaries);
		echo json_encode($dataArray);
	}
	public static function getProductoByCategoria($id) {
		$primaries = [
				"categoria_producto" => $id,
		];
		$dataArray = MasterDAO::getById('producto',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertProducto($obj) {
		$dataArray = MasterDAO::insert('producto',$obj);
		echo json_encode($dataArray);
	}
	
	public static function insertProductoFoto($obj) {
		if(isset($_POST['file'])) {
			echo "imagennnnnnn";
		}
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