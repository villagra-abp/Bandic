<?php
require_once "./Services/EstanciaService.php";
require_once "SupportResource.php";

/***********************************************Estancia RESOURCE****************************************/
class EstanciaResource{
	
	public static function methodEstancia($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consultar estancia
				EstanciaResource::getEstancia($type);
				break;
			case 'POST'://modificar estancia
				EstanciaResource::postEstancia($type);
				break;
			case 'PUT'://crear estancia
				EstanciaResource::putEstancia($type);
				break;
			case 'DELETE'://eliminar estancia
				EstanciaResource::deleteEstancia($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}

	public static function getEstancia($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   //estancia
				//Cojo los parametros que me han pasado por URL
				$params = SupportResource::getParams(1);

				//Extraigo los parametros de order,filtros y de paginacion que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(EstanciaResource::ValidGet($where))
					EstanciaService::getEstancias($where,$order,$pagination);
				break;
			case '2':   //estancia/id
				if(SupportResource::ValidResource($_GET['resource2']))
					EstanciaService::getEstanciaById($_GET['resource2']);
				break;

			case '5': //estancia/capacidad/id o /estancia/aforo/id o /estancia/accesoestancia/id
				if($_GET['resource2']=='capacidad'){
					EstanciaService::getEstanciaByCapacidad($_GET['resource3']);
				}
				else if($_GET['resource2']=='aforo'){
					EstanciaService::getAforoByEstancia($_GET['resource3']);
				}
				else if($_GET['resource2']=='accesoestancia'){
					EstanciaService::getAforoByMes($_GET['resource3']);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function putEstancia($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // estancia
				if(EstanciaResource::ValidPut($objArr))
					$dataArray = EstanciaService::insertEstancia($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function postEstancia($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //estancia/id
				if(EstanciaResource::ValidPost($objArr))
					$dataArray = EstanciaService::updateEstancia($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function deleteEstancia($type){
		switch ($type) {
			case '2':   //estancia/id
				$dataArray = EstanciaService::borrarEstancia($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>3){	//3 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","capacidad","publica");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}else if($key=="capacidad" && !is_numeric($key_value)){
					SupportResource::echoError("filtro de tipo no soportado");
					return false;
				}
				else if($key=="publica" && !SupportResource::isBool($key_value)){
					SupportResource::echoError("filtro de tipo no soportado");
					return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>4){	//3 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","capacidad","publica","descripcion");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(EstanciaResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)>4 || count($arrayKeys)<2){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","publica");
		$arraycol = array("id","capacidad","publica","descripcion");
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
		if(EstanciaResource::ContentObjArray($objArr))
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
						SupportResource::echoError("formato id no soportado");
						$return=false;
						break 2;
					}
					break;
				case 'capacidad':
					if(!is_numeric($key_value)){
						SupportResource::echoError("formato capacidad incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'publica':
					if(!SupportResource::isBool($key_value)){
						SupportResource::echoError("formato publica incorrecto");
						$return=false;
						break 2;
					}
					break;
				case 'descripcion':
					if(strlen($key_value)>500){
						SupportResource::echoError("formato descripcion incorrecto");
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
