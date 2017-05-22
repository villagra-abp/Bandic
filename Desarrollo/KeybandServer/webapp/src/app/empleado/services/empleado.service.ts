// importamos el modulo Injectable de AngularJS

import { Request, RequestMethod} from '@angular/http';
// Importamos los componentes que vamos a usar

import "rxjs/add/operator/map";

import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmpleadoService {

  constructor(private http: Http) { }


getEmpleados(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario?empleado=t")
                            .map(response => response.json())
                            
                            
   }
   getPulseras(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera?estado_pulsera=sin%20asignar")
                            .map(response => response.json())
                            
   }
    deleteEmpleado(id){
    
     return this.http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/"+ id)
                            .map(response => response.json())
   }
getEmpleado(id){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario?dni="+id)
                            .map(response => response.json())
                            
   }
   putUsuario(dni, password, nombre, apellidos, email, empleado,fecha_nacimiento,sexo, localidad, provincia, pais, pulsera, estado, roles){
     let valor =JSON.stringify({dni, password, nombre, apellidos, email, empleado,fecha_nacimiento, sexo, localidad, provincia, pais});
       let enviar=JSON.stringify({dni, roles});
       return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario",valor)
                            .subscribe(response=>{
                           let enviar=JSON.stringify({dni, roles});
                                console.log(response.json());
                                if(roles!="")
                                    this.putRol(enviar);
                                if (pulsera!="")
                                    this.postPulsera(pulsera, dni, estado);
                             
                            },
                            error => 
                                alert(error.text())
                            );
        
   }
   postUsuario(dni, password, nombre, apellidos, email, empleado,fecha_nacimiento, sexo, localidad, provincia, pais){
       let valor =JSON.stringify({dni, nombre, apellidos, email, fecha_nacimiento, sexo, localidad, provincia, pais});
       console.log(valor);
       return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/"+dni,valor)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                
                               
                            },
                            error => 
                                alert(error.text())
                            );
   }
putRol(enviar){
    return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/rol",enviar)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                
                               
                            },
                            error => 
                                alert(error.text())
                            );
}
   postPulsera(id, usuario, estado_pulsera){
     let valor= JSON.stringify({id, usuario, estado_pulsera});
     console.log(valor);
       return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera/"+id,valor)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                
                               
                            },
                            error => 
                                alert(error.text())
                            );
   }
   getPulsera_asignada(usuario){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera?estado_pulsera=activa&usuario="+usuario)
                            .map(response => response.json())
   }
   getPulseras_perdidas(usuario){
return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera?estado_pulsera=perdida&usuario="+usuario)
                            .map(response => response.json())
   }

   /**ALBERTO */
       filterEmpleados(dni, nombre, apellidos, localidad, provincia, pais, orderBy, init_row, paginar) {
     var filter = "";
     var pagination = "";
     var order = "";

     if(dni != undefined) {
        filter = "?dni="+dni;
     }
     else {
        filter = "?dni=";
     }
     if(nombre != undefined) {
        filter = filter + "&&nombre="+nombre;
     }
     else {
        filter = filter + "&&nombre=";
     }
     if(apellidos != undefined) {
        filter = filter + "&&apellidos="+apellidos;
     }
     else {
        filter = filter + "&&apellidos=";
     }
     if(provincia != undefined) {
        filter = filter + "&&provincia="+provincia;
     }
     else {
        filter = filter + "&&provincia=";
     }
     if(localidad != undefined) {
        filter = filter + "&&localidad="+localidad;
     }
     else {
        filter = filter + "&&localidad=";
     }
     if(pais != undefined) {
        filter = filter + "&&pais="+pais;
     }
     else {
        filter = filter + "&&pais=";
     }
    if(orderBy != undefined)
        order = "&&order=asc&&by="+orderBy;
    else
        order = "&&order=asc&&by=";
    if(!paginar)
        pagination = "&&initrow="+init_row+"&&pagesize=";
    else
        pagination = "&&initrow="+init_row+"&&pagesize=5";

    filter = filter+"&&empleado=t";

    console.log(filter+pagination+order);

        return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/usuario"+filter+pagination+order)
                            .map(response => response.json())
     
   }
}
   
