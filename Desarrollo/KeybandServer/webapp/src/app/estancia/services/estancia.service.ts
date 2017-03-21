// importamos el modulo Injectable de AngularJS
import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
//import {Observable} from "rxjs/Observable";
  
// Permitimos que este objeto se pueda inyectar con la DI
@Injectable()
export class EstanciaService {
  
   constructor(private http: Http){}
   
   getEstancia(estancia) {
      return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/estancia/"+estancia)
                            .map(response => response.json())
   }
}
