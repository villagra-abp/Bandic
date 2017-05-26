import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';

/*
  Generated class for the ActividadesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActividadesProvider {
	url: url;
  constructor(public http: Http) {
  	this.url = new url();
  }
getActividades(){
   return this.http.get(this.url.getUrl()+"/producto/empleado/48674143W")
                            .map(response => response.json())
}




}
