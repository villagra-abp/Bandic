import { Component, OnInit } from '@angular/core';
import { PulseraService } from './services/pulsera.service';
import { MainPipe } from '../tools/pipe.module';

@Component({
  selector: 'app-pulsera',
  templateUrl: './pulsera.component.html',
  styleUrls: ['./pulsera.component.css'],
  providers:[PulseraService]
})
export class PulseraComponent implements OnInit {
public pulseras;

public pulsera_actual = {id:"", usuario:"", estado_pulsera:""};
public estados;
public campo;
public init_row;
public pages;
public init_page;
public rows;
public id;
public estado;
public usuario;

crear: boolean = false;
edit: boolean = false;

  constructor(private pulseraService: PulseraService) { 

    this.pulseraService.getPulseras().subscribe(
                                       response => {
                                           
                                               this.init_row = 0;
                                                this.init_page = 1;
                                                this.pages = Math.ceil((parseInt(response.length)/5));                                         
                                                this.pulseraService.filterPulseras(undefined, undefined, undefined, undefined, this.init_row, true)
                                                .subscribe(
                                                    response=> {
                                                        this.pulseras = response;
                                                        this.pulseras.filter(element => {
                                                          if(element.usuario == null)
                                                            element.usuario = "Sin usuario";
                                                        })
                                                        console.log(this.pulseras);
                                                    }
                                                )
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );   

  this.pulseraService.getEstados()
            .subscribe(
                response => {
                        this.estados = response;

                        console.log(this.estados);
                },
                error => {
                    //this.errorMessage = <any>error;
                      
                    //if(this.errorMessage !== null){
                      //   console.log(this.errorMessage);
                        alert("Error en la petición");
                    //}
                }
            );
  }
rellenarPromo(id){
  if(id!=''){
    document.getElementById("id").setAttribute("disabled","disabled");
    this.editarPulsera(id);
     this.edit = true;
      this.crear = false;
  }
  else{
    document.getElementById("id").removeAttribute("disabled");
     this.crear = true;
    this.edit = false;
    this.pulsera_actual =  {id:"", usuario:"", estado_pulsera:""};
    
  }
}


 editarPulsera(id) {
          event.preventDefault();
          this.pulseraService.getPulsera(id).subscribe(response=>{
                  
                
                  this.pulsera_actual = { id: response[0].id,usuario:response[0].usuario,estado_pulsera:response[0].estado_pulsera};
                     
        
       });
    
      
   }


 borrarPulsera(id){
    this.pulseraService.deletePulsera(id).subscribe(
      response=>{console.log(response);
      this.pulseraService.getPulseras();
      },
       error => {
          //this.errorMessage = <any>error;
            
          //if(this.errorMessage !== null){
            //   console.log(this.errorMessage);
              alert("Error en la petición");
          //}
     }
    )
  }
  crearPulsera($event, id, usuario, estado_pulsera){
    
    if(this.crear==true){
         this.pulseraService.putPulsera(id, usuario, estado_pulsera );
         this.getPulseras();
    }
    else{
      this.pulseraService.postPulsera(id, usuario, estado_pulsera);
      this.getPulseras();
    }
  }

    /**ALBERTO */

    onChange(event, id, usuario, estado, orden) {
      if(estado == "cualquiera") this.estado = undefined;
      if(estado != "Estado:" && estado != "cualquiera") this.estado = estado;

      if(orden != "Ordenar por:") this.campo = orden;
        else this.campo = undefined;

      this.id = id;
      this.usuario = usuario;


      if(orden != "Ordenar por:") this.campo = orden;
      else this.campo = undefined;

      if(this.init_row == undefined)
          this.init_row = 0;

      while(this.init_page>1) {
          this.init_page--;
          this.init_row = this.init_row-5;
        } 
      this.pulseraService.filterPulseras(this.id, this.usuario, this.estado, this.campo, this.init_row, false)
      .subscribe(
          response => {
              console.log(response);
              this.rows = response.length;
              if(response.length > 5) { //hace falta paginacion
                  this.pulseraService.filterPulseras(this.id, this.usuario, this.estado, this.campo, this.init_row, true)
                  .subscribe(
                      response => {
                          this.pulseras = response;
                          this.pulseras.filter(element => {
                            if(element.usuario == null)
                              element.usuario = "Sin usuario";
                          })
                          this.setPages(this.pulseras);
                      }
                  );
              }
              else {
                  this.pulseras = response;
                  this.pulseras.filter(element => {
                            if(element.usuario == null)
                              element.usuario = "Sin usuario";
                          })
                  this.setPages(this.pulseras);
              }
              this.pages = Math.ceil((parseInt(response.length)/5));  
              console.log(this.pages);                                       
          }
      )

    }
    
setPages(productos) {
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

    this.pulseraService.filterPulseras(this.id, this.usuario, this.estado, this.campo, this.init_row, true)
    .subscribe(
        response => {
            console.log(response);
            this.pulseras = response;
            this.pulseras.filter(element => {
                            if(element.usuario == null)
                              element.usuario = "Sin usuario";
                          })
        }
    )
}

lastPage() {
    if(this.init_page>1) {
      this.init_page--;
      this.init_row = this.init_row-5;
    }

    this.pulseraService.filterPulseras(this.id, this.usuario, this.estado, this.campo, this.init_row, true)
    .subscribe(
        response => {
            console.log(response);
            this.pulseras = response;
            this.pulseras.filter(element => {
                            if(element.usuario == null)
                              element.usuario = "Sin usuario";
                          })
        }
    )
}

getPulseras() { //Se llama para recargar los productos cuando se crea uno nuevo
  this.pulseraService.getPulseras() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
        .subscribe(
            response => {
                if(this.init_row == undefined)
                  this.init_row = 0;
                while(this.init_page>1) {
                    this.init_page--;
                    this.init_row = this.init_row-5;
                } 
                this.rows = response.length;
                this.setPages(response);
                this.filterPulseras(undefined, undefined, undefined, 0);
            },
            error => {

            }
        );
}

comprobarUsuario(usuario) {
  document.getElementById("errorusu2").style.visibility = "hidden";
            this.pulseraService.getUsuario(usuario)
                .subscribe(
                        response =>{
                          console.log(response);
                                if(response[0].dni == usuario && response.length == 1){
                                        document.getElementById("usuario").style.borderColor = 'blue';
                                        document.getElementById("errorusu2").style.visibility = "hidden";
                                        document.getElementById("crearpulsera").removeAttribute("disabled");
                                 }
                                else{
                                      
                                        document.getElementById("usuario").style.borderColor= 'red';
                                        document.getElementById("errorusu2").style.visibility = "visible";
                                        document.getElementById("crearpulsera").setAttribute("disabled","disabled");
                                }
                        }
                );
}

filterPulseras(id, usuario, estado, initrow) { //Solo se llama desde el constructor, resultado por defecto de todos los productos
  this.pulseraService.filterPulseras(id, usuario, estado, this.campo, initrow, true)
         .subscribe(
            response => {
                this.pulseras = response;
                console.log(this.pulseras);
            },
            error => {
              console.log(error)
                alert("Error en la petición");
            }
         );
}

  ngOnInit() {
  }

}
