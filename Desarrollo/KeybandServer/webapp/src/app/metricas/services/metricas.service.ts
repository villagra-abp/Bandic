import { Injectable } from '@angular/core';
// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";

@Injectable()
export class MetricasService {

  constructor(private http: Http) { }

     getOcupacion(id){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/estancia/accesoestancia/" + id)
                            .map(response => response.json())          
      }

}
