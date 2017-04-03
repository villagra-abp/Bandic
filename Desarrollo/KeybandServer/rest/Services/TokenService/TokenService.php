<?php
//require_once '../LoginService.php';
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT; //usando la libreria jwt

class TokenService
{
	private static $secret_key = 'KeyBand';
	private static $encrypt = ['HS256'];
	private static $aud = null;

	public static function crearToken($data)
	{
		$time = time();

		$token = array(
				'exp' => $time + (60*60), //tiempo expiracion 1h
				'aud' => self::Aud(), //datos de la ip, servidor, host...
				'data' => $data //datos recogidos del cliente
		);
			
		return JWT::encode($token, self::$secret_key); //codificamos token con la informacion mas la clave secreta
	}

	public static function checkToken($datos){

		/*echo $datos;

		//$dataArray = MasterDAO::getById('usuario',null,$datos);
		//echo json_encode($dataArray);
			
		if(count($dataArray)!=0){
		$token = TokenService::crearToken($datos);
		$obj = ["token" => $token ];

		echo "EHHHH LOCO";
			
		//$dataArray2 = MasterDAO::update("usuario",$obj,$datos);
			
		}
		else{
		echo "El token no corresponde con ningún usuario registrado";
		}*/
	}

	public static function Check($token) //lo hace tambien automaticamente la libreria JWT
	{
		if(empty($token))
		{
			throw new Exception("Invalid token supplied.");
		}

		$decode = JWT::decode(
				$token,
				self::$secret_key,
				self::$encrypt
				);

		if($decode->aud !== self::Aud())
		{
			throw new Exception("Invalid user logged in.");
		}
	}

	public static function GetData($token){
		
		$comprobar = JWT::decode(
				$token,
				self::$secret_key,
				self::$encrypt
				)->data;
		
				$dataArray = MasterDAO::getById('usuario',null,$comprobar);
				//echo json_encode($dataArray.nombre);
		
				if(count($dataArray)!=0){
					$token = TokenService::crearToken($comprobar);
					$obj = ["token" => $token ];
					
					$dataArray2 = MasterDAO::update("usuario",$obj,$comprobar);
				}
				else{
					echo "No se han encontrado coincidencias con los parámetros introducidos";
				}
		
	}

	public static function checkPassword($token){
	
		$comprobar = JWT::decode(
				$token,
				self::$secret_key,
				self::$encrypt
				)->data;
	
				$dataArray = MasterDAO::getById('usuario',null,$comprobar);
				
				//echo $dataArray[0]["email"];
				//echo json_encode($dataArray);
	
				if(count($dataArray)!=0){
					return $dataArray;
				}
				else{
					return null;
				}
	
	}
	
	private static function Aud() //este se encarga de validar que el usuario que esta navegando aparte de validar que el token sea válido, el secret key, también validará el navegador, ip, etc.
	{
		$aud = '';

		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$aud = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$aud = $_SERVER['REMOTE_ADDR'];
		}

		$aud .= @$_SERVER['HTTP_USER_AGENT'];
		$aud .= gethostname();

		return sha1($aud);
	}
}