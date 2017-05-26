import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { url } from '../app/url';

@Injectable()
export class AsistentesProvider {
	url: url;
  constructor(public http: Http) {
  	this.url = new url();
  
  }
getPulsera(id){
  
  return this.http.get(this.url.getUrl()+"/pulsera?id="+id)
                            .map(response => response.json())
}
}
