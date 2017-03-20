import { Component, OnInit } from '@angular/core';
import {RouterModule,ActivatedRoute,Router, Params} from '@angular/router';
import { RolService } from './services/rol.service';
import { MainPipe } from '../tools/pipe.module';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers:[RolService]
})
export class RolComponent implements OnInit {
  public roles;
  private router;
  private actiR;
  public borrar = {id:""};
  public rol;
  constructor(private rolService: RolService, private ruoter:Router, private ar: ActivatedRoute){
    this.router = ruoter;
    this.actiR = ar;
    // Llamamos al método del servicio
    this.rolService.getRoles()
      .subscribe(
        response => {
          this.roles = response;
            console.log(this.roles);
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
  rellenarBorrar(id){
           // console.log(id);
            this.rolService.getRol(id).subscribe(response=>{
                this.borrar = {id: response[0].id };
                this.rol = response[0].id ;
                //this.recargar();
            });
    }
    borrarRol(id) {
    event.preventDefault();
    this.rolService.deleteRol(id).subscribe(
          response => {
                  //console.log(response.json());
                  this.recargar();
          },
          error => {
                  alert("Error en la petición");
          }
      );
  }
  recargar(){
        this.rolService.getRoles()
            .subscribe(
            response => {
                        this.roles = response;
                        //console.log(this.estancias);
                },
                error => {
                        alert("Error en la petición");
                }
            );
    }
  redirect(){
      this.router.navigate(['./newRol']);
  }
  getRol(ids){
     this.router.navigate(['../editRol'], {queryParams: {id: ids}});
  }
  ngOnInit() {
  }

}
