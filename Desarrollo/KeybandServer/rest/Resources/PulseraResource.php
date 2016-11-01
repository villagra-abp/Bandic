 <?php
require_once "./Services/PulseraService.php";
require_once "SupportResource.php";

/***********************************************Pulsera RESOURCE****************************************/
class PulseraResource{
	
	public static function methodPulsera($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				PulseraResource::getPulsera($type);
				break;
			case 'POST'://inserta
				PulseraResource::postPulsera($type);
				break;
			case 'PUT'://actualiza
				PulseraResource::putPulsera($type);
				break;
			case 'DELETE'://elimina
				PulseraResource::deletePulsera($type);
				break;
			default://metodo NO soportado
				echo 'METODO NO SOPORTADO';
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getPulsera($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '1':   // usuario
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams();		
				
				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				
				PulseraService::getPulseras($where,$order,$pagination);
				break;
			case '2':   //usuario/id
				PulseraService::getPulseraById($_GET['resource2']);
				break;
			default:
				echo "M�todo no soportado";
				break;
		}
	}
	public static function postPulsera($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = PulseraService::updatePulsera($objArr,$_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id
				if($_GET['resource2']=="pulsera"){  //usuario/pulsera/id
						
				}else{
					//metodo no soportado
					echo "M�todo no soportado";
				}
				break;
			default:
				echo "M�todo no soportado";
	
				break;
		}
	
	}
	public function prueba(){
		return true;
	}
	public static function putPulsera($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   
				$dataArray = PulseraService::insertPulsera($objArr);
				break;
			default:
				echo "M�todo no soportado";
				break;
		}
	}
	public static function deletePulsera($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = PulseraService::deletePulsera($_GET['resource2']);
				break;
			default:
				echo "M�todo no soportado";
	
				break;
		}
	}
}
?>