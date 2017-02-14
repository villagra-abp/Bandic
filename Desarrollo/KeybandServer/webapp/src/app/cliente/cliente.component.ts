import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { MainPipe } from '../tools/pipe.module';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
 providers:[ClienteService]
 
})
export class ClienteComponent implements OnInit {
 public usuarios;

  constructor(private clienteService: ClienteService){
 
                // Llamamos al método del servicio
               this.clienteService.getUsuarios()
                                    .subscribe(
                                       response => {
                                                this.usuarios = response;
 
                                                console.log(this.usuarios);
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

  ngOnInit() {
  }

}