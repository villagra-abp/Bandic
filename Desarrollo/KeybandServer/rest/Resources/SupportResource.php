<?php
class SupportResource {
	public function getParams($param){		
		if(!$param)
			$param=1;	
		$PARAMS = array_slice($_GET, $param, count($_GET) - 1,true);
		return $PARAMS;
	}
	public function extractOrder($params){
		if(array_key_exists('order', $params) && array_key_exists('by', $params) && $params['order'] && $params['by']){
			$order = array();
					$order += array("order" => $params['order']);
					$order += array("by" => $params['by']);
			return $order;
		}else{
			return null;
		}
	}
	public function extractPagination($params){
		$pagination = array();
		//echo $params['initrow'];
		if(array_key_exists('initrow', $params) && array_key_exists('pagesize', $params) 
			&& $params['initrow']!=null && $params['pagesize']!=null){
			$pagination += array("initrow" => $params['initrow']);
			$pagination += array("pagesize" => $params['pagesize']);
			return $pagination;
		}else{
			return null;
		}
	}
	public function extractWhere($params){
		$where = array();
		foreach($params as $key => $key_value) {
			if($key!="order" && $key!="by" && $key!="pagesize" && $key!="initrow" && $key_value!=null){
				$where += array($key => $key_value);
			}
		}
		if(count($where)==0)
			return null;
			else
				return $where;
	}
	
	public function isTable($string) {
		$key_table = explode(".", $string);
		$tables = array("acceso_estancia", "asignar_producto", "categoria_producto", "estado_pulsera", "estancia", "linea_ticket", "permisos", "permisos_rol", "producto", "pulsera", "rol", "ticket", "tpv", "usuario", "usuario_rol");
		if(in_array($key_table[0], $tables))
			return true;
		else 
			return false;
	}
	
	public function echoError($mensaje){
		$dataArray = array();
		header('HTTP/1.1 200 Los parametros no son correctos');
		$dataArray['message'] = "Error: ".$mensaje;
		echo json_encode($dataArray);
	}
	public function isBool($string){
		if($string!="true" && $string!="false" && $string!="t" && $string!="f" && $string!=false && $string!=true ){
			return false;
		}
		return true;
	}
	public function isDate($fecha){
		$date=array();
		$date= split('-', $fecha);
		if(isset($date[0]) && isset($date[1]) && isset($date[2])){
			if(is_numeric($date[0]) && is_numeric($date[1]) && is_numeric($date[2])){
				if(checkdate ( $date[1] , $date[2] ,$date[0] ) || checkdate ( $date[1] , $date[0] ,$date[2] ))
					return true;
			}
		}
		return false;
	}
	public function ValidResource($resource){
		if($resource=='undefined' || $resource==null || $resource==''){
			SupportResource::echoError('Faltan parametros en la URL');
			return false;
		}
		return true;
	}
	
	public function comprobar_email($email){
		$mail_correcto = 0;
		//compruebo unas cosas primeras
		if ((strlen($email) >= 6) && (substr_count($email,"@") == 1) && (substr($email,0,1) != "@") && (substr($email,strlen($email)-1,1) != "@")){
			if ((!strstr($email,"'")) && (!strstr($email,"\"")) && (!strstr($email,"\\")) && (!strstr($email,"\$")) && (!strstr($email," "))) {
				//miro si tiene caracter .
				if (substr_count($email,".")>= 1){
					//obtengo la terminacion del dominio
					$term_dom = substr(strrchr ($email, '.'),1);
					//compruebo que la terminaci�n del dominio sea correcta
					if (strlen($term_dom)>1 && strlen($term_dom)<5 && (!strstr($term_dom,"@")) ){
						//compruebo que lo de antes del dominio sea correcto
						$antes_dom = substr($email,0,strlen($email) - strlen($term_dom) - 1);
						$caracter_ult = substr($antes_dom,strlen($antes_dom)-1,1);
						if ($caracter_ult != "@" && $caracter_ult != "."){
							$mail_correcto = 1;
						}
					}
				}
			}
		}
		if ($mail_correcto)
			return true;
			else
				return false;
	}
	public	function comprobar_dni($nif){
		$letras = explode(',','T,R,W,A,G,M,Y,F,P,D,X,B,N,J,Z,S,Q,V,H,L,C,K,E');
		if (
				(strlen($nif)!=9) ||
				(!is_long($entero=intval(substr($nif,0,8)))) ||
				(!in_array($letra=strtoupper(substr($nif,8,1)),$letras)) ||
				($letra!=$letras[$entero%23])
				){
					return false;
		}else{
			return true;
		}
	}
	public function Autorizathed($id_permiso,$user){
		if(PermisoService::Autorizathed($id_permiso,$user))
			return true;
			else
				SupportResource::echoError("no tienes permiso para hacer esto");
	}
}//end class
?>