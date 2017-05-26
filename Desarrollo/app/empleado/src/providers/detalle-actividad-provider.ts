import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';

/*
  Generated class for the DetalleActividadProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DetalleActividadProvider {
  	url: url;

  constructor(public http: Http) {
   	this.url = new url();
  }
getActividad(id){
   return this.http.get(this.url.getUrl()+"/producto/"+id)
                            .map(response => response.json())
}
getReservas(id){
  
  return this.http.get(this.url.getUrl()+"/producto/reservas/"+id)
                            .map(response => response.json())
}
}
