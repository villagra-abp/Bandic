import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { EstanciaService } from '../../estancia/services/estancia.service';
import { FileUploadService } from '../services/fileupload.service';
import { ProductoComponent } from '../producto.component'
import { FormBuilder, Validators } from '@angular/forms';
import { Headers, RequestOptions, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}


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
  /**
 * @param Observable<number>
 */
private progress$: Observable<number>;

/**
 * @type {number}
 */
private progress: number = 0;

private progressObserver: any;

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
  public estancias;
  public id1;
  public id2;
  public idCat;
  public comest;
  public categoriaID;

  constructor(public estanciaService: EstanciaService, public productoService: ProductoService, public fileuploadService: FileUploadService) {
    
    this.progress$ = new Observable(observer => {
        this.progressObserver = observer
    });

    this.productos_reservables = [];
    this.productoService.getEmpleados()
        .subscribe(
            response => {
                this.empleados = response;
            },
            error => {

            }
        );

      this.estanciaService.getEstancias()
        .subscribe(
            response => {
                this.estancias = response;
                console.log(response);
            },
            error => {

            }
        );
    this.productoService.getCategorias()
        .subscribe(
            response => {
                this.categorias = response;
                this.categorias.filter(element => {
                
                    if(element.comestible == "f") {
                      element.comestible = "No";
                    }
                    else {
                      element.comestible = "Si";
                    }
                  } );             
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

  /**
 * @returns {Observable<number>}
 */
public getObserver (): Observable<number> {
    return this.progress$;
}

/**
 * Upload files through XMLHttpRequest
 *
 * @param url
 * @param files
 * @returns {Promise<T>}
 */

getProductos() { //Se llama para recargar los productos cuando se crea uno nuevo
  this.productoService.getProductos() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
        .subscribe(
            response => {
                if(this.init_row == undefined)
                  this.init_row = 0;
                while(this.init_page>1) {
                  this.init_page--;
                  this.init_row = this.init_row-5;
                }
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

getCategoria(id) {
  this.categoriaID = id;
}

deleteCategoria() {
  this.productoService.deleteCategoria(this.categoriaID)
  .subscribe(
    response => {
      console.log(response);
      location.reload();
    }
  )
}

camposOblig1(newValue) {
      this.id1 = newValue;
      if(this.id1 && this.id2 && this.id1 != "" && this.id2 != "") {
        document.getElementById("confirmar").removeAttribute("disabled");
        document.getElementById("camposOblig").style.display = "none";
      }
      else {
        document.getElementById("confirmar").setAttribute("disabled", "true");
        document.getElementById("camposOblig").style.display = "block";
      }
}

camposOblig2(newValue) {
      this.id2 = newValue;
      if(this.id1 && this.id2 && this.id1 != "" && this.id2 != "") {
        document.getElementById("confirmar").removeAttribute("disabled");
        document.getElementById("camposOblig").style.display = "none";
      }
      else {
        document.getElementById("confirmar").setAttribute("disabled", "true");
        document.getElementById("camposOblig").style.display = "block";
      }
}

camposOblig3(newValue) {
      this.idCat = newValue;
      if(this.comest && this.comest && this.idCat != "" && this.comest != "") {
        document.getElementById("confirmar2").removeAttribute("disabled");
        document.getElementById("camposOblig2").style.display = "none";
      }
      else {
        document.getElementById("confirmar2").setAttribute("disabled", "true");
        document.getElementById("camposOblig2").style.display = "block";
      }
}

camposOblig4(newValue) {
      this.comest = newValue;
      if(this.idCat && this.comest && this.comest != "" && this.idCat != "") {
        document.getElementById("confirmar2").removeAttribute("disabled");
        document.getElementById("camposOblig2").style.display = "none";
      }
      else {
        document.getElementById("confirmar2").setAttribute("disabled", "true");
        document.getElementById("camposOblig2").style.display = "block";
      }
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
    let empleado_id;
    let estancia_id;
    let enviar_empleado;
    let enviar_estancia;

    console.log(estancia);
    console.log(empleado);

    if(estancia == "Sin estancia" || estancia == "Seleccionar") {
      enviar_estancia = null;
    }
    else {
      estancia_id = estancia.split(" (");
      enviar_estancia = estancia_id[0];
    }
    if(empleado == "Sin empleado" || empleado == "Seleccionar") {
      enviar_empleado = null;
    }    
    else {
      empleado_id = empleado.split(",");
      enviar_empleado = empleado_id[0];
    }
    
    console.log(enviar_estancia);
    console.log(enviar_empleado);
    
    let filename = imagen.replace(/^.*\\/, "");
		let filenameRRSS = imagenRRSS.replace(/^.*\\/, "");
    this.idProducto = id;
    this.productoService.crearProducto(id, nombre, descripcion, categoria2, precio, iva, tweet, cantidad, enviar_estancia, filename, filenameRRSS)
        .subscribe(
          response => {
            console.log(response);
            if(this.fileEvent != undefined && this.fileType != undefined)
                this.uploadFile(this.fileEvent, id, this.fileType);
            if(this.fileEventRRSS != undefined && this.fileTypeRRSS != undefined)
                this.uploadFile(this.fileEventRRSS, id, this.fileTypeRRSS);
              this.filterProductos(undefined, undefined, undefined, undefined, 0);
              if(empleado_id != null) {
                this.asignarProducto(id, enviar_empleado);
              }
              this.getProductos();
              document.getElementById("blah").setAttribute("src", "./images/image-default.jpg");
              document.getElementById("blah2").setAttribute("src", "./images/image-default.jpg");
              //document.getElementById('buttonCerrar').click();
              //location.reload();
              
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
      console.log(id);
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
defaultURL() {
    document.getElementById("blah").setAttribute("src", "./images/image-default.jpg");
    document.getElementById("blah2").setAttribute("src", "./images/image-default.jpg");
}


fileChange(event, type) {
  console.log("aaaaaaaaaaaah");
  if(type == 's') {
    console.log("derecha");
    this.fileEventRRSS = event;
    this.fileTypeRRSS = type;
    var reader = new FileReader();

    reader.onload = function(fre:FileReaderEvent) {
        //var data = JSON.parse(fre.target.result);
        document.getElementById("blah2").setAttribute("src", fre.target.result);
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  else if(type == 'n'){
    console.log("izquierda");
    this.fileEvent = event;
    this.fileType = type;
    var reader = new FileReader();

    reader.onload = function(fre:FileReaderEvent) {
        //var data = JSON.parse(fre.target.result);
        document.getElementById("blah").setAttribute("src", fre.target.result);
    }

    reader.readAsDataURL(event.target.files[0]);
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
        result = this.upload(id, type, event.target.files, method)
        console.log(result);
    } catch (error) {
        document.write(error)
    }

    if (!result['images']) {
        return;
    }
}

upload (id: string, type: string, files: File[], method: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
        let url = "http://localhost/keyband/Desarrollo/KeybandServer/rest/upload.php?id="+id+"&&RRSS="+type+"&&method="+method;
        
        if(files != undefined) {
            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                    this.messageError = xhr.responseText;
                } else {
                    reject(xhr.response);
                }
            }
        };

        this.setUploadUpdateInterval(200);
        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);

            this.progressObserver.next(this.progress);
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
    });
}

/**
 * Set interval for frequency with which Observable inside Promise will share data with subscribers.
 *
 * @param interval
 */
setUploadUpdateInterval (interval: number): void {
    setInterval(() => {}, interval);
}


  ngOnInit() {
  }

}
