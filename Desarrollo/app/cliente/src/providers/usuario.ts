import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../app/url';
import { Storage } from '@ionic/storage';
import { AlertController} from 'ionic-angular';

@Injectable()
export class UsuarioService {
storage:Storage;
data: any
url: url;
alert;
usuario;

  constructor(public http: Http, public alerCtrl: AlertController) {
    this.data = null;
    this.url = new url();
    this.storage = new Storage();

    this.devolverStorage().then(usuario =>{
        this.usuario = usuario;
          this.usuario = JSON.parse(usuario);
        });
   }

    /*this.devolverStorage()
    console.log()
    this.usuario = this.devolverStorage();
    console.log("entra")
    console.log(this.usuario);
    /*.then(usuario =>{
      this.usuario = usuario.dni;
    });*/
  load(){
    if(this.data){
      return Promise.resolve(this.data)
    }
    return new Promise(resolve => {
      this.http.get(this.url.getUrl()+'/usuario/48843243Y')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
        console.log(resolve(this.data));
      });
    });
  }
  login(usuario){
    this.alert = this.alerCtrl.create({
          title: 'Error al hacer login',
          subTitle: 'Contraseña o usuario incorrectos',
          buttons: ['Aceptar']
          
        });
    var enviar = {"dni":usuario.DNI,"password":usuario.password};
    console.log("enviar")
    console.log(enviar);
    return new Promise((resolve, reject) => {
    this.http.post(this.url.getUrl()+"/login", enviar)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        resolve(data);
        console.log("Esto es lo que guardo en el storage");
        console.log(data);
        this.storage.set("usuario", JSON.stringify(data));
      }, error =>{
        this.alert.present()
        reject(error);
      })
    });
  }
  retorePassword(usuario){
    var enviar = {"email":usuario};
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
  }
  cambioPassword(password){
    var enviar = {};
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
  }
  setStorage(red, data){
    //console.log("preubaStorage");
    this.storage.set(red, JSON.stringify(data))
  }
  datos;
  devolverStorageJson(){

    this.storage.get("usuario").then((profile) => {
     var val = JSON.parse(profile);
     console.log("storage")
    console.log(val);
    return val;
    });
  }
  devolverStorage(){
    return this.storage.get("usuario");
  }
  removeStorage(borrar){
    this.storage.remove(borrar);
  }
}

