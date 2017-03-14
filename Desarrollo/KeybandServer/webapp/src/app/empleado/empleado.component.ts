import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from './services/empleado.service';
import { MainPipe } from '../tools/pipe.module';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers:[EmpleadoService]
})
export class EmpleadoComponent implements OnInit {
public empleados;
public pulseras;
public pulsera_actual;
public pulseras_perdidas;
public usuariopulsera;
crear: boolean = false;
edit: boolean = false;
 public palabra = {dni:"",password:"", nombre:"",apellidos:"", email:"", empleado:"t",fecha_nacimiento:"", sexo:"", localidad:"", provincia:"", pais:""};
  constructor(private empleadoService: EmpleadoService){
   
                // Llamamos al método del servicio
               this.empleadoService.getEmpleados()
                                    .subscribe(
                                       response => {
                                                this.empleados = response;
 
                                                console.log(this.empleados);
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );
                                    
            this.empleadoService.getPulseras().subscribe(
                                       response => {
                                           
                                                this.pulseras = response;
 
                                                console.log(this.pulseras);
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
      rellenarUsu(id) {
       event.preventDefault();
       if(id!=''){
          
           document.getElementById("pulseraid").setAttribute("disabled","disabled");
           document.getElementById("password").setAttribute("disabled","disabled");
           document.getElementById("dni").setAttribute("disabled","disabled");
               this.editarEmpleado(id);
               this.edit = true;
               this.crear = false;
            
       }
       else{  
           document.getElementById("pulseraid").removeAttribute("disabled");
           document.getElementById("password").removeAttribute("disabled");
           document.getElementById("dni").removeAttribute("disabled");
               this.crear = true;
               this.edit = false;
              this.palabra = {dni:"",password:"", nombre:"",apellidos:"", email:"", empleado:"t",fecha_nacimiento:"", sexo:"", localidad:"", provincia:"", pais:""};
       }
}


       editarEmpleado(id) {
          event.preventDefault();
      
          this.empleadoService.getEmpleado(id).subscribe(response=>{
                  
                
                  this.palabra = { dni: response[0].dni,password:response[0].password, nombre:response[0].nombre, apellidos:response[0].apellidos, email:response[0].email,
                  empleado:response[0].empleado,fecha_nacimiento:response[0].fecha_nacimiento, sexo:response[0].sexo, localidad:response[0].localidad,provincia:response[0].provincia,pais:response[0].pais};
       });
   }

   crearUsuario($event, dni,password, nombre, apellidos, email,fecha_nacimiento, sexo, localidad, provincia, pais, pulsera){
      
                  this.palabra = { dni: dni,password:password, nombre:nombre, apellidos:apellidos, email:email,
                  empleado:"t",fecha_nacimiento:fecha_nacimiento, sexo:sexo, localidad:localidad,provincia:provincia,pais:pais};
                   var estado = "activa";
           if(this.crear==true){
                this.empleadoService.putUsuario(dni,password, nombre, apellidos, email, this.palabra.empleado,fecha_nacimiento, sexo, localidad, provincia, pais, pulsera, estado);
           }
           else{
               
               this.empleadoService.postUsuario(dni,password, nombre, apellidos, email,this.palabra.empleado, fecha_nacimiento, sexo, localidad, provincia, pais);
           }
             
                 

   }


              borrarEmpleado(id){
                
                this.empleadoService.deleteEmpleado(id).subscribe(
                response=>{console.log(response);
                },
                error => {
                
                        alert("Error en la petición");
                   
                }
                )
              }


usuarioPulseras(id){
    this.usuariopulsera = id;
    console.log(this.usuariopulsera);
     this.empleadoService.getPulsera_asignada(id).subscribe(
                                       response => {
                                           
                                                this.pulsera_actual = response;
 
                                                console.log(this.pulseras);
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );  
           this.empleadoService.getPulseras_perdidas(id).subscribe(
                                       response => {
                                           
                                                this.pulseras_perdidas = response;
 
                                                console.log(this.pulseras);
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


cambiarPulsera($event, id, usuario){
    var estado="activa";
    var estado_antigua="perdida";


if(this.pulsera_actual!=""){
    this.empleadoService.postPulsera(this.pulsera_actual[0].id, this.usuariopulsera, estado_antigua);
}
  this.empleadoService.postPulsera(id, this.usuariopulsera, estado);  

}

  ngOnInit() {
  }

  

}
