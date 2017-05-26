import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { url } from '../app/url';
  
@Injectable()
export class TpvProvider {
url: url;
  constructor(public http: Http) {
      this.url = new url();
  }

  getProductos(){
      console.log(this.url.getUrl());
   return this.http.get(this.url.getUrl()+"/producto/tpv")
                            .map(response => response.json())
  }

  getCategorias(){
   return this.http.get(this.url.getUrl()+"/categoria?comestible=true")
                            .map(response => response.json())
  }

  getImporte(id){ //esto lo tienes que cambiar por ticket
    return this.http.get(this.url.getUrl()+"/rest/producto/" +id)
                            .map(response => response.json())
  }

  crearTicket(id){ //esto lo tienes que cambiar por ticket
/*
    let enviar = JSON.stringify({id, usuario, fecha,});
    {"id":idrandom,"usuario":"48764260M","fecha":"2002-12-10","tpv": $scope.idTpv};
    return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/ticket" + enviar)
                            .map(response => response.json())
                            */
  }

  filterCategorias(categoria){
        var filter = "";
     
        if(categoria != undefined) {
            filter = "?categoria_producto="+categoria;
        }
        else {
            filter = "/tpv";
        }
        console.log(filter);

      return this.http.get(this.url.getUrl()+"/producto"+filter)
                      .map(response => response.json())
      }
}
