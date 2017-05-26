import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GastosPage } from '../gastos/gastos';
import { AjustesPage } from '../ajustes/ajustes';
import { IngresoPage } from '../ingreso/ingreso';
import { ConsumoPage } from '../consumo/consumo';
import { CambioPasswordPage } from '../cambio-password/cambio-password';
import { LoginPage } from '../login/login';
import { PromocionesPage } from '../promociones/promociones';

import { UsuarioService } from '../../providers/usuario';
import { TicketService } from '../../providers/ticket';

import { Facebook, NativeStorage } from 'ionic-native';
import * as pdfmake from '../../../node_modules/pdfmake/build/pdfmake';
import * as pdfFonts from '../../../node_modules/pdfmake/build/vfs_fonts';



@Component({
  templateUrl: 'perfil.html',
  providers: [ UsuarioService, TicketService]
})
export class PerfilPage {
FB_APP_ID: number = 1243391482365445;
usuarios;
twitter: false;
facebook: false;
imagen;
editar: any[] = [
  {
      name: '',
      year: 1995
    }
]
user;
todo = {};
tickets
pag;
aux;
ticket;
total;
lineaticket;
tpv;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public usuarioService: UsuarioService, public ticketService: TicketService) {
    //Facebook.browserInit(this.FB_APP_ID, "v2.8");
    //this.imagen='https://graph.facebook.com/1905551363014890/picture?type=large';
    this.imagen='img/usuario.png'
    if (navParams.get('pag') == "promociones"){
          this.pag="gastos"
    }
    else { this.pag="cuenta" }

    
  }

  public testPdf() {
            
    var dd = { content: 'This is an sample PDF printed with pdfMake' };
    pdfmake.createPdf(dd).download();
    //pdfkite.createPdf(dd).download();
  }
  ionViewDidLeave(){
    console.log("este es")
    console.log(this.navCtrl.getPrevious().id);
    if(this.navCtrl.getPrevious().id == "t0-0-0"){
      console.log("entra");
        this.navCtrl.setRoot(this.navCtrl.first());
    }

  }
  ionViewDidLoad() {
    this.formarTicket();
    this.LoadData();
  }
  formarTicket(){
    this.getTpv();
    this.total = []
    this.ticketService.load()
    .then(data =>{
      if(this.tickets == null){
        this.tickets = data;
        for(let i = 0; i <this.tickets.length; i++){
          this.tickets[i].total = 0;
          this.ticketService.GetLineaTicket(i)
          .then(ticket =>{
            this.lineaticket = ticket;
            for(let j = 0; j<this.lineaticket.length; j++){
              this.tickets[i-1].total = this.tickets[i-1].total + (this.lineaticket[j].precio * this.lineaticket[j].cantidad);
            }
          });
          this.tickets[i].tpvNombre = this.asignarNombre(this.tickets[i].tpv)
          }
      }
    })
  }
  asignarNombre(tpv){
    for(var i = 0; i < this.tpv.length ; i++){
      if(this.tpv[i].id == tpv)
        return this.tpv[i].nombre
    }
  }
  getTpv(){
     this.ticketService.GetTpv2()
    .then(tpv =>{
      this.tpv = tpv;
    });
  }
  detalleTicket(item){
    this.navCtrl.push( ConsumoPage, { 
      item: item
    });
  }
  cerrarSesion(){
    this.usuarioService.removeStorage('usuario');
    //this.navCtrl.pop(TabPage);
    this.navCtrl.setRoot(LoginPage);
    //this.navCtrl.popTo(LoginPage);
  }
  cambioPassword(){
    this.navCtrl.push(CambioPasswordPage);
  }

  settings(){
    this.navCtrl.push( AjustesPage );
  }
  /*private LoadData(){
    this.usuarioService.devolverStorage()
    .then(usuarios =>{
      console.log("load data");
      console.log(JSON.parse(usuarios));
      this.usuarios = JSON.parse(usuarios);
      console.log(this.usuarios);
    })
  }*/
  private LoadData(){
    this.usuarioService.load()
    .then(usuarios =>{
      this.usuarios = usuarios
    })
  }
  

  ingreso(){
    this.navCtrl.push( IngresoPage );
  }

  /*vincularFacebook(){
    let permissions = new Array();
    let nav = this.navCtrl;
    permissions = ["public_profile"];

     Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();
      var accessToken = response.authResponse.accessToken;
      console.log("token" +accessToken);

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        this.imagen = user.picture;
        console.log("el usuario bueno");
        console.log(user);
        /*NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          console.log(accessToken);
        })*/
     /* })
    }, function(error){
      console.log(error);
    });
  }
  doFbLogin(){
    let permissions = new Array();
    let permissions1 = new Array();
    let token = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];
    permissions1 = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();
      var accessToken = response.authResponse.accessToken;
      console.log("token" +accessToken);
      console.log("VAMOS joder")
      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        
        //now we have the users info, let's save it in the NativeStorage
        console.log("este es el usuario");
        console.log(user);
        this.usuarioService.setStorage("facebook", user)
        //this.imagen = 'https://graph.facebook.com/1905551363014890/picture?type=large';
        /*NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          //nav.push(PerfilPage);
          console.log(accessToken);

          //Facebook.api("https://graph.facebook.com/1905551363014890/feed?message=Prueba&access_token="+accessToken, permissions1)
          let mensaje="mierda"
          /*Facebook.api("/1905551363014890/feed?message="+mensaje+"&access_token="+accessToken, permissions1)

          
            .then(function(response){
              console.log(response);
              console.log("se supone que lo hace")
            });
        }, function (error) {
          console.log(error);
        })*/
      /*})
    }, function(error){
      console.log(error);
    });
  }*/

  vincularTwitter(){

  }
  storageDelete(){
    this.usuarioService.removeStorage('usuario')
  }
}
