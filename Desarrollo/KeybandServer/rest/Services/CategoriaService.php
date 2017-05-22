<?php 
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************Categoria Service****************************************/

class CategoriaService {
	
	public static function getCategorias ($where,$order,$pagination) {
		$table = "categoria_producto";
		$dataArray = MasterDAO::getAll($table,null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getCategoriaById ($id) {
		if($id == ""){
			header('HTTP/1.1 200 No ha introducido ID');
		}
		else{
			$primaries = [
					"id" => $id,
			];
			$dataArray = MasterDAO::getById('categoria_producto',null,$primaries);
			echo json_encode($dataArray);
		}
	}
	
	public static function insertCategoria($obj) {
		$primaries = [
				"id" => $obj['id'],
		];
		if(SupportService::IdValido('categoria_producto',$primaries,"Ya hay una categoria con ese nombre")){
			$dataArray = MasterDAO::insert('categoria_producto',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function updateCategoria($obj,$id) {
		$primaries = [
				"id" => $id
		];
		if($obj['id']!=$id){	//si intento modificar el id
			if(SupportService::IdValido('categoria_producto',$obj['id'],"Ya hay una categoria con ese nombre")){
				$dataArray = MasterDAO::update('categoria_producto',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}else{
			$dataArray = MasterDAO::update('categoria_producto',$obj,$primaries);
			echo json_encode($dataArray);
		};
	}
	
	public static function deleteCategoria($id) {
		/*
		$dataArray = MasterDAO::getAll('producto',null,null,null,null);
		foreach($dataArray as $key => $key_value) {
			foreach($key_value as $key2 => $key_value2) {
				if($key2 == "categoria_producto" && $key_value2 == $id) {
					$key_value['categoria_producto'] = null;
					$primaries = [
							"id"=> $key_value['id']
					];
					$dataArray2 = MasterDAO::update('producto',$key_value,$primaries);
				}
			}
		}
		*/
		
		$primaries2 = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('categoria_producto',$primaries2);
		echo json_encode($dataArray);
	}
}

?>