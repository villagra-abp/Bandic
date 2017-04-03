import { Injectable } from '@angular/core';

import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RolService {

  constructor(private http: Http) { }

  getPermisos(){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/permiso")
                            .map(response => response.json())
  }
  
  getRoles(){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/rol")
                            .map(response => response.json())
  }
  getRol(id){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/rol/" + id)
                            .map(response => response.json())
  }
  getPermisoByRol(id){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/rol/permiso/" + id)
                            .map(response => response.json())
  }
  deleteRol(id){
    return this.http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/rol/" + id)
                    .map(response => response.json())          
  }
   putRol(id, empleado, permisos): Observable<Response>{
        let enviar = JSON.stringify({id, empleado, permisos});
        console.log(enviar);
        return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/rol", enviar)
                        .map(response => response.json())                           
      }

    editRol(id, empleado, permisosnuevos, permisoseliminados){  
      let enviar = JSON.stringify({id, empleado, permisosnuevos, permisoseliminados});
      return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/rol/" + id, enviar)
                      .map(response => response.json())          
    }
}

