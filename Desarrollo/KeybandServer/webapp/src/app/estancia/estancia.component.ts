import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../tools/pipe.module';
import { EstanciaService } from './services/estancia.service';

@Component({
  selector: 'app-estancia',
  templateUrl: './estancia.component.html',
  styleUrls: ['./estancia.component.css'],
  providers:[EstanciaService]
})

export class EstanciaComponent implements OnInit {
 public estancias;
 public palabra = {id:"",capacidad:"",descripcion:""};
 public borrar = {id:""};
 public selectedId;
 public selectedCapacidad;

 /*NUEVAS VARIABLES*/
 public campo;
public init_row;
public pages;
public init_page;
public rows;

 crear: boolean = false;
 edit: boolean = false;
 disabled: boolean = false;
 
  constructor(private estanciaService: EstanciaService) { 
        this.estanciaService.getEstancias()
            .subscribe(
            response => {
                    /*EL SUBSCRIBE ES NUEVO ENTERO*/
                        if(this.init_row == undefined)
                                this.init_row = 0;
                                this.init_page = 1;
                                this.pages = Math.ceil((parseInt(response.length)/5));                                         
                                this.estanciaService.filterEstancias(undefined, undefined, undefined, this.init_row, true)
                                .subscribe(
                                        response=> {
                                        this.estancias = response;
                                        console.log(this.estancias);
                                        }
                                )
                },
                error => {
                        alert("Error en la petición");
                }
            );        
    }

    setEstancias(response){
                     console.log(response);
                     this.estancias = response;          
    }

    rellenarEstancia(id) {
        if(id!=''){
                this.estanciaService.completeEstancia(id).subscribe(response=>{
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

    rellenarBorrar(id){
           // console.log(id);
            event.preventDefault();
            this.estanciaService.completeEstancia(id).subscribe(response=>{
                this.borrar = {id: response[0].id };
                this.getEstancias();
            });
    }
/* NUEVO este getEstancias ya no vale, comentar
    getEstancias() {
        this.estanciaService.getEstancias()
            .subscribe(
            response => {
                        this.estancias = response;
                        //console.log(this.estancias);
                },
                error => {
                        alert("Error en la petición");
                }
            ); 
    }
    */

    crearEstancias(id, capacidad, descripcion) {
      this.estanciaService.putEstancia(id, capacidad, descripcion).subscribe(
            response => {
                   //console.log(response.json());
                     this.getEstancias();
                   //this.rellenarEstancia('');
                  },
            error => {
                    alert("Error en la petición");
            } 
        );
    }

    editarEstancias(id, capacidad, descripcion) {
      this.estanciaService.editEstancia(id, capacidad, descripcion).subscribe(
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

    borrarEstancia(id) {
      //  console.log(id);
      event.preventDefault();
        this.estanciaService.deleteEstancia(id).subscribe(
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
        this.estanciaService.completeEstancia(id)
            .subscribe(
            response => {
                        if(response[0]!= null){
                                this.editarEstancias(id, capacidad, descripcion);
                        }
                        else{
                                this.crearEstancias(id, capacidad, descripcion);
                        }
                },
                error => {
                        console.log(error);
                }
            );       

    }

    comprobarId(id){
            document.getElementById("errorusu").style.visibility = "hidden";
            this.estanciaService.completeEstancia(id)
                .subscribe(
                        response =>{
                                if(response[0] == null){
                                        document.getElementById("user").style.borderColor = 'blue';
                                        document.getElementById("errorusu").style.visibility = "hidden";
                                        document.getElementById("bcrear").removeAttribute("disabled");
                                 }
                                else{
                                      
                                        document.getElementById("user").style.borderColor= 'red';
                                        document.getElementById("errorusu").style.visibility = "visible";
                                        document.getElementById("bcrear").setAttribute("disabled","disabled");
                                }
                        }
                );
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
        this.estanciaService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, false)
                .subscribe(
                response => {
                        console.log(response);
                        this.rows = response.length;
                        if(response.length > 5) { //hace falta paginacion
                                this.estanciaService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, true)
                                .subscribe(
                                response => {
                                        this.estancias = response;
                                        this.setPages();
                                }
                                );
                        }
                        else {
                                this.estancias = response;
                                this.setPages();
                        }
                        this.setPages(); 
                        console.log(this.pages);   
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

    this.estanciaService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, true)
    .subscribe(
        response => {
            console.log(response);
            this.estancias = response;
        }
    )
}

lastPage() {
    if(this.init_page>1) {
      this.init_page--;
      this.init_row = this.init_row-5;
    }

this.estanciaService.filterEstancias(this.selectedId, this.selectedCapacidad, this.campo, this.init_row, true)    .subscribe(
        response => {
            console.log(response);
            this.estancias = response;
        }
    )
}

getEstancias() { //Se llama para recargar los productos cuando se crea uno nuevo
  this.estanciaService.getEstancias() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
        .subscribe(
            response => {
                if(this.init_row == undefined)
                  this.init_row = 0;
                this.rows = response.length;
                this.setPages();
                this.estanciaService.filterEstancias(undefined, undefined, undefined, 0, true);
            },
            error => {

            }
        );
}



  ngOnInit() {
  }
}