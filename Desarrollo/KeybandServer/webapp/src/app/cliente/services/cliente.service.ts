// importamos el modulo Injectable de AngularJS
import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
//import {Observable} from "rxjs/Observable";
  
// Permitimos que este objeto se pueda inyectar con la DI
@Injectable()
export class ClienteService {
  
   constructor(private http: Http){}
 
   getUsuarios(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario?empleado=f")
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

   getUsuario(id){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario?dni="+id)
                            .map(response => response.json())


   }

getEmpleado(id){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario?dni="+id)
                            .map(response => response.json())
                            
   }
   putUsuario(dni, password, nombre, apellidos, email, empleado,fecha_nacimiento,sexo, localidad, provincia, pais, pulsera, estado, fecha_entrada, fecha_salida, roles){
     let valor =JSON.stringify({dni, password, nombre, apellidos, email, empleado,fecha_nacimiento, sexo, localidad, provincia, pais, fecha_entrada, fecha_salida});
       let enviar=JSON.stringify({dni, roles});
       console.log(enviar);
      return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario",valor)
                            .subscribe(response=>{
                           let enviar=JSON.stringify({dni, roles});
                                console.log(response.json());
                                alert(pulsera);
                                if(pulsera!=""){
                                  this.postPulsera(pulsera, dni, estado);
                                }
                                
                            },
                            error => 
                                alert(error.text())
                            );
        
   }
   postUsuario(dni, password, nombre, apellidos, email, empleado,fecha_nacimiento, sexo, localidad, provincia, pais, fecha_entrada, fecha_salida){
       let valor =JSON.stringify({dni, nombre, apellidos, email, fecha_nacimiento, sexo, localidad, provincia, pais, fecha_entrada, fecha_salida});
       console.log(valor);
       return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/usuario/"+dni,valor)
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
}