import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { BuscadorProductoComponent } from './buscador-producto/buscador-producto.component';

@NgModule({
  declarations: [
    BuscadorProductoComponent
  ]
})

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers:[ProductoService]
})

export class ProductoComponent implements OnInit {
  public productos;
  public nombre_producto = BuscadorProductoComponent.prototype.selectedNombre;
  public reservable;

  constructor(private productoService: ProductoService) {

  }

  setProductos(response) {
    this.productos = response;
  }

  setReservable(response) {
    this.reservable = response;
  } 

  ngOnInit() {
  }

}
