import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService } from './services/categoria-producto.service';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css'],
  providers:[CategoriaProductoService]
})
export class CategoriaProductoComponent implements OnInit {

public categorias;

  constructor(private categoriaService: CategoriaProductoService) {
    this.categoriaService.getCategorias()
      .subscribe(
          response => {
              response.filter(element => {
                
              });
              this.categorias = response;
          },
          error => {

          }
      );
   }

  ngOnInit() {
  }

}
