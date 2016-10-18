<?php
require_once "Resources/UsuarioResource.php";    
require_once "Resources/ProductoResource.php";

class API {    

    public function rest(){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept");
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
                $this->methodLogin($method,$type);
                break;
            case 'usuario':
                UsuarioResource::methodUsuario($method,$type);
                break;

            case 'producto':
                $this->methodProducto($method,$type);
                break;

            case 'estancia':
                $this->methodEstancia($method,$type);
                break;

            default:
                echo 'METODO NOT FOUND';
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
                        }else{  //si existe tiene que ser id, pero se puede afinar mas
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
            }else{
                if(!isset($_GET['resource3'])){
                    return 2;
                }else{
                    return 3;
                }
            }
        }
    }
    public function isResource($resource){//añadir al array por cada nuevo recurso que se cree
        $array = array("usuario", "pulsera", "producto", "categoria", "empleado","reservas","estancia","capacidad","aforo","accesoestancia","ticket","carrito");
        $longitud = count($array);
        for($i=0; $i<$longitud; $i++){
            if($resource==$array[$i])
                return true;
        }
        return false;
    }
}//end class
?>