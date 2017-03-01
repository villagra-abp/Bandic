import { Component, OnInit, NgModule } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ProductoComponent } from '../producto.component'
import { FormBuilder, Validators } from '@angular/forms';

@NgModule({
  declarations: [ProductoComponent]
})

@Component({
  selector: 'app-buscador-producto',
  templateUrl: './buscador-producto.component.html',
  styleUrls: ['./buscador-producto.component.css'],
  providers:[ProductoService, FormBuilder, Validators]
})

export class BuscadorProductoComponent implements OnInit {

  public selectedNombre;
  public selectedId;
  public selectedCategoria;
  public selectedEmpleado;
  public selectedReservable = false;
  public productos;
  public aux = [];
  public productos_reservables;
  public categorias;

  constructor(private productoService: ProductoService) {
    this.productos_reservables = [];
    this.productoService.getCategorias()
        .subscribe(
            response => {
                console.log(response);
                this.categorias = response;
            },
            error => {

            }
        ),
        
    this.productoService.getProductos()
         .subscribe(
            response => {
                this.productos = response;
                ProductoComponent.prototype.setProductos(this.productos);              
                this.productos.filter(element => {          
                    this.productoService.getEmpleado(element.id)
                      .subscribe(
                        response => {    
                        },
                        error => {
                        }
                    );
                });         
                this.getReservables(this.productos);
            },
            error => {
              console.log(error)
                alert("Error en la petición");
            }
         );
  }

getReservables(productos) {
  this.productos.filter(element => {          
      this.productoService.getComestible(element.categoria_producto)
        .subscribe(
          response => {
            ProductoComponent.prototype.setReservable(response);             
            if(response[0].comestible == "f") {
              element.Reservable = "Si";
            }
            else {
              element.Reservable = "No";
            }
          },               
          error => {
            console.log(error);
          }
      );
  });
}

crearProducto(event, id) {
    console.log(event);
    console.log(id); //saca el id bueno
}

onChange(event, id, nombre, categoria, empleado, reservable) {
      this.selectedId = id;
      this.selectedNombre = nombre;
      this.selectedCategoria = categoria;
      this.selectedEmpleado = empleado;
      this.selectedReservable = reservable;

    this.productoService.filterProductos(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedEmpleado, this.selectedReservable)
        .subscribe(
          response => {
            this.productos = response;        
            console.log(this.productos);
            ProductoComponent.prototype.setProductos(this.productos);
            this.getReservables(this.productos);
          },               
        error => {
            console.log(error);
        }
    );
}


  ngOnInit() {
  }

}
