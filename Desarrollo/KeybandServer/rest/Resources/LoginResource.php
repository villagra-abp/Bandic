<?php
require_once "./Services/LoginService.php";

/***********************************************LOGIN****************************************/
class LoginResource{
	public static function methodLogin($method,$type){
		if($method=='POST'){
			$obj = json_decode( file_get_contents('php://input'));
			$objArr = (array)$obj;
			echo "LLEGO HASTA AQUI";
			//echo $objArr["id"];
			$dataArray = LoginService::comprobarLogin($objArr);
			//echo json_encode($objArr);
		}
		else{
			echo "Método no soportado";
		}
	}
}
?>