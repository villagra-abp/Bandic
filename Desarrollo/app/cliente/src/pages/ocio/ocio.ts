import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetalleActividadPage } from '../detalle-actividad/detalle-actividad'
import { ProductoService } from '../../providers/producto'
import { PromocionesService } from '../../providers/promociones';


@Component({
  templateUrl: 'ocio.html',
  providers: [ProductoService, PromocionesService]
})
export class OcioPage {
productos: any;
items;
pag;
promociones;
producto;
htmlStr;
productosTotales

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public productoService: ProductoService, public promocionesService: PromocionesService) {
    this.pag="promociones"
  }

  ionViewDidLoad() {
    //this.LoadData();
    this.LoadPromociones();
  }
  detalleActividad(item){
    console.log(item);
    this.navCtrl.push( DetalleActividadPage, { 
      item: item
    });
  }
  LoadData(){
    console.log("entra")
    this.productoService.load()
    .then(productos =>{
      console.log(productos);
      this.productosTotales = productos;
      this.items = this.productosTotales
      console.log(this.items);
    })
  }
  LoadPromociones(){
    this.promocionesService.load()
      .then(promociones =>{
        this.promociones = promociones;
        for(let i = 0; i <this.promociones.length; i++){
          this.getImagen(promociones[i].producto, i);
        }
        this.promociones = promociones;
        this.producto = promociones;
        this.htmlStr= promociones[0];
      })
  }

  getImagen(item, i){
    this.productoService.getProducto(item)
    .then(producto =>{
      this.promociones[i].imagen = producto[0].imagen;
    });
  }
  
  getItems(ev) {
    this.items = this.productosTotales;
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.productosTotales.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  private GetProducto(item){
    this.productoService.getProducto(item)
    .then(producto =>{
      this.navCtrl.push( DetalleActividadPage, { 
        item: producto[0]
      });
    });
  }

}
