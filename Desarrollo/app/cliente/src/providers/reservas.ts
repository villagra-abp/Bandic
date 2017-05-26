import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';
import { AlertController } from 'ionic-angular';
import { UsuarioService } from '../providers/usuario';


@Injectable()
export class ReservasService {
  
data: any
url: url;
usuario;
fotos=[];

  constructor(public http: Http, public usuarioService: UsuarioService, public alertCtrl: AlertController) {
    this.data = null;
    this.url = new url();
    this.usuarioService.devolverStorage().then(usuario =>{
        this.usuario = usuario;
          this.usuario = JSON.parse(usuario);
          this.load();

        });
   }

     load(){
    console.log("providers");
    console.log(this.usuario);
    return this.http.get(this.url.getUrl()+'/reservas/usuario/48843243Y')
                            .map(response => response.json())
  }
  /*load(usuario){
      return new Promise(resolve => {
        console.log('load')
        console.log(this.usuario);
        
          this.http.get(this.url.getUrl()+'/reservas/usuario/' + usuario)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          
          resolve(this.data);
        });
      
    });
     
  }*/

  /*Reservar(item){
    var enviar = {"usuario":'7380', "producto":''};
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/reservas/usuario/7380')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }*/
  Reservado(item){
    console.log("reservado");
    console.log(this.usuario)
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+"/reservas/usuario/48843243Y?nombre="+item.nombre)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if(data.length != 0){
          resolve(false);
        }
        else{
          resolve(true);
        }
        
      });
    });
  }
  reservar(producto){
    console.log(producto);
    return new Promise(resolve => {
      var datos = {"usuario":"48843243Y","producto":producto.id};
        console.log(datos);
      this.http.put(this.url.getUrl()+"/producto/usuario", datos)
      .subscribe(data => {
        resolve(true);
      });
    
  });
  }
    cancelarReserva(producto){
      console.log("entra en cancelar reserva")
    return new Promise(resolve => {
      this.http.delete(this.url.getUrl()+"/producto/empleado/48843243Y/" + producto.id)
      .subscribe(data => {
        resolve(true);
      });
    
  });
}
}
  /*
  retorePassword(usuario){
    var enviar = {"email":usuario.email};
    console.log("enviar")
    console.log(enviar);
    return new Promise((resolve, reject) => {
    this.http.post(this.url.getUrl()+"/login/password", enviar)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        resolve(data);
      }, error =>{
        reject(error);
      })
    });
  }*/