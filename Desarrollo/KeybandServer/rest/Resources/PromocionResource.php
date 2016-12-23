<?php
require_once "./Services/PromocionService.php";
require_once "SupportResource.php";

/* **********************************************Promocion RESOURCE*************************************** */
class PromocionResource{
	
	public static function methodPromocion($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				PromocionResource::getPromocion($type);
				break;
			case 'POST'://inserta
				PromocionResource::postPromocion($type);
				break;
			case 'PUT'://actualiza
				PromocionResource::putPromocion($type);
				break;
			case 'DELETE'://elimina
				PromocionResource::deletePromocion($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getPromocion($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams(1);		
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(PromocionResource::ValidGet($where))
					PromocionService::getPromociones($where,$order,$pagination);
				break;
			case '2':   //usuario/id
				PromocionService::getPromocionById($_GET['resource2']);
				break;
			case '3':   //Promocion/usuario/accion
				PromocionService::getPromocionByUsuario($_GET['resource2'], $_GET['resource3']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postPromocion($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		
		switch ($type) {
			case '2':   //promocion/id

				if(PromocionResource::ValidPost($objArr))
					$dataArray = PromocionService::updatePromocion($objArr,$_GET['resource2']);
				break;
			
			default:
				header('HTTP/1.1 405 Method Not Allowed');
	
				break;
		}
	
	}

	public static function putPromocion($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   
				if(PromocionResource::ValidPut($objArr))
					$dataArray = PromocionService::insertPromocion($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function deletePromocion($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = PromocionService::deletePromocion($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
	
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>3){	//11 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","titulo", "descripcion");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>3){	//4 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","titulo", "descripcion");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(PromocionResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=3){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","titulo", "descripcion");
		$arraycol =array("id","titulo", "descripcion");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $arraycol)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		for ($i = 0; $i < count($arrayNotNull); $i++) {
			if(!in_array($arrayNotNull[$i],$arrayKeys)){
				SupportResource::echoError("Falta algun parametro requerido");
				return false;
			}
	
		}
		if(PromocionResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ContentObjArray($objArr){
		$return=true;
		foreach($objArr as $key => $key_value){
			switch ($key){	//tantos case como columnas. Mirad el script actualizado o $array de ValidGet
				case 'id':
					if($key_value==null){//lo que hay dentro del if es el caso de que haya algo mal
						SupportResource::echoError("id requerido");
						$return=false;
						break 2;
					}
					break;
				case 'titulo':
					if($key_value==null){
						SupportResource::echoError("titulo requerido");
						$return=false;
						break 2;
					}
					break;
					case 'descripcion':
						if($key_value==null){
							SupportResource::echoError("Descripcion requerida");
							$return=false;
							break 2;
						}
						break;
			}
		}
		return $return;
	}
}
?>