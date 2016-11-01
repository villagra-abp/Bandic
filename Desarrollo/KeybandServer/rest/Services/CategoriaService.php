<?php 
require_once "./Dao/MasterDAO.php";

/***********************************************Categoria Service****************************************/

class CategoriaService {
	
	public static function getCategorias () {
		$table = "categoria_producto";
		$columns = [/*"id","comestible"*/];
		$where = [/*"nombre"=>"Manuel","sexo"=>"M"*/];
		$order = [/*"order"=>"Asc","by"=>"nombre"*/];
		$pagination = [/*"initrow"=>"0","pageSize"=>"5"*/];
		$dataArray = MasterDAO::getAll($table,$columns,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getCategoriaById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('categoria_producto',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertCategoria($obj) {
		$dataArray = MasterDAO::insert('categoria_producto',$obj);
		echo json_encode($dataArray);
	}
	
	public static function updateCategoria($obj,$id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::update('categoria_producto',$obj,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function deleteCategoria($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('categoria_producto',$primaries);
		echo json_encode($dataArray);
	}
}

?>