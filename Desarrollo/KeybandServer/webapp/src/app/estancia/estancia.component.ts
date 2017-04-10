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

 crear: boolean = false;
 edit: boolean = false;
 disabled: boolean = false;
 
  constructor(private estanciaService: EstanciaService) { 
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

    onChange(id, capacidad) { //cuando se pulsa en buscar
        this.selectedId = id;
        this.selectedCapacidad = capacidad;

        this.estanciaService.filterEstancias(this.selectedId, this.selectedCapacidad)
                .subscribe(
                response => {
                         this.estancias = response;
                         this.setEstancias(this.estancias);    
                },           
                error => {
                        console.log(error);
                }
        );
    }

  ngOnInit() {
  }
}