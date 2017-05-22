import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { FileUploadService } from './services/fileupload.service';
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
  providers:[FileUploadService, ProductoService]
})

export class ProductoComponent implements OnInit {
  public productos;
  public reservable;
  public init_row;
  public showPages = {};
  public rows;
  public empleados;
  public idProductoAsignado;
  public nombreProductoAsignado;
  public empleados_asignados;
  public empleado_delete;
  public empleado_delete_dni;
  public productoEdit;
  public categorias;
  public fileEvent;
  public fileType;
  public fileEventRRSS;
  public fileTypeRRSS;
  public messageError;
  public uploadProgress;
  public idProducto;
  public filter_id;
  public filter_nombre;
  public filter_categoria;
  public filter_reservable;
  public filter_init_row;

  constructor(private productoService: ProductoService, private fileuploadService: FileUploadService) {
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
  }

  setProductos(response) {
    console.log(response);
    this.productos = response;
  }

  setFilters(id, nombre, categoria, reservable, init_row) {
    this.filter_id = id;
    this.filter_nombre = nombre;
    this.filter_categoria = categoria;
    this.filter_reservable = reservable;
    this.filter_init_row = init_row;
  }

getEmpleadosAsignados(id, nombre) {
  this.idProductoAsignado = id;
  this.nombreProductoAsignado = nombre
  this.productoService.getEmpleadosAsignados(id) 
    .subscribe(
      response => {
        this.empleados_asignados = response;
      },
      error => {
        console.log(error);
      }
    )
}

asignarProducto(empleado) {
  let empleado_id = empleado.split(",");
  console.log(empleado_id[0]);
  console.log(this.idProductoAsignado);
  this.productoService.asignarProducto(empleado_id[0], this.idProductoAsignado)
     .subscribe(
       response => {
         console.log(response);
         this.getEmpleadosAsignados(this.idProductoAsignado, this.nombreProductoAsignado);
       },
       error => {
         console.log(error);
       }
     )
}

setEmpleadoDelete(dni, empleado, apellidos) {
  this.empleado_delete_dni = dni;
  this.empleado_delete = empleado+" "+apellidos;
}

desasignarProducto(dni) {
  this.productoService.desasignarProducto(dni, this.idProductoAsignado) 
    .subscribe(
       response => {
         this.getEmpleadosAsignados(this.idProductoAsignado, this.nombreProductoAsignado);
       },
       error => {
          console.log(error);
       }
    )
}

getProducto(id) {
  console.log("hola");
  this.productoService.getProducto(id)
    .subscribe(
      response => {
        this.productoEdit = response;
        console.log(this.productoEdit);
      },
      error => {

      }
    )
}

editarProducto(event, id, nombre, descripcion, categoria, precio, iva, cantidad, tweet, estancia, imagen, imagenRRSS) {
  let method = "post";
  let filename = imagen.replace(/^.*\\/, "");
	let filenameRRSS = imagenRRSS.replace(/^.*\\/, "");
  let categoria_name = categoria.split(" ");
  this.idProducto = id;
  this.productoService.editarProducto(id, nombre, descripcion, categoria_name[1], precio, iva, cantidad, tweet, estancia, filename, filenameRRSS)
    .subscribe(
      response => {
            console.log(response);
            if(this.fileEvent != undefined && this.fileType != undefined)
                this.uploadFile(this.fileEvent, this.idProducto, this.fileType, method);
            if(this.fileEventRRSS != undefined && this.fileTypeRRSS != undefined)
                this.uploadFile(this.fileEventRRSS, this.idProducto, this.fileTypeRRSS, method);
              location.reload();
      },
      error => {
        console.log(error);
      }
    )
}

eliminarProducto(id) {
  let method = "delete";
  this.productoService.desasignarProductos(id)
  .subscribe(
    response => {
      console.log(response);
    },
    error => {
      console.log(error);
    }
  )
  this.productoService.eliminarProducto(id)
    .subscribe(
      response => {
        console.log(response);
        this.uploadFile(this.fileEvent, id, 'n', method);
        this.uploadFile(this.fileEventRRSS, id, 's', method);
        location.reload();
      },
      error => {
        console.log(error);
      }
    )
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

uploadFile(event, id, type, method): Promise<any> {
 let result: any;
    this.fileuploadService.getObserver()
        .subscribe(progress => {
            this.uploadProgress = progress;
        });

    try {
      if(method == "delete") {
        result = this.fileuploadService.upload(id, type, undefined, method);
      }
      else {
        result = this.fileuploadService.upload(id, type, event.target.files, method);
      }
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
