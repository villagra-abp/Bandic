import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';

@Injectable()
export class PromocionesService {
//data: any
promociones;
data: any[];
url: url;
  constructor(public http: Http) {
    this.data = null;
    this.url = new url();
  }
  load(){
    if(this.data){
      return Promise.resolve(this.data)
    }
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/promocion')
      .map(res => res.json())
      .subscribe(data => {
        this.promociones = data;
        resolve(this.promociones);
      });
    });
  }
}
