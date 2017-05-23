import { Injectable } from '@angular/core';
// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {


   constructor(private http: Http){}

   postLogin(dni, password){
       let valor = JSON.stringify({dni, password});
       
       return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/login",valor)
                            //.map(response => response.json());     
    }

  
}
