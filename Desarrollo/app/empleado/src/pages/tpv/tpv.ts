import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TpvProvider } from '../../providers/tpv-provider';
import { AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
/*
  Generated class for the TPV page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tpv',
  templateUrl: 'tpv.html'
})
export class TPVPage {
public selectedCategoria;
public seleccionado;
public productos;
public precio;
public categorias;
public nombrelinea;
public cantidad = 1;
precioTotal = 0.0;

ticket: boolean = false;

public linea;
public lineas = [];
public respuestas = [];

//images: Array<string>;  
//grid: Array<Array<string>>; //array of arrays

  constructor(public navCtrl: NavController, public navParams: NavParams, private tpvProvider: TpvProvider,  public alertCtrl: AlertController) {
  
         this.tpvProvider.getProductos()
                                    .subscribe(
                                       response => {
                                                this.productos = response;
                                               // this.grid = Array(Math.ceil(this.images.length/4));
                                              
                                                console.log(this.productos);
                                               /* if(this.productos.length==0){
                                                  document.getElementById("sinproductos").innerHTML="<p>No tienes productos asignadas</p>";
                                                }*/
                                        },
                                        error => {
                                            //this.errorMessage = <any>error;
                                             
                                            //if(this.errorMessage !== null){
                                             //   console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            //}
                                        }
                                    );


      this.tpvProvider.getCategorias()
                .subscribe(
                    response => {
                            this.categorias = response;                 
                    },
                    error => {
                            alert("Error en la petición");   
                    }
                );

  }
  home(){
     this.navCtrl.push(HomePage);
  }
  cogerImporte(item){
    let index;
    let repetido = false;

    this.lineas.filter( element => {
      if(element.nombre == item.nombre){
          index = this.lineas.indexOf(item)
          element.cantidad++;
          repetido = true;
      }   
    });
    if(repetido == false){
        this.linea = {'nombre': item.nombre, 'precio': item.precio , 'checked': false , 'cantidad': this.cantidad};
        this.lineas.push(this.linea);
    }
    console.log(this.lineas);
    //console.log(this.lineas);
    this.seleccionado = this.lineas;

    let aux = parseFloat(item.precio) + this.precioTotal;
    this.precioTotal = parseFloat(aux.toFixed(2));
    
  }

  checkLinea(event, item) {
    this.lineas.filter( element => {
      if(element.checked == false && element.nombre == item.nombre){
          element.checked = true;   
      }
      else if(element.checked == true && element.nombre == item.nombre){
          element.checked = false;
      }
    });
    console.log(this.lineas);
  }

  borrarLinea(item){
    this.lineas.filter(element => {
      if(element.cantidad == 1 && element.nombre == item.nombre){
          let index = this.lineas.indexOf(element);
          this.lineas.splice(index,1);
      }
      else if(element.cantidad != 1 && element.nombre == item.nombre){
        element.cantidad--;
      }
    });

      let aux = this.precioTotal - parseFloat(item.precio);
      this.precioTotal = parseFloat(aux.toFixed(2));
          
  }


  setProductos(response){
    this.productos = response;
  }

  mostrarCategoria(id){
    this.selectedCategoria = id;
    console.log(id);

    this.tpvProvider.filterCategorias(this.selectedCategoria)
          .subscribe(
          response => {
            console.log(response);
                    this.productos = response;
                    this.setProductos(this.productos);    
          },           
          error => {
                  console.log(error);
          }
    );

  }

  gestionarPago(){
   
       let alert = this.alertCtrl.create({
      title: 'Gestionando pago...',
     
      buttons: ['Aceptar']
    });
     alert.present();

  }

  cancelarPago(){
    this.precioTotal = 0;
    this.lineas.length = 0;

    this.seleccionado = this.lineas;
      let alert = this.alertCtrl.create({
      title: 'Cancelando el pago...',
     
      buttons: ['Aceptar']
    });
     alert.present();
  }
  

}

