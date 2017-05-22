import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class PulseraService {

  constructor(private http: Http) { }

getPulseras(){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera")
                            .map(response => response.json())
}
getPulsera(id){
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera?id="+id)
                            .map(response => response.json())
}
getEstados(){
     return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera/estado")
                            .map(response => response.json())
}
   deletePulsera(id){
     
     return this.http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera/"+id)
                            .map(response => response.json())
   }
    putPulsera(id,usuario, estado_pulsera){
       let valor =JSON.stringify({id,usuario, estado_pulsera});
       console.log(valor);
       return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera",valor)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                //this.getPromociones();
                               
                            },
                            error => 
                                alert(error.text())
                            );
        
   }

       postPulsera(id,usuario, estado_pulsera){
       let valor =JSON.stringify({id,usuario, estado_pulsera});
       console.log(valor);
       return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/pulsera/"+id,valor)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                //this.getPromociones();
                               
                            },
                            error => 
                                alert(error.text())
                            );
        
   }

filterPulseras(id, usuario, estado, orderBy, init_row, paginar) {
     var filter = "";
     var pagination = "";
     var order = "";

     if(id != undefined) {
        filter = "?id="+id;
     }
     else {
        filter = "?id=";
     }

     if(usuario != undefined) {
        filter = filter + "&&usuario="+usuario;
     }
     else {
        filter = filter + "&&usuario=";
     }

     if(estado != undefined) {
        filter = filter + "&&estado_pulsera="+estado;
     }
     else {
        filter = filter + "&&estado_pulsera=";
     }

    if(orderBy != undefined)
        if(orderBy == "Estado")
            order = "&&order=asc&&by=estado_pulsera";
        else
            order = "&&order=asc&&by="+orderBy;
    else 
        order = "&&order=asc&&by=";

    if(!paginar)
        pagination = "&&initrow="+init_row+"&&pagesize=";
    else
        pagination = "&&initrow="+init_row+"&&pagesize=5";

    console.log(filter+pagination+order);

        return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/pulsera"+filter+pagination+order)
                            .map(response => response.json())
     
   }
}
