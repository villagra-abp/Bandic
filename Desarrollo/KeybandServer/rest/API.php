<?php
require_once "Resources/UsuarioResource.php"; 
require_once "Resources/CategoriaResource.php";
require_once "Resources/PulseraResource.php";
require_once "Resources/EstanciaResource.php";
require_once "Resources/ProductoResource.php";
require_once "Resources/RolResource.php";
require_once "Resources/LoginResource.php";
require_once "Resources/TicketResource.php";
require_once "Resources/LineaTicketResource.php";
require_once "Resources/PermisoResource.php";
require_once "Resources/PromocionResource.php";
require_once "Resources/TpvResource.php";

class API {    

    public function rest(){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE");
        header('Content-Type: application/JSON; charset=utf-8');
        /*
        tipo 1: /recurso
        tipo 2: /recurso/id
        tipo 3: /recurso/id/id
        tipo 4: /recurso/recurso
        tipo 5: /recurso/recurso/id
        tipo 6: /recurso/recurso/id/id
        tipo 7: /recurso/recurso/recurso
        tipo 8: /recurso/recurso/recurso/id
        */
        $type = $this->typeURI();
        $method = $_SERVER['REQUEST_METHOD'];
        $resource = $_GET['resource'];
        switch ($resource){
            case 'login':
            	LoginResource::methodLogin($method,$type);
                break;
                
            case 'usuario':
                UsuarioResource::methodUsuario($method,$type);
                break;
                
            case 'producto':
                ProductoResource::methodProducto($method,$type);
                break;

            case 'estancia': 
                EstanciaResource::methodEstancia($method,$type);
                break;
                
            case 'pulsera':
            	PulseraResource::methodPulsera($method,$type);
                break;

            case 'permiso':
                PermisoResource::methodPermiso($method,$type);
            	break;
            	
            case 'promocion':
            		PromocionResource::methodPromocion($method,$type);
       		break;
                
            case 'rol':
               	RolResource::methodRol($method,$type);
                break;
                	
            case 'ticket':
            	TicketResource::methodTicket($method,$type);
            	break;
            case 'lineaticket':
            	LineaTicketResource::methodLineaTicket($method,$type);
            	break;
            case 'estadoPulsera':
            	EstadoPulseraResource::methodEstadoPulsera($method,$type);
            	break;
                
            case 'categoria':
            	CategoriaResource::methodCategoriaProducto($method,$type);
            	break;
            case 'empleado': //a producto, para tenerla junto a la otra que es muy parecida
            	ProductoResource::methodProducto($method,$type);
            	break;
            case 'reservas': //a producto, para tenerla junto a la otra que es muy parecida
            	ProductoResource::methodProducto($method,$type);
            	break;
            case 'tpv':
            	TpvResource::methodTpv($method,$type);
            	break;
            default:
            	header('HTTP/1.1 404 Not Found');
                break;
        }

    }
    public function typeURI(){
        /*esta funcion contempla mas casos de los que actualmente tenemos*/
        if(!isset($_GET['resource2'])){
            return 1;
        }else{
            if($this->isResource($_GET['resource2'])){  // hasta aqui es /recurso/recurso
                if(!isset($_GET['resource3'])){
                    return 4;
                }else{
                    if($this->isResource($_GET['resource3'])){  // si pasa esto como minimo es /recurso/recurso/recurso
                        if(!isset($_GET['resource4'])){
                            return 7;
                        }else{ //si existe tiene que ser id, pero se puede afinar mas
                            return 8;
                        }
                    }else{
                        if(!isset($_GET['resource4'])){
                            return 5;
                        }else{  //si existe tiene que ser id por la definicion de las URIs, pero es ampliable
                            return 6;
                        }
                    }
                }
            }else{	//hasta aqui es recurso/id
                if(!isset($_GET['resource3'])){
                    return 2;
                }else{
                	if($this->isResource($_GET['resource3'])){//recurso/id/recurso
                		header('HTTP/1.1 404 Not Found');
                		exit();
                	}else{
                    	return 3;
                	}
                }
            }
        }
       
    }
    public function isResource($resource){//añadir al array por cada nuevo recurso que se cree
        // TODO comprobar diferencias $array = array("rol","usuario","producto", "categoria", "empleado","reservas","estancia","capacidad","aforo","accesoestancia","ticket","carrito");
    	$array = array("usuario","password","passwordrestore","foto", "pulsera", "producto", "categoria", "empleado","reservas","estancia","capacidad","aforo",
        		"accesoestancia","ticket", "lineaticket", "carrito", "factura", "estado", "permiso", "factura", "lineafactura","rol", "promocion", "reservable", "tpv");
        $longitud = count($array);
        for($i=0; $i<$longitud; $i++){
            if($resource==$array[$i])
                return true;
        }
        return false;
    }
    public function getParams(){
    	$PARAMS = array_slice($_GET, 1, count($_GET) - 1,true);
    	return $PARAMS;
    }
    public function extractOrder($params){
    	if($params['order'] || $params['by']){
    		$order = array();
    		if($params['order'])
    			$order += array("order" => $params['order']);
    		if($params['by'])
    			$order += array("by" => $params['by']);
    		return $order;
    	}else{
    		return null;
    	}
    }
    public function extractPagination($params){
    	$pagination = array();
    	if($params['initrow'] || $params['pagesize']){
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
			if($key!="order" && $key!="by" && $key!="pagesize" && $key!="initrow"){
				$where += array($key => $key_value);
			}
    	}
    	if(count($where)==0)
    		return null;
    	else
    		return $where;
    }
}//end class
?>