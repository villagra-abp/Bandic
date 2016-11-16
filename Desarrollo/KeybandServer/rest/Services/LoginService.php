<?php
require_once "./Dao/LoginDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "TokenService/TokenService.php";

/***********************************************LOGIN Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class LoginService {

	public static function comprobarLogin($datos){

		$dataArray = MasterDAO::getById('usuario',null,$datos);
		//echo json_encode($datos);
		
		if(count($dataArray)!=0){
			$token = TokenService::crearToken($datos);
			$obj = ["token" => $token ];
			
			
	
			$dataArray2 = MasterDAO::update("usuario",$obj,$datos);
				
		}
		else{
			echo "No se han encontrado coincidencias con los parámetros introducidos";
		}

		echo json_encode($dataArray);

	}
}
?>