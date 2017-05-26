import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { CondicionesPage } from '../condiciones/condiciones';
import { PrivacidadPage } from '../privacidad/privacidad';
import { CambioPasswordPage } from '../cambio-password/cambio-password';
import { CerrarSesionPage } from '../cerrar-sesion/cerrar-sesion';
import { UsuarioService } from '../../providers/usuario';
import { LoginPage } from '../login/login';
import { TabPage } from '../tab/tab';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
  providers: [ UsuarioService]
})
export class AjustesPage {
  FB_APP_ID: number = 1243391482365445;
  pag;

  constructor(public navCtrl: NavController, public usuarioService: UsuarioService ) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
    this.pag="servicio";
  }
    ionViewDidLeave(){
    this.navCtrl.setRoot(this.navCtrl.first());
  }

  goCondiciones(){
    this.navCtrl.push(CondicionesPage);
  }
  goPrivacidad(){
    this.navCtrl.push(PrivacidadPage);
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

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        console.log(user);
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
      })
    }, function(error){
      console.log(error);
    });
  }
}

