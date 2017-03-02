import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../../tools/pipe.module';
import { EstanciaService } from '../services/estancia.service';

@Component({
  selector: 'app-buscador-estancia',
  templateUrl: './buscador-estancia.component.html',
  styleUrls: ['./buscador-estancia.component.css'],
  providers:[EstanciaService]
})
export class BuscadorEstanciaComponent implements OnInit {

 public estancias;
 public palabra = {id:"",capacidad:"",descripcion:""};
 crear: boolean = false;
 edit: boolean = false;


  constructor(private estanciaService: EstanciaService) { }

  ngOnInit() {
  }

    rellenarEstancia(id) {
        event.preventDefault();
        if(id!=''){
                this.estanciaService.completeEstancia(id).subscribe(response=>{
                this.palabra = { id: response[0].id,capacidad:response[0].capacidad, descripcion:response[0].descripcion };
                this.edit = true;
                this.crear = false;
                 });
        }
        else{   
                this.crear = true;
                this.edit = false;
                this.palabra = {id:"",capacidad:"",descripcion:""};
        }
    }

}
