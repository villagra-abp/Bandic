import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { MainPipe } from '../tools/pipe.module';
import { RolService } from '../rol/services/rol.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
 providers:[ClienteService, RolService]
 
})
export class ClienteComponent implements OnInit {
public empleados;
public pulseras;
public pulsera_actual;
public pulseras_perdidas;
public usuariopulsera;
symptoms= [];

roles= [];
initialized = false;
crear: boolean = false;
edit: boolean = false;
 public palabra = {dni:"",password:"", nombre:"",apellidos:"", email:"", empleado:"f",fecha_nacimiento:"", sexo:"", localidad:"", provincia:"", pais:"", fecha_entrada:"", fecha_salida:""};
  constructor(private clienteService: ClienteService, private rolService: RolService){
 
        this.rolService.getRolesC()
                .subscribe(
                response => {
                response.forEach(element => {

                        this.roles.push({'name': element.id, 'value': element.id, 'checked' : false });
                });
                     this.initialized = true;
                        console.log(this.roles);

                        },
                        error => {
                                alert("Error en la petición");
                        }
                );
                // Llamamos al método del servicio
               this.clienteService.getUsuarios()
                                    .subscribe(
                                       response => {

                                             for(var i = 0; i<response.length; i++){
                                                if(response[i].sexo == 'm'){
                                                response[i].sexo = 'Hombre';
                                                }
                                                else if(response[i].sexo == 'f'){
                                                response[i].sexo = 'Mujer';
                                                }
                                            }
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
                                                            
            this.clienteService.getPulseras().subscribe(
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
   updateP03(permiso, e) {
    this.roles.forEach(element => {
      if (element.value == permiso.value.value) {   
                element.checked = e.target.checked;
      }
    });
  }
        rellenarUsu(id) {
       event.preventDefault();
       if(id!=''){
       
           document.getElementById("pulseraid").setAttribute("disabled","disabled");
           document.getElementById("password").setAttribute("disabled","disabled");
           document.getElementById("dni").setAttribute("disabled","disabled");
           document.getElementById("fecha_entrada").setAttribute("disabled","disabled");
               this.editarEmpleado(id);
               this.edit = true;
               this.crear = false;
            
       }
       else{  
           document.getElementById("pulseraid").removeAttribute("disabled");
           document.getElementById("password").removeAttribute("disabled");
           document.getElementById("dni").removeAttribute("disabled");
           document.getElementById("fecha_entrada").removeAttribute("disabled");
               this.crear = true;
               this.edit = false;
              this.palabra = {dni:"",password:"", nombre:"",apellidos:"", email:"", empleado:"t",fecha_nacimiento:"", sexo:"", localidad:"", provincia:"", pais:"", fecha_entrada:"", fecha_salida:""};
       }
}
editarEmpleado(id) {
          event.preventDefault();
          this.clienteService.getUsuario(id).subscribe(response=>{
                  

                  this.palabra = { dni: response[0].dni,password:response[0].password, nombre:response[0].nombre, apellidos:response[0].apellidos, email:response[0].email,
                  empleado:response[0].empleado,fecha_nacimiento:response[0].fecha_nacimiento, sexo:response[0].sexo, localidad:response[0].localidad,provincia:response[0].provincia,pais:response[0].pais,
                fecha_entrada:response[0].fecha_entrada, fecha_salida:response[0].fecha_salida};
       });
       //palabra = {id:"gola",capacidad:"23", descripcion:"puta"};
   }



   crearUsuario($event, dni,password, nombre, apellidos, email,fecha_nacimiento, sexo, localidad, provincia, pais, pulsera, fecha_entrada, fecha_salida){
         let roles_enviar=[];
         this.roles.forEach(element => {
                if(element.checked == true){
                        roles_enviar.push(element.value);
                }
        });
                  this.palabra = { dni: dni,password:password, nombre:nombre, apellidos:apellidos, email:email,
                  empleado:"f",fecha_nacimiento:fecha_nacimiento, sexo:sexo, localidad:localidad,provincia:provincia,pais:pais, fecha_entrada:fecha_entrada, fecha_salida:fecha_salida};
                   var estado = "activa";
        if(this.crear==true){
                this.clienteService.putUsuario(dni,password, nombre, apellidos, email, this.palabra.empleado,fecha_nacimiento, sexo, localidad, provincia, pais, pulsera, estado, fecha_entrada, fecha_salida, roles_enviar);
           
        }
           else{
               
               this.clienteService.postUsuario(dni,password, nombre, apellidos, email,this.palabra.empleado, fecha_nacimiento, sexo, localidad, provincia, pais, fecha_entrada, fecha_salida);
           }
   }


              borrarEmpleado(id){
                
                this.clienteService.deleteEmpleado(id).subscribe(
                response=>{
                    console.log(response);
                  
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


usuarioPulseras(id){
    this.usuariopulsera = id;
    console.log(this.usuariopulsera);
     this.clienteService.getPulsera_asignada(id).subscribe(
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
           this.clienteService.getPulseras_perdidas(id).subscribe(
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
    this.clienteService.postPulsera(this.pulsera_actual[0].id, this.usuariopulsera, estado_antigua);
}
  this.clienteService.postPulsera(id, this.usuariopulsera, estado);  

}

  ngOnInit() {
  }

  


}