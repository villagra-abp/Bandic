import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';

@Injectable()
export class Miprovider {
  url: url;

  constructor(public http: Http) {
    this.url = new url();
  }

  getTickets() {
          return this.http.get(this.url.getUrl()+"/ticket")
                            .map(response => response.json())  
  }

  getFactura(id) {
          return this.http.get(this.url.getUrl()+"/ticket/factura/"+id)
                            .map(response => response.json())
  }

  getLineasFactura(id) {
          return this.http.get(this.url.getUrl()+"/ticket/lineafactura/"+id)
                            .map(response => response.json())   
  }
}
