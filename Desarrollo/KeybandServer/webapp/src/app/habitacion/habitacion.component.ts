import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../tools/pipe.module';
import { HabitacionService } from './services/habitacion.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
  providers: [HabitacionService]
})

export class HabitacionComponent implements OnInit {

 public habitaciones;
 public editar;
 public estancia;

 public selectedId;
 public selectedCapacidad;

 public palabra = {id:"",capacidad:"",descripcion:""};
 public borrar = {id:""};

  /*NUEVAS VARIABLES*/
 public campo;
public init_row;
public pages;
public init_page;
public rows;

 crear: boolean = false;
 edit: boolean = false;
 disabled: boolean = false;


  constructor(private habitacionService: HabitacionService) { 
     this.habitacionService.getHabitaciones()
            .subscribe(
            response => {
                        if(this.init_row == undefined)
                                this.init_row = 0;
                                this.init_page = 1;
                                this.pages = Math.ceil((parseInt(response.length)/5));                                          
                                this.habitacionService.filterEstancias(undefined, undefined, undefined, this.init_row, true)
                                .subscribe(
                                        response=> {
                                        this.habitaciones = response;
                                        console.log(this.habitaciones);
                                        }
                                )
                },
                error => {
                        alert("Error en la petición");
                }
            );
  }

  crearHabitacion(id, capacidad, descripcion) {
        this.habitacionService.putHabitacion(id, capacidad, descripcion).subscribe(
                response => {
                        //console.log(response.json());
                        this.palabra = {id:"",capacidad:"",descripcion:""};
                        this.getEstancias();
                },
                error => {
                        alert("Error en la petición");
                }
        );
  }

  rellenarHabitacion(id) {
        event.preventDefault();
        if(id!=''){
                this.habitacionService.completeHabitacion(id).subscribe(response=>{
                this.palabra = { id: response[0].id,capacidad:response[0].capacidad, descripcion:response[0].descripcion };
                document.getElementById("user").setAttribute("disabled","disabled");
                this.edit = true;
                this.crear = false;
                 });
        }
        else{   
                this.crear = true;
                this.edit = false;
                this.disabled = false;
                this.palabra = {id:"",capacidad:"",descripcion:""};
                document.getElementById("user").removeAttribute("disabled");
        }
    }

  borrarHabitacion(id) {
    event.preventDefault();
    this.habitacionService.deleteHabitacion(id).subscribe(
          response => {
                  //console.log(response.json());
                  this.getEstancias();
          },
          error => {
                  alert("Error en la petición");
          }
      );
  }

    chooseOption(id, capacidad, descripcion){
        this.habitacionService.completeHabitacion(id)
            .subscribe(
            response => {
                    console.log(response);
                        if(response[0]!= null){
                                this.editarHabitacion(id, capacidad, descripcion);
                        }
                        else{
                                this.crearHabitacion(id, capacidad, descripcion);
                        }
                },
                error => {
                        console.log(error);
                }
            );       

    }

   editarHabitacion(id, capacidad, descripcion) {
        this.habitacionService.editHabitacion(id, capacidad, descripcion).subscribe(
            response => {
                       //console.log(response.json());
                this.getEstancias();
            },
            error => {
                this.getEstancias();
                    //alert("Error en la petición");
            }
        );
    }
/* NUEVO este getEstancias ya no vale, comentar
     recargar(){
        this.habitacionService.getHabitaciones()
            .subscribe(
            response => {
                        this.habitaciones = response;
                        //console.log(this.estancias);
                },
                error => {
                        alert("Error en la petición");
                }
            );
    }*/

    rellenarBorrar(id){
           // console.log(id);
            this.habitacionService.completeHabitacion(id).subscribe(response=>{
                this.borrar = {id: response[0].id };
                this.estancia = response[0].id ;
                //this.getEstancias();
            });
    }

      comprobarId(id){
            //document.getElementById("errorusu").style.visibility = "hidden";
            this.habitacionService.completeHabitacion(id)
                .subscribe(
                        response =>{
                                if(response[0] == null){
                                        document.getElementById("user").style.borderColor = 'blue';
                                        document.getElementById("errorusu").style.visibility = "hidden";
                                         document.getElementById("btncrear").removeAttribute("disabled");
                                }
                                else{
                                        document.getElementById("user").style.borderColor= 'red';
                                        document.getElementById("errorusu").style.visibility = "visible";
                                        document.getElementById("btncrear").setAttribute("disabled","disabled");
                                }
                        }
                );
    }



  ngOnInit() {
  }

  /*NUEVO*/
       onChange(id, capacidad, orden) { //cuando se pulsa en buscar
        this.selectedId = id;
        this.selectedCapacidad = capacidad;

        if(orden != "Ordenar por:") this.campo = orden;
        else this.campo = undefined;

        if(this.init_row == undefined)
        this.init_row = 0;

        while(this.init_page>1) {
                this.init_page--;
                this.init_row = this.init_row-5;
        } 
        this.habitacionService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, false)
                .subscribe(
                response => {
                        console.log(response);
                        this.rows = response.length;
                        if(response.length > 5) { //hace falta paginacion
                                this.habitacionService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, true)
                                .subscribe(
                                response => {
                                        this.habitaciones = response;
                                        this.setPages();
                                }
                                );
                        }
                        else {
                                this.habitaciones = response;
                                this.setPages();
                        } 
                },           
                error => {
                        console.log(error);
                }
        );
    }

    setPages() {
        this.init_page = 1;
        this.pages = Math.ceil((parseInt(this.rows)/5));
        console.log(this.pages);
        if(this.pages == 0) {
        this.pages = 1;
        }
    }

    nextPage() {
    if(this.init_page<this.pages) {
      this.init_page++;
      this.init_row = this.init_row+5;
    }

    this.habitacionService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, true)
    .subscribe(
        response => {
            console.log(response);
            this.habitaciones = response;
        }
    )
}

lastPage() {
    if(this.init_page>1) {
      this.init_page--;
      this.init_row = this.init_row-5;
    }

this.habitacionService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, true)    
.subscribe(
        response => {
            console.log(response);
            this.habitaciones = response;
        }
    )
}

getEstancias() { //Se llama para recargar los productos cuando se crea uno nuevo
  this.habitacionService.getHabitaciones() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
        .subscribe(
            response => {
                if(this.init_row == undefined)
                  this.init_row = 0;
              while(this.init_page>1) {
                    this.init_page--;
                    this.init_row = this.init_row-5;
                } 
                this.rows = response.length;
                this.setPages();
                this.filterEstancias(undefined, undefined, 0);
            },
            error => {

            }
        );
}

filterEstancias(id, capacidad, initrow) { //Solo se llama desde el constructor, resultado por defecto de todos los productos
  this.habitacionService.filterEstancias(id, capacidad, this.campo, initrow, true)
         .subscribe(
            response => {
                this.habitaciones = response;
                console.log(this.habitaciones);
            },
            error => {
              console.log(error)
                alert("Error en la petición");
            }
         );
}

}
