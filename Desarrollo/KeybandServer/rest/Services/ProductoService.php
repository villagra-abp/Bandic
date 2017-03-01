<?php
require_once "./Dao/ProductoDAO.php";
require_once "SupportService.php";
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
	
	public static function getProductosTpv($where,$order,$pagination) {
		$where["categoria_producto.comestible"] = 'true';
		$where["categoria_producto.id"] = "producto.categoria_producto";
		$dataArray = MasterDAO::getAll(["producto", "categoria_producto"],["producto.id","producto.nombre","producto.descripcion","producto.precio","producto.cantidad_disponible","producto.categoria_producto"],$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getProductosReservables($where,$order,$pagination) {
		$where["categoria_producto.comestible"] = 'false';
		$where["categoria_producto.id"] = "producto.categoria_producto";
		$dataArray = ProductoDAO::getProductosReservables(["producto", "categoria_producto"],["producto.id","producto.nombre","producto.descripcion","producto.precio","producto.cantidad_disponible","producto.categoria_producto"],$where,$order,$pagination);
		echo json_encode($dataArray);
	}

	//empleado asignado a un producto
	public static function getEmpleadoDeProducto($where,$order,$pagination) {
		$where["asignar_producto.usuario"] = "usuario.dni";
		$where["usuario.empleado"] = 'true';
		$dataArray = MasterDao::getAll(["asignar_producto", "usuario"],["usuario.dni", "usuario.nombre", "usuario.apellidos", "usuario.sexo", "usuario.pais", "usuario.localidad", "usuario.email"],$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	//productos asignados a un empleado
	public static function getProductosAsignados($id,$where,$order,$pagination) {
		$primaries = [
				"dni" => $id,
		];
		$dataArray = MasterDAO::getById('usuario',null,$primaries);
		//echo $dataArray[0]['empleado'];
		if($dataArray[0]['empleado'] == "t") {
			$where["asignar_producto.producto"] = "producto.id";
			$dataArray = MasterDAO::getAll(["asignar_producto", "producto"],["producto.id, producto.nombre, producto.descripcion"],$where,$order,$pagination);
			echo json_encode($dataArray);
		}
		else {
			echo "tu no eres empleado";
		}
	}
	
	//reservas de un producto(usuarios)
	public static function getUsuariosDeProducto($where,$order,$pagination){
		$where["asignar_producto.usuario"] = "usuario.dni";
		$where["usuario.empleado"] = 'false';
		$dataArray = MasterDao::getAll(["asignar_producto", "usuario"],["usuario.dni", "usuario.nombre", "usuario.apellidos", "usuario.sexo", "usuario.pais", "usuario.localidad", "usuario.email"],$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	//productos reservados por un usuario
	public static function getReservas($id,$where,$order,$pagination) {
		$primaries = [
				"dni" => $id,
		];
		$dataArray = MasterDAO::getById('usuario',null,$primaries);
		//echo $dataArray[0]['empleado'];
		if($dataArray[0]['empleado'] == "f") {
			$where["asignar_producto.producto"] = "producto.id";
			$dataArray2 = MasterDAO::getAll(["asignar_producto", "producto"],["producto.id, producto.nombre, producto.descripcion"],$where,$order,$pagination);
			echo json_encode($dataArray2);
		}
		else {
			echo "tu eres un empleado, no tienes reservas";
		}
	}
	
	public static function insertProducto($obj) {
		$primaries = [
				"id" => $obj['id']
		];
		if(SupportService::IdValido('producto',$primaries,"Ya hay un producto con ese id")) {
			$dataArray = MasterDAO::insert('producto',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function asignarProducto($obj) {
		if(ProductoService::isEmpleado($obj)) {
			$primaries = [
					"usuario" => $obj['usuario'],
					"producto" => $obj['producto']
			];
			$primaries2 = [
					"id" => $obj['producto']
			];
			$primaries3 = [
					"dni" => $obj['usuario']
			];
			if(SupportService::IdValido('asignar_producto',$primaries,"Ese producto ya est� asignado a ese cliente") &&
					SupportService::FkValido('producto',$primaries2,"El producto debe existir") &&
					SupportService::FkValido('usuario',$primaries3,"El usuario debe existir")) {
				$dataArray = MasterDAO::insert('asignar_producto',$obj);
				echo json_encode($dataArray);
			}
		}
		else {
			$dataArray = "No se puede asignar ese producto a ese usuario";
			echo json_encode($dataArray);
		}
	}
	
	public static function reservarProducto($obj) {
		if(!ProductoService::isEmpleado($obj)) {
			if(SupportService::IdValido('asignar_producto',$primaries,"Ese producto ya est� asignado a ese cliente") &&
				SupportService::FkValido('producto',$primaries2,"El producto debe existir") &&
				SupportService::FkValido('usuario',$primaries3,"El usuario debe existir")) {
				$dataArray = MasterDAO::insert('asignar_producto',$obj);
				echo json_encode($dataArray);
			}
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

	public static function updateProducto($obj, $id) {
		$primaries = [
				"id" => $id
		];
		if($obj['id']!=$id){
			if(SupportService::IdValido('producto',$primaries,"Ya hay un producto con ese id")) {
				$dataArray = MasterDAO::update('producto',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}
		else {
			$dataArray = MasterDAO::update('producto',$obj,$primaries);
			echo json_encode($dataArray);
		}
	}
	
	public static function deleteProducto($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('producto',$primaries);
		echo json_encode($dataArray);
	}
}
?>