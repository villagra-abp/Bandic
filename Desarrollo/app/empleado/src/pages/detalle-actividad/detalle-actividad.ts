import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DetalleActividadProvider} from '../../providers/detalle-actividad-provider';
import {AsistentesPage} from '../asistentes/asistentes';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the DetalleActividad page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detalle-actividad',
  templateUrl: 'detalle-actividad.html'
})
export class DetalleActividadPage {
item;
public actividad;
public usuarios;
public numasist;

  constructor(public navCtrl: NavController, public navParams: NavParams, public detalleactividadProvider:DetalleActividadProvider, public alertCtrl: AlertController) {
    this.item = navParams.get('item');
   
    console.log(this.item.id);
this.detalleactividadProvider.getActividad(this.item.id)
                                    .subscribe(
                                       response => {
                                                this.actividad = response;
 
                                                console.log(this.actividad);
                                                if(this.actividad[0].estancia==null){
                                                  this.actividad[0].estancia="No hay estancia asignada";
                                                }
                                                if(this.actividad[0].precio==null || this.actividad[0].precio==0 ){
                                                  this.actividad[0].precio="Gratuita";
                                                }
                                                else{
                                                  this.actividad[0].precio=this.actividad[0].precio + " €";
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

this.detalleactividadProvider.getReservas(this.item.id)
                                    .subscribe(
                                       response => {
                                                this.usuarios = response;
                                                this.numasist=this.usuarios.length;
                                                console.log(this.usuarios);
                                                console.log(this.numasist);
                                               
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );


  }
mostrarUsuarios(){
  if(this.numasist!=0){
    this.navCtrl.push(AsistentesPage, {
      item: this.usuarios
    });
  }
  else{
    this.showAlert();
  }
    
}
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atención',
      subTitle: 'No hay clientes asignados a esta actividad',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleActividadPage');
  }

}
