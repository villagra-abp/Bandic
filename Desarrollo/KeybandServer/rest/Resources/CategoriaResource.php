<?php
require_once "./Services/CategoriaService.php";
/***********************************************CATEGORIA RESOURCE****************************************/
class CategoriaResource{
	public static function methodCategoriaProducto($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				CategoriaResource::getCategoria($type);
				break;
			case 'POST'://inserta
				CategoriaResource::postCategoria($type);
				break;
			case 'PUT'://actualiza
				CategoriaResource::putCategoria($type);
				break;
			case 'PATH'://actualiza
				UsuarioResource::pathCategoria($type);
				break;
			case 'DELETE'://elimina
				CategoriaResource::deleteCategoria($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
			
		}
	}
	
	public static function getCategoria($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // categoria
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams(1);
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(CategoriaResource::ValidGet($where))
					CategoriaService::getCategorias($where,$order,$pagination);
				break;
			case '2':   //categoria/id
				CategoriaService::getCategoriaById($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function putCategoria($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // insertar nueva categoria
				if(CategoriaResource::ValidPut($objArr))
					$dataArray = CategoriaService::insertCategoria($objArr);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function postCategoria($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //categoria/id
				if(CategoriaResource::ValidPost($objArr))
					$dataArray = CategoriaService::updateCategoria($objArr,$_GET['resource2']);
				break;
			case '5':   //recurso/id
				if($_GET['resource2']=="pulsera"){  //usuario/pulsera/id
						
				}else{
					//metodo no soportado
					header('HTTP/1.1 405 Method Not Allowed');
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	
	}
	
	public static function deleteCategoria($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = CategoriaService::deleteCategoria($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function ValidGet($where){
		if(count($where)>2){	//2 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("mas filtros que columnas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("id","comestible");
		if($where!=null){
			foreach($where as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay filtros que no existen");
					return false;
				}else if($key=="comestible" && !SupportResource::isBool($key_value)){			
						SupportResource::echoError("filtro de tipo no soportado");
						return false;
				}
			}
		}
		return true;
	}
	public static function ValidPost($objArr){
		if(count($objArr)>2){	//2 son todos los campos
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd
		$array = array("id","comestible");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(CategoriaResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=2){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		$arrayNotNull=array("id","comestible");
		$arraycol = array("id","comestible");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $arraycol)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		/*en este caso este bucle sobraria porque arraycol y arraynotnull valen lo mismo, lo dejo para no liar*/
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
				case 'comestible':
					if(!SupportResource::isBool($key_value)){
						SupportResource::echoError("formato comestible incorrecto");
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