import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'restore-password.html',
  providers: [ UsuarioService]
})
export class RestorePasswordPage {
  private formRestorePass : FormGroup;
  user: any = {};
  data;
  alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioService: UsuarioService, 
  private formBuilder: FormBuilder, public alerCtrl: AlertController) {
    this.formRestorePass = this.formBuilder.group({
      //(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))
      //DNI:['', Validators.compose([ Validators.required, Validators.pattern('')])],
      //password: ['' ,Validators.required],
      //email: ['', Validators.compose([ Validators.required,Validators.pattern('[0-9]*') ])],
      email: ['', Validators.compose([ Validators.required,Validators.minLength(4) ])],
      
      
    });
  }
  RestorePass(){
    this.alert = this.alerCtrl.create({
      title: 'Error al restaurar la contraseña',
      subTitle: 'Email incorrecto',
      buttons: ['Aceptar']
    });
    console.log(this.formRestorePass.value.email)
    this.usuarioService.retorePassword(this.formRestorePass.value.email)
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
    this.navCtrl.push(this.navCtrl.getPrevious());
    ;
  }

  ionViewDidLoad() {
  }
}
