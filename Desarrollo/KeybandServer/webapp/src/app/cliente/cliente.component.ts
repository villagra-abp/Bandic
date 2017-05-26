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
symptoms= [];
maxLength = '9';
maxLength2 = '100';
public empleados; public dni; public nombre; public apellidos; public localidad; public pais; public provincia; public orden;
public pulseras;
public pulsera_actual;
public pulseras_perdidas;
public usuariopulsera;
public title;
public UsuarioDNI;
public campo;
public init_row;
public pages;
public init_page;
public rows;
public dniValido;
public emailValido;
public emaill;
public dnii;
public sexoo;
public nombree;
public apellidoss;
public fechaNac;
public paiss;
public passwordd;


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
                                       
                                         if(this.init_row == undefined)
                                                this.init_row = 0;
                                                this.init_page = 1;
                                                this.pages = Math.ceil((parseInt(response.length)/5));                                         
                                                this.clienteService.filterClientes(undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.init_row, true)
                                                .subscribe(
                                                    response=> {
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
           this.title = "Editar cliente";
           document.getElementById("pulseraid").setAttribute("disabled","disabled");
           document.getElementById("password").setAttribute("disabled","disabled");
           document.getElementById("dni").setAttribute("disabled","disabled");
           document.getElementById("fecha_entrada").setAttribute("disabled","disabled");

           document.getElementById("submitCliente").removeAttribute("disabled");
           document.getElementById("camposOblig3").style.display = "none";
               this.editarEmpleado(id);
               this.edit = true;
               this.crear = false;
            
       }
       else{
           this.title = "Crear cliente";  
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
           		this.getUsuarios();
           	
        }
           else{
               
               this.clienteService.postUsuario(dni,password, nombre, apellidos, email,this.palabra.empleado, fecha_nacimiento, sexo, localidad, provincia, pais, fecha_entrada, fecha_salida);
               this.getUsuarios();
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

/**ALBERTO */

getUsu(id) {
    this.UsuarioDNI = id;
}

onChange(event, dni, nombre, apellidos, localidad, provincia, pais, orden) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.localidad = localidad;
    this.provincia = provincia;
    this.pais = pais;
    this.orden = orden;

    if(orden != "Ordenar por:") this.campo = orden;
    else this.campo = undefined;

    if(this.init_row == undefined)
        this.init_row = 0;

    while(this.init_page>1) {
        this.init_page--;
        this.init_row = this.init_row-5;
      } 
    this.clienteService.filterClientes(dni, nombre, apellidos, localidad, provincia, pais, this.campo, this.init_row, false)
    .subscribe(
        response => {
            console.log(response);
            this.rows = response.length;
             if(response.length > 5) { //hace falta paginacion
                this.clienteService.filterClientes(dni, nombre, apellidos, localidad, provincia, pais, this.campo, this.init_row, true)
                .subscribe(
                    response => {
                        this.setPages(this.empleados);
                        for(var i = 0; i<response.length; i++){
                          if(response[i].sexo == 'm'){
                            response[i].sexo = 'Hombre';
                          }
                          else if(response[i].sexo == 'f'){
                            response[i].sexo = 'Mujer';
                            }
                          }
                        this.empleados = response;

                    }
                );
             }
             else {
                 for(var i = 0; i<response.length; i++){
                          if(response[i].sexo == 'm'){
                            response[i].sexo = 'Hombre';
                          }
                          else if(response[i].sexo == 'f'){
                            response[i].sexo = 'Mujer';
                            }
                          }
                 this.empleados = response;
                 this.setPages(this.empleados);
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

    this.clienteService.filterClientes(this.dni, this.nombre, this.apellidos, this.localidad, this.provincia, this.pais, this.campo, this.init_row, true)
    .subscribe(
        response => {
            console.log(response);
            this.empleados = response;
        }
    )
}

lastPage() {
    if(this.init_page>1) {
      this.init_page--;
      this.init_row = this.init_row-5;
    }

    this.clienteService.filterClientes(this.dni, this.nombre, this.apellidos, this.localidad, this.provincia, this.pais, this.campo, this.init_row, true)
    .subscribe(
        response => {
            console.log(response);
            this.empleados = response;
        }
    )
}

getUsuarios() { //Se llama para recargar los productos cuando se crea uno nuevo
  this.clienteService.getUsuarios() //inicialmente hacer getProductos para ver cuantos hay y guardarme el numero de filas
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
                this.filterClientes(undefined, undefined, undefined, undefined, undefined, undefined, 0);
            },
            error => {

            }
        );
}

filterClientes(dni, nombre, apellidos, localidad, provincia, pais, initrow) { //Solo se llama desde el constructor, resultado por defecto de todos los productos
  this.clienteService.filterClientes(dni, nombre, apellidos, localidad, provincia, pais, this.campo, initrow, true)
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
            },
            error => {
              console.log(error)
                alert("Error en la petición");
            }
         );
}

validarDni(newValue) {
  this.dnii = newValue;
  var numero
  var letr
  var letra
  var expresion_regular_dni
  var validar;
 
  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
 
  if(expresion_regular_dni.test (this.dnii) == true){
     numero = this.dnii.substr(0,this.dnii.length-1);
     letr = this.dnii.substr(this.dnii.length-1,1);
     numero = numero % 23 - 1;
     letra='TRWAGMYFPDXBNJZSQVHLCKET';
     
     letra=letra.substring(numero+1,numero+2);
     console.log(letra);
     console.log(letr);
    if (letra!=letr.toUpperCase()) {
      validar = false;
     }else{
       validar = true;
     }
  }else{
     validar = false;
   }

   if(validar) {
        document.getElementById("errorDni").innerHTML = "Dni(*)";
        document.getElementById("errorDni").style.color = "#73879C";
        document.getElementById("dni").style.borderColor = "#ccc";
        this.dniValido = true;
   }
   else {
        document.getElementById("errorDni").innerHTML = "Dni(*): formato incorrecto";
        document.getElementById("errorDni").style.color = "red";
        document.getElementById("dni").style.borderColor = "red";
        this.dniValido = false;
   }
    if(this.sexoo && this.passwordd && this.paiss && this.fechaNac && this.nombree && this.apellidoss && this.dniValido && this.emailValido) {
        document.getElementById("submitCliente").removeAttribute("disabled");
        document.getElementById("camposOblig3").style.display = "none";
    }
    else {
        document.getElementById("submitCliente").setAttribute("disabled", "true");
        document.getElementById("camposOblig3").style.display = "block";
        document.getElementById("camposOblig3").style.marginLeft = "23em";
    }
}

validarEmail(newValue) {
    this.emaill = newValue;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(newValue)) {
        document.getElementById("errorEmail").innerHTML = "Email(*): formato incorrecto";
        document.getElementById("errorEmail").style.color = "red";
        document.getElementById("email").style.borderColor = "red";
        this.emailValido = false;
    }
    else {
        document.getElementById("errorEmail").innerHTML = "Email(*)";
        document.getElementById("errorEmail").style.color = "#73879C";
        document.getElementById("email").style.borderColor = "#ccc";
        this.emailValido = true;
    }
    if(this.sexoo && this.passwordd && this.paiss && this.fechaNac && this.nombree && this.apellidoss && this.dniValido && this.emailValido) {
        document.getElementById("submitCliente").removeAttribute("disabled");
        document.getElementById("camposOblig3").style.display = "none";
    }
    else {
        document.getElementById("submitCliente").setAttribute("disabled", "true");
        document.getElementById("camposOblig3").style.display = "block";
        document.getElementById("camposOblig3").style.marginLeft = "23em";
    }
}

camposOblig(newValue, campo) {
  if(this.title != "Editar cliente") {
    if(newValue != "" && campo == "n")
        this.nombree = true;
    else if (newValue == "" && campo == "n")
        this.nombree = false;
    
    if(newValue != "" && campo == "a")
        this.apellidoss = true;
    else if (newValue == "" && campo == "a")
        this.apellidoss = false;

    if(newValue != "" && campo == "f")
        this.fechaNac = true;
    else if (newValue == "" && campo == "f")
        this.fechaNac = false;

    if(newValue != "" && campo == "p")
        this.paiss = true;
    else if (newValue == "" && campo == "p")
        this.paiss = false;

    if(newValue != "" && campo == "c")
        this.passwordd = true;
    else if (newValue == "" && campo == "c")
        this.passwordd = false;

    if(newValue != "" && campo == "s")
        this.sexoo = true;
    else if (newValue == "" && campo == "s")
        this.sexoo = false;

    if(this.sexoo && this.passwordd && this.paiss && this.fechaNac && this.nombree && this.apellidoss && this.dniValido && this.emailValido) {
        document.getElementById("submitCliente").removeAttribute("disabled");
        document.getElementById("camposOblig3").style.display = "none";
    }
    else {
        document.getElementById("submitCliente").setAttribute("disabled", "true");
        document.getElementById("camposOblig3").style.display = "block";
        document.getElementById("camposOblig3").style.marginLeft = "23em";
    }
  }
}

  ngOnInit() {
  }

  


}