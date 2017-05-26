import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NFC, Ndef} from 'ionic-native';
import { AlertController } from 'ionic-angular';
import {AsistentesProvider} from '../../providers/asistentes-provider';
/*
  Generated class for the Asistentes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-asistentes',
  templateUrl: 'asistentes.html'
})
export class AsistentesPage {
public usuarios;
public tics = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private asistentesProvider: AsistentesProvider) {
    this.usuarios = navParams.get('item');
    console.log(this.usuarios.ciudad);
    for(let i=0; i<this.usuarios.length; i++){
      if(this.usuarios[0].ciudad!="dentro")
      this.usuarios[0].ciudad="";
    }
    
  }
  /*
comprobarPulsera(id):boolean{

this.asistentesProvider.getPulsera(id)
                                    .subscribe(
                                       response => {
                                        
                                           for(let i=0; i<this.usuarios.length; i++){
                                             console.log(this.usuarios[i].dni)
                                             if(response[0].usuario == this.usuarios[i].dni){
                                                this.usuarios[i].ciudad="dentro";
                                                console.log(this.usuarios[i].ciudad);
                                                let alert = this.alertCtrl.create({
                                                    title: 'Pulsera',
                                                    subTitle: 'lectura correcta',
                                                    buttons: ['Aceptar']
                                                  });
                                              alert.present();
                                              for(let i=0;i<this.usuarios.length;i++){
                                                this.usuarios.push();
                                              }
                                             /*   this.navCtrl.setRoot(AsistentesPage, {
                                                item: this.usuarios
                                              });
                                                
                                             }
                                              
                                            }
                                                let alert = this.alertCtrl.create({
                                                    title: 'Pulsera',
                                                    subTitle: 'este usuario no esta registrado en esta actividad',
                                                    buttons: ['Aceptar']
                                                  });
                                           
                                             alert.present();
                                                this.navCtrl.setRoot(AsistentesPage, {
                                                item: this.usuarios
                                              });
                                           
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );
                                    return false;
}
*/
  addListenNFC() {
    NFC.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
        if (data && data.tag && data.tag.id) {
            let tagId = NFC.bytesToHexString(data.tag.id);
            //console.log(tagId);
            if (tagId) {

this.asistentesProvider.getPulsera(tagId)
                                    .subscribe(
                                       response => {
                                        
                                           for(let i=0; i<this.usuarios.length; i++){
                                             console.log(this.usuarios[i].dni)
                                             if(response[0].usuario == this.usuarios[i].dni){
                                                this.usuarios[i].ciudad="dentro";
                                                console.log(this.usuarios[i].ciudad);
                                                NFC.stopHandover();
                                                let alert = this.alertCtrl.create({
                                                    title: 'Pulsera',
                                                    subTitle: 'lectura correcta',
                                                    buttons: ['Aceptar']
                                                  });
                                              alert.present();
                                           for(let i=0;i<this.usuarios.length;i++){
                                                this.usuarios.push();
                                              }
                                             /*   this.navCtrl.setRoot(AsistentesPage, {
                                                item: this.usuarios
                                              });
                                                */
                                             }
                                              
                                            }
                                           
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );
              /*if(this.comprobarPulsera(tagId)==true){
                console.log("ya leida tt");
             this.navCtrl.setRoot(AsistentesPage);

              }else{
              
              
              }
                */
            

            } else {
               alert("error");
            }
        }
    });
}

sesReadNFC(data): void {
   let alert = this.alertCtrl.create({
                  title: 'Esperando a leer',
                  
                  buttons: ['Aceptar']
                });
             alert.present();
  console.log("leyendo");
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AsistentesPage');
  }

}
