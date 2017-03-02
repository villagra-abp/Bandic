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
 crear: boolean = false;
 edit: boolean = false;

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

    rellenarEstancia(id) {
        //document.getElementById("errorusu").style.visibility = "hidden";
        event.preventDefault();
        if(id!=''){
                this.estanciaService.completeEstancia(id).subscribe(response=>{
                this.palabra = { id: response[0].id,capacidad:response[0].capacidad, descripcion:response[0].descripcion };
                this.edit = true;
                this.crear = false;
                document.getElementById("user").setAttribute("disabled","disabled");
                 });
        }
        else{   
                this.crear = true;
                this.edit = false;
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
                                }
                                else{
                                      
                                        document.getElementById("user").style.borderColor= 'red';
                                        document.getElementById("errorusu").style.visibility = "visible";
                                }
                        }
                );
    }

  ngOnInit() {
  }
}

