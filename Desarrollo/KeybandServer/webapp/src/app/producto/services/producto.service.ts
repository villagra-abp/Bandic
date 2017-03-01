// importamos el modulo Injectable de AngularJS
import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
//import {Observable} from "rxjs/Observable";
  
// Permitimos que este objeto se pueda inyectar con la DI
@Injectable()
export class ProductoService {
  
   constructor(private http: Http){}
 
   getProductos(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto")
                            .map(response => response.json())                    
   }

   getCategorias() {
     return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/categoria")
                            .map(response => response.json())  
   }
   getEmpleado(id) {
      return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/empleado/producto/"+id)
                            .map(response => response.json())
   }

   getComestible(categoria) {
     return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/categoria?id="+categoria)
                            .map(response => response.json())
   }

   getReservables() {
     return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/reservable")
                            .map(response => response.json())
   }

   filterProductos(id, nombre, categoria, empleado, reservable) {
     var filter;
     if(id != undefined) {
        filter = "?id="+id;
     }
     else {
        filter = "?id=";
     }
     if(nombre != undefined) {
        filter = filter + "&&nombre="+nombre;
     }
     else {
        filter = filter + "&&nombre=";
     }
     if(categoria != undefined && categoria != "Todas") {
        console.log(categoria);
        filter = filter + "&&categoria_producto="+categoria;
     }
     if(categoria == "Todas") {
       filter = filter + "&&categoria_producto=";
     }
     console.log(filter);
     if(reservable) {
       return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/reservable"+filter)
                          .map(response => response.json())
     }

     else {
        return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto"+filter)
                            .map(response => response.json())
     }  
   }
}
