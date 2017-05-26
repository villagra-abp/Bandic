import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';
import { UsuarioService } from '../providers/usuario';

@Injectable()
export class TicketService {
data: any;
url: url;
usuario

  constructor(public http: Http, public usuarioService: UsuarioService) {
    this.data = null;
    this.url = new url();
    this.usuarioService.devolverStorage().then(usuario =>{
        this.usuario = usuario;
          this.usuario = JSON.parse(usuario);
        });
  }
load(){
    if(this.data){
      return Promise.resolve(this.data)
    }
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/ticket?usuario=48843243Y')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
  GetTpv2(){
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/tpv')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
  GetTpv(item){
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/tpv?id='+item)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
  GetLineaTicket(item){
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/ticket/detalles//'+item)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }
}