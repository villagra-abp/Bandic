import { Injectable } from '@angular/core';
// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";


@Injectable()
export class HabitacionService {

  constructor(private http: Http) { }
   getHabitaciones(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia?publica=f")
                            .map(response => response.json())               
      }
  deleteHabitacion(id){
    return this.http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/" + id)
                    .map(response => response.json())          
  }
  completeHabitacion(id){
    return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/" + id)
                    .map(response => response.json())          
  }
   putHabitacion(id, capacidad, descripcion): Observable<Response>{
        let publica = "false";    
        let enviar = JSON.stringify({id, capacidad, publica, descripcion});

        console.log(enviar);
        return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia", enviar)
                        .map(response => response.json())                           
      }

    editHabitacion(id, capacidad, descripcion){
      let publica = "false";   
      let enviar = JSON.stringify({id, capacidad, publica, descripcion});
      console.log(enviar);
      return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/" + id, enviar)
                      .map(response => response.json())          
    }
}
