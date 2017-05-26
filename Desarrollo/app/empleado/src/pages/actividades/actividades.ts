import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ActividadesProvider} from '../../providers/actividades-provider';
import { DetalleActividadPage} from '../detalle-actividad/detalle-actividad';
import {DetalleActividadProvider} from '../../providers/detalle-actividad-provider';
import {NFC} from 'ionic-native';
import { AlertController } from 'ionic-angular';
import {AsistentesPage} from '../asistentes/asistentes';
import {HomePage} from '../home/home';
/*
  Generated class for the Actividades page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-actividades',
  templateUrl: 'actividades.html'
})
export class ActividadesPage {
public actividades;
public actividad =[];
public usuarios;
public numasist =[];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams, private actividadesProvider: ActividadesProvider, private detalleactividadProvider: DetalleActividadProvider) {

    
  }
  home(){
     this.navCtrl.push(HomePage);
  }
  mostrarUsuarios(num, id_act){
  if(num!=0){
    this.navCtrl.push(AsistentesPage, {
      item:id_act
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
  addListenNFC() {
    NFC.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
        if (data && data.tag && data.tag.id) {
            let tagId = NFC.bytesToHexString(data.tag.id);
            if (tagId) {
                alert("leido" + tagId);
                
            } else {
               alert("error");
            }
        }
    });
}

sesReadNFC(data): void {
    alert("no se que es esto");
}



detalleActividad(item){
  this.navCtrl.push(DetalleActividadPage, {
    item: item
  });
}
  

  ionViewDidLoad() {
         this.actividadesProvider.getActividades()
                                    .subscribe(
                                       response => {
                                                this.actividades = response;
                                                
                                                console.log(this.actividades);
                                                for(let i=0; i<this.actividades.length;i++){
                                                              console.log(this.actividades[i].id);
                                                             this.detalleactividadProvider.getActividad(this.actividades[i].id)
                                                            .subscribe(
                                                              response => {
                                                                console.log(response);
                                                                        this.actividad[i] = response[0];
                                                                        
                                                                        console.log(this.actividad[i]); 
                                                                        if(this.actividad[i].estancia==null){
                                                                          this.actividad[i].estancia="No hay estancia asignada";
                                                                        }
                                                                        if(this.actividad[i].precio==null || this.actividad[i].precio==0 ){
                                                                          this.actividad[i].precio="Gratuita";
                                                                        }
                                                                        else{
                                                                          this.actividad[i].precio=this.actividad[i].precio + " €";
                                                                        }
                                                                        this.buscarreservas(this.actividades[i].id, i);
                                                                    
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
                                                if(this.actividades.length==0){
                                                  document.getElementById("sinactividades").innerHTML="<p>No tienes actividades asignadas</p>";
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
  }
buscarreservas(id, i){

                   this.detalleactividadProvider.getReservas(id)
                                                      .subscribe(
                                                        response => {
                                                                  this.usuarios = response;
                                                                  this.actividad[i].iva=this.usuarios.length;
                                                                
                                                                
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
}
