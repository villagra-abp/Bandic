import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PromocionesService } from '../../providers/promociones'
import { DetalleActividadPage } from '../detalle-actividad/detalle-actividad'
import { ProductoService } from '../../providers/producto'
import { PerfilPage } from '../perfil/perfil';
import { ReservasPage } from '../reservas/reservas';
import { OcioPage } from '../ocio/ocio';
import { TabPage } from '../tab/tan';

@Component({
  templateUrl: 'promociones.html',
  providers: [ PromocionesService, ProductoService ]
})

export class PromocionesPage {
  html;
  htmlStr;
  promociones;
  producto;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public promocionesService: PromocionesService, public productoService: ProductoService) {
    this.LoadData();
  }

  ionViewDidLoad() {
    this.LoadData();
  }
  private LoadData(){
    this.promocionesService.load()
    .then(promociones =>{
      this.promociones = promociones;
      for(let i = 0; i <this.promociones.length; i++){
        this.getImagen(promociones[i].producto, i);
      }
      //this.promociones = promociones;
      this.producto = promociones;
      this.htmlStr= promociones[0];
    })
  }
  detalleActividad(item){
    this.navCtrl.push( DetalleActividadPage, { 
      item: item
    });
  }
  getImagen(item, i){
    this.productoService.getProducto(item)
    .then(producto =>{
      this.promociones[i].imagen = producto[0].imagen;
    });
  }
  private GetProducto(item){
    this.productoService.getProducto(item)
    .then(producto =>{
      this.navCtrl.push( DetalleActividadPage, { 
        item: producto[0]
      });
    });
  }
  goGasto(){
    this.navCtrl.push(PerfilPage,{
      pag : "promociones"
    })

  }
  goReservas(){
    this.navCtrl.push(ReservasPage);
  }
  goParis(item){
    this.navCtrl.push(DetalleActividadPage, { 
        item: item
      });
  }
  goProductos(){
    this.navCtrl.push(OcioPage);
  }
} 
