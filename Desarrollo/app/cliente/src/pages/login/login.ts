import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { UsuarioService } from '../../providers/usuario';
import { TabPage } from '../tab/tab';
import { IngresoPage } from '../ingreso/ingreso';
//import { CambioPasswordPage } from '../cambio-password/cambio-password';
import { RestorePasswordPage } from '../restore-password/restore-password';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ UsuarioService]
})
export class LoginPage {

private formLogin : FormGroup;
  todos: Storage;
  user: any = {};
  usuarios;
  storage;
  alert;
  
  //alert;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl: AlertController,
  public usuarioService: UsuarioService, storage: Storage, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.formLogin = this.formBuilder.group({
      //(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))
      //DNI:['', Validators.compose([ Validators.required, Validators.pattern('')])],
      DNI:['', Validators.required],
      //password: ['' ,Validators.required],
      password: ['', Validators.compose([ Validators.required, Validators.minLength(4),Validators.maxLength(8),Validators.pattern('[0-9]*') ])],
      
    });
     
  }

  doLogin(){
    
    
    
    //hacer el post de login
    this.usuarioService.login(this.formLogin.value)
    .then(usuarios =>{
      console.log(usuarios)
      this.usuarios = usuarios;

      //this.storage.set("usuario", "valor")
      this.navCtrl.setRoot(TabPage);
      
    })
    .catch(this.handleError);
    
  }
  handleError(error) {
    //this.alert.present();
  }

  createAlert(){
    //this.alert.present();
  }

  forgetPass(){
    this.navCtrl.push(RestorePasswordPage)
  }

}




