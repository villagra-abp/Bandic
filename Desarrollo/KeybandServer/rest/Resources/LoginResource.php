<?php
require_once "./Services/LoginService.php";

/***********************************************LOGIN****************************************/
class LoginResource{
	public static function methodLogin($method,$type){
		if($method=='POST'){
			$obj = json_decode( file_get_contents('php://input'));
			$objArr = (array)$obj;
			$dataArray = LoginService::comprobarLogin($objArr);
			//echo json_encode($objArr);
		}
		else{
			header('HTTP/1.1 501 Not Implemented');
		}
	}
}
?>