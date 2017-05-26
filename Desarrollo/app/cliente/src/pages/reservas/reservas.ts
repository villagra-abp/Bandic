import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReservasService } from '../../providers/reservas';
import { DetalleActividadPage } from '../detalle-actividad/detalle-actividad'
import { ProductoService } from '../../providers/producto'
import { UsuarioService } from '../../providers/usuario'


@Component({
  templateUrl: 'reservas.html',
  providers: [ ReservasService, ProductoService, UsuarioService]
})
export class ReservasPage {
  reservas;
  aux;
  producto;
  items
  usuario
  constructor(public navCtrl: NavController, public navParams: NavParams, public reservaService: ReservasService, 
  public productoService: ProductoService, public usuarioService: UsuarioService) {}
   ionViewDidEnter(){
     this.LoadData();
   }

  ionViewDidLoad() {
  }
  ionViewDidLeave(){
    console.log("este es")
    console.log(this.navCtrl.getPrevious().id);
    if(this.navCtrl.getPrevious().id == "t0-0-0"){
      console.log("entra");
        this.navCtrl.setRoot(this.navCtrl.first());
    }

  }

  private LoadData(){
    this.reservaService.load()
    .subscribe(data => {
        console.log(data);
        this.reservas = data;
        this.aux = this.reservas;
      });
  }

  detalleActividad(item){
    this.producto = null;
    this.productoService.getProducto(item.id)
    .then(producto =>{
      this.producto = producto[0];
      this.navCtrl.push( DetalleActividadPage, { 
      item: this.producto
    });
    })
  }

  getItems(ev) {
    this.aux = this.reservas;
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.aux = this.reservas.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}