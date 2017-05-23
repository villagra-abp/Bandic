// importamos el modulo Injectable de AngularJS
import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";


@Injectable()
export class EstanciaService {

urlBase: string = 'http://localhost/Keyband/Desarrollo/KeybandServer/rest/'

  constructor(private http: Http) { }
     getEstancias(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia?publica=t")
                            .map(response => response.json())               
      }

      putEstancia(id, capacidad, descripcion): Observable<Response>{
        let publica = true;    
        let enviar = JSON.stringify({id, capacidad, publica, descripcion});

        return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia", enviar)
                        .map(response => response.json())                           
      }

      completeEstancia(id){
        return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/" + id)
                        .map(response => response.json())          
      }
      
      editEstancia(id, capacidad, descripcion){
        let publica = true;   
        let enviar = JSON.stringify({id, capacidad, publica, descripcion});
        return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/" + id, enviar)
                        .map(response => response.json())          
      }
      deleteEstancia(id){
        return this.http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/" + id)
                        .map(response => response.json())          
      }

/*NUEVO filterEstancias*/

      filterEstancias(id, capacidad, orderBy, init_row, paginar){
         var filter = "";
         var pagination = "";
         var order = "";

        if(id != undefined) {
            filter = "&&id="+id;
        }
        else {
            filter = "&&id=";
        }

        if(capacidad != undefined) {
            filter = filter + "&&capacidad="+capacidad;
        }
        else {
            filter = filter +  "&&capacidad=";
        }
        if(orderBy != undefined)
        order = "&&order=asc&&by="+orderBy;
        else
            order = "&&order=asc&&by=";
        if(!paginar)
            pagination = "&&initrow="+init_row+"&&pagesize=";
        else
            pagination = "&&initrow="+init_row+"&&pagesize=5";

        console.log(filter+pagination+order);

      return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/estancia?publica=t"+filter+pagination+order)
                      .map(response => response.json())
      }
}
