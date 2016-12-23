<?php
require_once "./Services/LoginService.php";

/***********************************************LOGIN****************************************/
class LoginResource{
	public static function methodLogin($method,$type){   //filtra por metodo
		switch ($method) {
			case 'POST'://inserta
				LoginResource::postLogin($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented'+$method);
				break;
		}

	}
	public static function postLogin($type){
		
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		
		switch ($type) {
			case '1':   //login
				$dataArray = LoginService::comprobarLogin($objArr);
				break;
			case '4':   //login/password
				if($_GET['resource2']=="password") 
					$dataArray = LoginService::restorePassword($objArr);
				if($_GET['resource2']=="passwordrestore")
					$dataArray = LoginService::updatePassword($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
		
				break;
		}
	}
}
?>