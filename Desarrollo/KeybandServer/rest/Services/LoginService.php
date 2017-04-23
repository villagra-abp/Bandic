<?php
require_once "./Dao/LoginDAO.php";
require_once "./Dao/MasterDAO.php";
require_once "TokenService/TokenService.php";
require_once "MailService.php";
require_once "SupportService.php";
/***********************************************LOGIN Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class LoginService {

	public static function comprobarLogin($datos){
		$dataArray = MasterDAO::getById('usuario',null,$datos);
		//echo json_encode($datos);
		
		if(count($dataArray)!=0){
			$token = TokenService::crearToken($datos);	
			$obj = ["token" => $token];
		
			$dataArray2 = MasterDAO::update("usuario",$obj ,$datos);
				
		}
		else{
			echo "No se han encontrado coincidencias con los parámetros introducidos";
		}

		echo json_encode($dataArray);

	}
	public static function updatePassword($obj) {
		$user = TokenService::checkPassword($obj["token"]);
		if($user){
			$primaries = ["dni"=>$user[0]["dni"]];
			$update = ["password"=>$obj["password"]];
			$dataArray = MasterDAO::update("usuario",$update,$primaries);
		}else{
			header('HTTP/1.1 200 El token es incorrecto');
			$dataArray['message'] = "El token de seguridad es incorrecto, vuelve a intentarlo";
		}
		echo json_encode($dataArray);
	}
	public static function restorePassword($obj) {
		$dataArray = array();
		$dataArray = MasterDAO::getById('usuario',null,$obj);
		if(count($dataArray)!=0){
			$token = TokenService::crearToken($obj);
			$email = array(
					'emaildest' =>$dataArray[0]["email"],
					'namedest' => $dataArray[0]["nombre"]." ".$dataArray[0]["apellidos"] ,
					'body' => "Por favor usa este enlace para cambiar tu contrase�a: http://localhost/KeyBand/Desarrollo/KeybandServer/webapp/index.html#/restorepassword?".$token,
					 'subject' => $dataArray[0]["nombre"]." Restablece tu contrase�a - KeyBand"
					
			);
		/*	$email['emaildest'] = $dataArray["email"];
			$email['namedest'] = $dataArray["nombre"]." ".$dataArray["apellidos"] ;
			$email['body'] = "Por favor usa este enlace para cambiar tu contrase�a: http://localhost/KeyBand/Desarrollo/webapp/pages/restorepassword.html?".$token;
			$email['subject'] = "Restablece tu contrase�a";*/
			
				$dataArray = MailService::sendMail($email);
				echo json_encode($dataArray);
		}else{
			header('HTTP/1.1 200 Este correo no existe');
			$dataArray['message'] = "Este correo no existe en el sistema";
			echo json_encode($dataArray);
		}
	}
}
?>