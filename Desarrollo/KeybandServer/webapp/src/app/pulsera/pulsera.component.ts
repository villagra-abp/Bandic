import { Component, OnInit } from '@angular/core';
import { PulseraService } from './services/pulsera.service';
import { MainPipe } from '../tools/pipe.module';

@Component({
  selector: 'app-pulsera',
  templateUrl: './pulsera.component.html',
  styleUrls: ['./pulsera.component.css'],
  providers:[PulseraService]
})
export class PulseraComponent implements OnInit {
public pulseras;

public pulsera_actual = {id:"", usuario:"", estado_pulsera:""};
public estados;
crear: boolean = false;
edit: boolean = false;

  constructor(private pulseraService: PulseraService) { 

    this.pulseraService.getPulseras().subscribe(
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

  this.pulseraService.getEstados()
            .subscribe(
                response => {
                        this.estados = response;

                        console.log(this.estados);
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
    this.editarPulsera(id);
     this.edit = true;
      this.crear = false;
  }
  else{
    document.getElementById("id").removeAttribute("disabled");
     this.crear = true;
    this.edit = false;
    this.pulsera_actual =  {id:"", usuario:"", estado_pulsera:""};
    
  }
}


 editarPulsera(id) {
          event.preventDefault();
          this.pulseraService.getPulsera(id).subscribe(response=>{
                  
                
                  this.pulsera_actual = { id: response[0].id,usuario:response[0].usuario,estado_pulsera:response[0].estado_pulsera};
                     
        
       });
    
      
   }


 borrarPulsera(id){
    this.pulseraService.deletePulsera(id).subscribe(
      response=>{console.log(response);
      this.pulseraService.getPulseras();
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
  crearPulsera($event, id, usuario, estado_pulsera){
    
    if(this.crear==true){
         this.pulseraService.putPulsera(id, usuario, estado_pulsera );
    }
    else{
      this.pulseraService.postPulsera(id, usuario, estado_pulsera);
    }

}


  ngOnInit() {
  }

}
