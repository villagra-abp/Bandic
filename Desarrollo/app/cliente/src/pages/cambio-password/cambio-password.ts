import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario';
import { LoginPage } from '../login/login';
import { RestorePasswordPage } from '../restore-password/restore-password';
import { PerfilPage } from '../perfil/perfil'

@Component({
  selector: 'page-cambio-password',
  templateUrl: 'cambio-password.html',
  providers: [ UsuarioService]
})
export class CambioPasswordPage {
  private formCambioPass : FormGroup;
  user: any = {};
  data;
  alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioService: UsuarioService, 
  private formBuilder: FormBuilder, public alerCtrl: AlertController) {
    this.formCambioPass = this.formBuilder.group({
      //(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))
      //DNI:['', Validators.compose([ Validators.required, Validators.pattern('')])],
      //password: ['' ,Validators.required],
      //email: ['', Validators.compose([ Validators.required,Validators.pattern('[0-9]*') ])],
      passwordActual: ['', Validators.compose([ Validators.required,Validators.minLength(4) ])],
      passwordNueva: ['', Validators.compose([ Validators.required,Validators.minLength(4) ])],
      passwordNueva2: ['', Validators.compose([ Validators.required,Validators.minLength(4) ])],
      
      
    });
  }
  close(){
    this.navCtrl.setRoot(PerfilPage);
  }
  cambioPass(){
    this.alert = this.alerCtrl.create({
      title: 'Error al cambiar la contraseña',
      //subTitle: 'Email incorrecto',
      buttons: ['Aceptar']
    });
    console.log(this.formCambioPass.value.email)
    this.usuarioService.retorePassword(this.formCambioPass.value.email)
    .then(data =>{
      console.log(data)
      this.data = data;
      console.log(this.data);
      if(this.data.message == 'Correo enviado correctamente'){
        console.log("entra en correo enviado")
        this.navCtrl.push(LoginPage);
      }
      else{
        this.alert.present();      }
      
    })
    .catch(this.handleError);
  }
  handleError(error) {
  }

  cancelar(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
  }
  forgetPass(){
    this.navCtrl.push(RestorePasswordPage)
  }
}
