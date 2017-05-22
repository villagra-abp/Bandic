import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { EstanciaService } from '../../estancia/services/estancia.service';
import { FileUploadService } from '../services/fileupload.service';
import { ProductoComponent } from '../producto.component'
import { FormBuilder, Validators } from '@angular/forms';
import { Headers, RequestOptions, Http } from '@angular/http';


@NgModule({
  declarations: [ProductoComponent]
})

@Component({
  selector: 'app-buscador-producto',
  templateUrl: './buscador-producto.component.html',
  styleUrls: ['./buscador-producto.component.css'],
  providers:[FileUploadService, ProductoService, EstanciaService, FormBuilder, Validators]
})

export class BuscadorProductoComponent implements OnInit {

  public selectedNombre;
  public selectedId;
  public selectedCategoria;
  public selectedEmpleado;
  public selectedReservable = false;
  public idProducto;
  public productos;
  public aux = [];
  public productos_reservables;
  public categorias;
  public fileEvent;
  public fileEventRRSS;
  public uploadProgress;
  public messageError;
  public fileType;
  public fileTypeRRSS;
  public init_page;
  public pages;
  public rows;
  public reservable;
  public init_row;
  public campo;
  public empleados;

  constructor(public estanciaService: EstanciaService, public productoService: ProductoService, public fileuploadService: FileUploadService) {
    
    this.productos_reservables = [];
    this.productoService.getEmpleados()
        .subscribe(
            response => {
                this.empleados = response;
            },
            error => {

            }
        );
    this.productoService.getCategorias()
        .subscribe(
            response => {
                this.categorias = response;
            },
            error => {

            }
        );

    this.productoService.getProductos() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
        .subscribe(
            response => {
                if(this.init_row == undefined)
                  this.init_row = 0;
                this.setRows(response.length);
                this.setPages(this.productos);
                this.filterProductos(undefined, undefined, undefined, undefined, 0);
                ProductoComponent.prototype.setFilters(undefined, undefined, undefined, undefined, 0);
            },
            error => {

            }
        );
  }

getProductos() { //Se llama para recargar los productos cuando se crea uno nuevo
  this.productoService.getProductos() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
        .subscribe(
            response => {
                if(this.init_row == undefined)
                  this.init_row = 0;
                this.setRows(response.length);
                this.setPages(this.productos);
                this.filterProductos(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, 0);
                ProductoComponent.prototype.setFilters(undefined, undefined, undefined, undefined, 0);
            },
            error => {

            }
        );
}

getCategorias() {
      this.productoService.getCategorias()
        .subscribe(
            response => {
                this.categorias = response;
            },
            error => {

            }
        );
}

estanciaValida(estancia) {
  /*this.estanciaService.getEstancia(estancia)
    .subscribe(
      response => {
        console.log(response);
        if(response.length == 0) {
          console.log("no existe joder");
          document.getElementById("estancia").style.borderColor = "red";
          document.getElementById("confirmar").setAttribute("disabled", "disabled");
        }
        if(response.length > 0) {
          console.log("existeeee");
          document.getElementById("estancia").style.borderColor = "#73879C";
          document.getElementById("confirmar").removeAttribute("disabled");
        }
      },
      error => {

      }
    )*/
}

filterProductos(id, nombre, categoria, reservable, initrow) { //Solo se llama desde el constructor, resultado por defecto de todos los productos
  this.productoService.filterProductos(id, nombre, categoria, reservable, initrow, true, this.campo)
         .subscribe(
            response => {
                this.productos = response;
                ProductoComponent.prototype.setProductos(this.productos);
                this.productos.filter(element => {          
                    this.productoService.getEmpleado(element.id)
                      .subscribe(
                        response => { 
                          //console.log(response);   
                        },
                        error => {
                          //console.log(error._body); 
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
  productos.filter(element => {
      this.productoService.getComestible(element.categoria_producto)
        .subscribe(
          response => {        
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

crearProducto(event, id, nombre, descripcion, categoria2, precio, iva, tweet, cantidad, estancia, imagen, imagenRRSS, empleado) {
    let empleado_id = empleado.split(",");
    console.log(empleado_id);
    let filename = imagen.replace(/^.*\\/, "");
		let filenameRRSS = imagenRRSS.replace(/^.*\\/, "");
    this.idProducto = id;
    this.productoService.crearProducto(id, nombre, descripcion, categoria2, precio, iva, tweet, cantidad, estancia, filename, filenameRRSS)
        .subscribe(
          response => {
            console.log(response);
            if(this.fileEvent != undefined && this.fileType != undefined)
                this.uploadFile(this.fileEvent, this.idProducto, this.fileType);
            if(this.fileEventRRSS != undefined && this.fileTypeRRSS != undefined)
                this.uploadFile(this.fileEventRRSS, this.idProducto, this.fileTypeRRSS);
              this.filterProductos(undefined, undefined, undefined, undefined, 0);
              this.asignarProducto(id, empleado_id[0]);
              this.getProductos();
          },
          error => {
             console.log(error);
          }
        )
}

crearCategoria(id, comestible) {
  this.productoService.crearCategoria(id, comestible)
    .subscribe(
      response => {
        console.log(response);
        this.getCategorias();
      },
      error => {
        console.log(error);
      }
    )
}

asignarProducto(id, empleado) {
  this.productoService.asignarProducto(empleado, id)
     .subscribe(
       response => {
         console.log(response);
       },
       error => {
         console.log(error);
       }
     )
}

onChange(event, id, nombre, categoria, reservable, orden) { //cuando se pulsa en buscar
      if(orden != "Ordenar por:") this.campo = orden; 
      this.selectedId = id;
      this.selectedNombre = nombre;
      this.selectedCategoria = categoria;
      this.selectedReservable = reservable;
      if(this.init_row == undefined)
        this.init_row = 0;
    
      while(this.init_page>1) {
        this.init_page--;
        this.init_row = this.init_row-5;
      }

    this.productoService.filterProductos(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, this.init_row, false, this.campo)
        .subscribe(
          response => {
            this.productos = response;        
            this.setRows(this.productos.length);
            if(this.productos.length > 5) { //hace falta paginacion, volver a filtrar
              let paginar = true;
              this.productoService.filterProductos(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, this.init_row, paginar, this.campo)
              .subscribe(
                response => {
                  ProductoComponent.prototype.setProductos(response);
                  ProductoComponent.prototype.setFilters(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, this.init_row);
                  this.setPages(this.productos);
                  this.getReservables(response);
                }
              );
            }
            else { //no hace falta paginacion
              ProductoComponent.prototype.setProductos(this.productos);
              ProductoComponent.prototype.setFilters(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, this.init_row);
              this.setPages(this.productos);
              this.getReservables(this.productos);
            }
          },               
        error => {
            console.log(error);
        }
    );
}

setRows(rows) {
  this.rows = rows;
  console.log(this.rows);
}

setPages(productos) {
    this.init_page = 1;
    this.pages = Math.ceil((parseInt(this.rows)/5));
    console.log(this.pages);
    if(this.pages == 0) {
      this.pages = 1;
    }
  }

  setReservable(response) {
    this.reservable = response;
  }

  nextPage() {
    if(this.init_page<this.pages) {
      this.init_page++;
      this.init_row = this.init_row+5;
    }
    this.productoService.filterProductos(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, this.init_row, true, this.campo)
      .subscribe(
          response => {
            this.productos = response;
            ProductoComponent.prototype.setProductos(this.productos);
            this.getReservables(this.productos);
          },               
        error => {
            console.log(error);
        }
    );
  }

  lastPage() {
    if(this.init_page>1) {
      this.init_page--;
      this.init_row = this.init_row-5;
    }
    this.productoService.filterProductos(this.selectedId, this.selectedNombre, this.selectedCategoria, this.selectedReservable, this.init_row, true, this.campo)
      .subscribe(
          response => {
            this.productos = response;
            ProductoComponent.prototype.setProductos(this.productos);
            this.getReservables(this.productos);
          },               
        error => {
            console.log(error);
        }
    );
  }

//*******************SUBIR LA FOTO******************* */
fileChange(event, type) {
  if(type == 's') {
    this.fileEventRRSS = event;
    this.fileTypeRRSS = type;
  }
  else if(type == 'n'){
    this.fileEvent = event;
    this.fileType = type;
  }
}

uploadFile(event, id, type): Promise<any> {
 let result: any;
 let method = "put";
    this.fileuploadService.getObserver()
        .subscribe(progress => {
            this.uploadProgress = progress;
        });

    try {
        result = this.fileuploadService.upload(id, type, event.target.files, method);
        console.log(result);
        if(result != "OK") {
          if(result == "formatError") 
            this.messageError = "Formato incorrecto. Sólo son aptos jpg, jpeg o png.";
          if(result == "sizeError")
            this.messageError = "El tamaño de la imagen no puede exceder los 2MB";
        }
    } catch (error) {
        document.write(error)
    }

    if (!result['images']) {
        return;
    }
}


  ngOnInit() {
  }

}
