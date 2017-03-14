import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../tools/pipe.module';
import {PromocionService} from './services/promocion.service';


@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css'], 
  providers: [PromocionService], 
  
})
export class PromocionComponent implements OnInit {
 public promociones;
public producto_actual = {id:"", nombre:""};
public productos;
crear: boolean = false;
edit: boolean = false;

 public palabra = {id:"",titulo:"",producto:"", descripcion:""};
  constructor(private promocionService: PromocionService) {   
   
    this.promocionService.getPromociones()
            .subscribe(
                response => {
                        this.promociones = response;

                        console.log(this.promociones);
                },
                error => {
                    //this.errorMessage = <any>error;
                      
                    //if(this.errorMessage !== null){
                      //   console.log(this.errorMessage);
                        alert("Error en la petición");
                    //}
                }
            );
  
    this.promocionService.getProductos()
            .subscribe(
                response => {
                        this.productos = response;

                        console.log(this.productos);
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


rellenarPromo(id){
  if(id!=''){
    document.getElementById("id").setAttribute("disabled","disabled");
    this.editarPromocion(id);
     this.edit = true;
      this.crear = false;
  }
  else{
    document.getElementById("id").removeAttribute("disabled");
     this.crear = true;
    this.edit = false;
    this.palabra = {id:"",titulo:"",producto:"", descripcion:""};
    this.producto_actual = {id:"", nombre:""};
  }
}

 editarPromocion(id) {
          event.preventDefault();
          this.promocionService.getPromocion(id).subscribe(response=>{
                  
                
                  this.palabra = { id: response[0].id,titulo:response[0].titulo,producto:response[0].producto, descripcion:response[0].descripcion};
                     
                      this.producto_actual={ id: "",nombre:""};
                   
                    if(this.palabra.producto!=null){
                  this.promocionService.getProductobyId(this.palabra.producto).subscribe(response=>{
                
                              this.producto_actual={ id: response[0].id,nombre:response[0].nombre};
        });
       }
       });
    
       //palabra = {id:"gola",capacidad:"23", descripcion:"puta"};
   }


  borrarPromocion(id){
    this.promocionService.deletePromocion(id).subscribe(
      response=>{console.log(response);
      this.promocionService.getPromociones();
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

crearPromocion($event, id, titulo, producto){
    
    if(this.crear==true){
         this.promocionService.putPromocion(id, titulo,producto, this.palabra.descripcion);
    }
    else{
      this.promocionService.postPromocion(id, titulo,producto, this.palabra.descripcion);
    }

}


    keyupHandlerFunction($event){
     
      this.palabra.descripcion = $event;

       console.log(this.palabra.descripcion);
    }

  ngOnInit() {
  }

}
