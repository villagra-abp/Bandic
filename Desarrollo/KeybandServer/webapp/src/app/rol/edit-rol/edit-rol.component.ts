import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { MainPipe } from '../../tools/pipe.module';
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css'],
  providers: [RolService]
})
export class EditRolComponent implements OnInit {

  public rol;
  public router; //para redireccionar
  public redirect;
  symptoms= [];
  permisos01= [];
  permisos02= [];
  permisos03= [];
  permisosactivos = [];
  allpermisos = [];
  initialized = false;
  permisosnuevos =[];
  permisoseliminados = [];

  constructor(private RolService: RolService, ruoter: ActivatedRoute, rdrct : Router) {
     this.router = ruoter;
     this.redirect = rdrct;
        this.rol ={
        "id" : "",
        "empleado" :false
        };
        this.RolService.getPermisos()
                .subscribe(
                response => {
                        this.allpermisos = response;
                
                        this.symptoms.push({'name': 'Dizziness','value': '1', 'checked': false});
                        this.symptoms.push( {'name': 'Fainting','value': '2', 'checked': true});
                        },
                        error => {
                                alert("Error en la petición");
                        }
                );
   }
   updateP01(permiso, e) {
    this.permisos01.forEach(element => {
      if (element.value == permiso.value.value) {   
                element.checked = e.target.checked;
      }
    });
  }
  updateP02(permiso, e) {
    this.permisos02.forEach(element => {
      if (element.value == permiso.value.value) {   
                element.checked = e.target.checked;
      }
    });
  }
  updateP03(permiso, e) {
    this.permisos03.forEach(element => {
      if (element.value == permiso.value.value) {   
                element.checked = e.target.checked;
      }
    });
  }
  editRol() {
          event.preventDefault();
        let permisos = [];

        this.setPermisos();
        this.RolService.editRol(this.rol.id, this.rol.empleado, this.permisosnuevos, this.permisoseliminados).subscribe(
                response => {
                        //console.log(response.json());
                        this.redirect.navigate(['./rol']);
                },
                error => {
                        alert("Error en la petición");
                }
        );
  }
  ngOnInit() {
     this.router.queryParams.subscribe((params: Params) => {
        let userId = params['id'];
        console.log("mostrar nombre ");
        console.log(userId);
        this.RolService.getPermisoByRol(userId).subscribe(
                 Response => {
                        this.permisosactivos = Response;
                        console.log("PERMISOS ASIGNADO YAAAAAAAAa");

                        this.allpermisos.forEach(element => {
                        let code = element.id.substring(0,2);
                        if(code=='01'){
                                if(this.ischecked(element.id))
                                        this.permisos01.push({'name': element.descripcion, 'value': element.id, 'checked' : true });
                                else
                                        this.permisos01.push({'name': element.descripcion, 'value': element.id, 'checked' : false });
                        }
                        else if(code =='02'){
                                 if(this.ischecked(element.id))
                                        this.permisos02.push({'name': element.descripcion, 'value': element.id, 'checked' : true });
                                else
                                        this.permisos02.push({'name': element.descripcion, 'value': element.id, 'checked' : false });                               
                        }
                        else if(code =='03'){
                                if(this.ischecked(element.id))
                                        this.permisos03.push({'name': element.descripcion, 'value': element.id, 'checked' : true });
                                else
                                        this.permisos03.push({'name': element.descripcion, 'value': element.id, 'checked' : false });
                        }
                        
                });
                console.log("PERMISOS PARA MOSTRAR");
                        console.log(this.permisos01);
                        console.log(this.permisos02);
                        console.log(this.permisos03);
                        this.initialized = true;
                 },
                 error => {
                         alert("Error en la petición 2svdv");
                 }
         );
         this.RolService.getRol(userId).subscribe(
                 Response => {
                         this.rol.id = Response[0].id;
                         this.rol.empleado = Response[0].empleado;
                         if(Response[0].empleado == "t")
                                this.rol.empleado = true;
                        else
                                this.rol.empleado = false;
                 },
                 error => {
                         alert("Error en la petición 1");
                 }
         );
         
      });
}
ischecked(id){
        console.log(this.permisosactivos);
        let response = false;
        this.permisosactivos.forEach(element => {
                console.log("permisosactivos: "+ element.id);
                console.log("id enviado: "+ id);
                if(element.id == id){
                        response = true;
                }
        });
        return response;
}
isinArray(name){
        let resul = false;
        this.permisosactivos.forEach(element => {
                if(element.id == name ){
                        resul=  true;
                }
        });
        return resul;
}
setPermisos(){
        this.permisos01.forEach(element => {
                if(element.checked == false && this.isinArray(element.value)){
                        this.permisoseliminados.push(element.value);
                }
                else if(element.checked == true  && this.isinArray(element.value) == false){
                        this.permisosnuevos.push(element.value);
                }
        });
        this.permisos02.forEach(element => {
                if(element.checked == false && this.isinArray(element.value)){
                        this.permisoseliminados.push(element.value);
                }
                else if(element.checked == true  && this.isinArray(element.value) == false){
                        this.permisosnuevos.push(element.value);
                }
        });
        this.permisos03.forEach(element => {
                if(element.checked == false && this.isinArray(element.value)){
                        this.permisoseliminados.push(element.value);
                }
                else if(element.checked == true  && this.isinArray(element.value) == false){
                        this.permisosnuevos.push(element.value);
                }
        });
}

}