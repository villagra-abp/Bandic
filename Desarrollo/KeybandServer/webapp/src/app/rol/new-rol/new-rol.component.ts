import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { MainPipe } from '../../tools/pipe.module';
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-new-rol',
  templateUrl: './new-rol.component.html',
  styleUrls: ['./new-rol.component.css'],
  providers: [RolService]
})

export class NewRolComponent implements OnInit {

public rol;
 public router; //para redireccionar
symptoms= [];
permisos01= [];
permisos02= [];
permisos03= [];
initialized = false;
  constructor(private RolService: RolService, ruoter: Router) {
        this.router = ruoter;
        this.rol ={
        "id" : "",
        "empleado" :false
        };
        this.RolService.getPermisos()
                .subscribe(
                response => {
                response.forEach(element => {
                        let code = element.id.substring(0,2);
                        if(code=='01')
                        this.permisos01.push({'name': element.descripcion, 'value': element.id, 'checked' : false });
                        else if(code =='02')
                        this.permisos02.push({'name': element.descripcion, 'value': element.id, 'checked' : false });
                        else if(code =='03')
                        this.permisos03.push({'name': element.descripcion, 'value': element.id, 'checked' : false });
                });
                        console.log(this.permisos01);
                        console.log(this.permisos02);
                        console.log(this.permisos03);
                        this.initialized = true;
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
  createRol() {
          event.preventDefault();
        let permisos = [];
        this.permisos01.forEach(element => {
                if(element.checked == true){
                        permisos.push(element.value);
                }
        });
        this.permisos02.forEach(element => {
                if(element.checked == true){
                        permisos.push(element.value);
                }
        });
        this.permisos03.forEach(element => {
                if(element.checked == true){
                        permisos.push(element.value);
                }
        });
        console.log(this.rol);
        console.log(permisos);
        this.RolService.putRol(this.rol.id, this.rol.empleado, permisos).subscribe(
                response => {
                        //console.log(response.json());
                        this.router.navigate(['./rol']);
                },
                error => {
                        alert("Error en la petición");
                }
        );
  }


  ngOnInit() {
    
  }

}
