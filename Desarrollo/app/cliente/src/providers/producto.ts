import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';


@Injectable()
export class ProductoService {
  data: any;
  url: url;

  constructor(public http: Http) {
    this.data = null;
    this.url = new url();
  }
  load(){
    /*if(this.data){
      return Promise.resolve(this.data)
    }*/
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/producto/reservable')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
  getProducto(producto){
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/producto/'+producto)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
  publicarFb(producto){
    return new Promise(resolve => {
      this.http.get('http://84.120.88.184:15237/rest/fb/barcelo/'+producto)
      //.map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.data = data;
        resolve(this.data);
      });
    });
  }
}
