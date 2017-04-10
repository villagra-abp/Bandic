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

 crear: boolean = false;
 edit: boolean = false;
 disabled: boolean = false;


  constructor(private habitacionService: HabitacionService) { 
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
  }

  crearHabitacion(id, capacidad, descripcion) {
        this.habitacionService.putHabitacion(id, capacidad, descripcion).subscribe(
                response => {
                        //console.log(response.json());
                        this.palabra = {id:"",capacidad:"",descripcion:""};
                        this.recargar();
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
                  this.recargar();
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
                this.recargar();
            },
            error => {
                this.recargar();
                    //alert("Error en la petición");
            }
        );
    }

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
    }

    rellenarBorrar(id){
           // console.log(id);
            this.habitacionService.completeHabitacion(id).subscribe(response=>{
                this.borrar = {id: response[0].id };
                this.estancia = response[0].id ;
                this.recargar();
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



  ngOnInit() {
  }

      onChange(id, capacidad) { //cuando se pulsa en buscar
        this.selectedId = id;
        this.selectedCapacidad = capacidad;

        this.habitacionService.filterEstancias(this.selectedId, this.selectedCapacidad)
                .subscribe(
                response => {
                         this.habitaciones = response;
                         this.setHabitaciones(this.habitaciones);    
                },           
                error => {
                        console.log(error);
                }
        );
    }

      setHabitaciones(response){
                     console.log(response);
                     this.habitaciones = response;          
    }

}
