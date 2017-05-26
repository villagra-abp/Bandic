import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import { ReservasService } from'../../providers/reservas';
import { ProductoService } from '../../providers/producto';

import { CsvPage } from '../csv/csv';

@Component({
  selector: 'page-detalle-actividad',
  templateUrl: 'detalle-actividad.html',
  providers: [ ReservasService, ProductoService]
})
export class DetalleActividadPage {
item: any[];
reservado;
reserva;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reservasService: ReservasService,
  public productoService: ProductoService, public alertCtrl: AlertController) {
    this.item = navParams.get('item');
      

  }
  ionViewDidLoad(){
    this.reservasService.Reservado(this.item)
      .then(
        response => {
          this.reservado = response;
                console.log(this.reservado)
          
        },
        error => {
        }
      )
  }
  ionViewDidLeave(){
    this.navCtrl.setRoot(this.navCtrl.first());
  }
  ionViewWillEnter(navParams: NavParams){
    this.item = navParams.get('item');
  }
  reservar(item){
    this.reservasService.reservar(item)
    .then(reserva => {
      if(reserva == true){
        let alert = this.alertCtrl.create({
                title: 'Reserva',
                subTitle: 'La reserva se ha realizado con éxito',
                buttons: ['Aceptar']
        });
        alert.present( )
        this.navCtrl.setRoot(this.navCtrl.getPrevious());
      }
      else {
        let alert = this.alertCtrl.create({
                title: 'Reserva',
                subTitle: 'La reserva no se ha realizado con éxito',
                buttons: ['Aceptar']
        });
        alert.present( )
      }

    }) 
    }
    cancelaReserva(item){
      this.reservasService.cancelarReserva(item)
    .then(reserva => {
      if(reserva == true){
        let alert = this.alertCtrl.create({
                title: 'Reserva',
                subTitle: 'La reserva se ha cancelado con éxito',
                buttons: ['Aceptar']
        });
        alert.present( )
        this.navCtrl.setRoot(this.navCtrl.getPrevious());
      }
      else {
        let alert = this.alertCtrl.create({
                title: 'Reserva',
                subTitle: 'La reserva no se ha cancelado contacte con el encargado',
                buttons: ['Aceptar']
        });
        alert.present( )
      }

    }) 
    }
    //comprobar que le usuario no tiene ya esta actividad reservada
    /*if(true){
      if(item.precio == 0){
        console.log("esta actividad es gratuita");
      }
      else{
        //comprobar que el usuario tiene saldo para poder pagarla
        //hay que mirar el saldo en la memoria local a ver si tiene
        if(item.precio == 20){
          //llamar a la api para reservar la actividad
          console.log("Tiene saldo suficiente");
        }
      }
    }
    else{
      //mensaje de que la tiene reservada
    }
    //mirar primero tipo de actividad, 
    //mirar el precio de la actividad,

  }*/
   whatsappShare(){
    SocialSharing.shareViaWhatsApp("El otro día me di un masaje que flipas", "http://www.dateunmasaje.es/mediapool/119/1193578/resources/21646288.jpg", null /* url */)
      .then(()=>{
        alert("Se publicó con exito");
      },
      ()=>{
         alert("No se ha podido publicar")
      })
  }
 
  twitterShare(item){
    SocialSharing.shareViaTwitter(item.tweet,"http://www.dateunmasaje.es/mediapool/119/1193578/resources/21646288.jpg",null)
    .then(()=>{
        
      },
      ()=>{
        
      })
  }
  instagramShare(){
    SocialSharing.shareViaInstagram("Message via Instagram","http://www.dateunmasaje.es/mediapool/119/1193578/resources/21646288.jpg")
    .then(()=>{
        alert("Se publicó con exito");
      },
      ()=>{
         alert("No se ha podido publicar")
      })
  }
 
  facebookShare(item){
    this.productoService.publicarFb(2)
    .then (producto =>{
      console.log(producto);
      //static shareViaFacebook(message: string, image?: string, url?: string): Promise<any>;
      SocialSharing.shareViaFacebook("Message via Twitter",null ,"http://84.120.88.184:15237/rest/fb/barcelo/2")
    });
    console.log("facebook");
    console.log(item);
    /*SocialSharing.shareViaFacebookWithPasteMessageHint("Message via Twitter","http://www.dateunmasaje.es/mediapool/119/1193578/resources/21646288.jpg" ,"una url que flipas", "Un masaje que flipas con keyband")
    /*.then(()=>{
        
      },
      ()=>{
         
      })*/
  }
 
  otherShare(){
    SocialSharing.share("Genral Share Sheet",null/*Subject*/,null/*File*/,"http://pointdeveloper.com")
    .then(()=>{
        alert("Se publicó con exito");
      },
      ()=>{
         alert("No se ha podido publicar")
      })
 
  }
}

