<?php
require_once "./Dao/PromocionDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "SupportService.php";
/***********************************************PROMOCION Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class PromocionService {
	public static function getPromociones ($where,$order,$pagination) {
		$dataArray = MasterDAO::getAll("Promocion",null,$where,$order,$pagination);
		echo json_encode($dataArray);
	}
	
	public static function getPromocionById ($id) {
		$primaries = [
				"id" => $id,
		];
		$dataArray = MasterDAO::getById('Promocion',null,$primaries);
		echo json_encode($dataArray);
	}
	
	public static function insertPromocion($obj) {
		$primaries = [
				"id" => $obj["id"]
		];
		
		if(SupportService::IdValido('Promocion',$primaries,"Ya hay una promocion con ese id")){
			$dataArray = MasterDAO::insert('Promocion',$obj);
			echo json_encode($dataArray);
		}
	}
	
	public static function updatePromocion($obj,$id) {
		$primaries = [
				"id" => $id
		];
		if($obj['id']!=$id){    //si intento modificar el id
			$primariesaux = [
					"id" => $obj['id']
			];
			if(SupportService::IdValido('Promocion',$primariesaux,"Ya hay una promocion con ese id")){
				$dataArray = MasterDAO::update('Promocion',$obj,$primaries);
				echo json_encode($dataArray);
			}
		}else{
			$dataArray = MasterDAO::update('Promocion',$obj,$primaries);
			echo json_encode($dataArray);
		};
	}
	public static function deletePromocion($id) {
		$primaries = [
				"id" => $id
		];
		$dataArray = MasterDAO::delete('Promocion',$primaries);
		echo json_encode($dataArray);
	}
/*	public static function getPromocionByUsuario($usuario, $Promocion){
		$dataArray = PromocionDAO::getPromocionByUsuario($usuario, $Promocion);
		echo json_encode($dataArray);
	}*/

}
?>