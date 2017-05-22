// importamos el modulo Injectable de AngularJS
import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
//import {Observable} from "rxjs/Observable";
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class ProductoService {

constructor (private http: Http) {

}
   crearProducto(id, nombre, descripcion, categoria_producto, precio, iva, tweet, cantidad_disponible, estancia, imagen, imagen_redes) {
      let enviar = JSON.stringify({id, nombre, descripcion, precio, iva, tweet, cantidad_disponible, categoria_producto, estancia, imagen, imagen_redes});
      return this.http.put("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto", enviar)
                            .map(response => response.json())
   }

   crearCategoria(id, comestible) {
     let enviar = JSON.stringify({id, comestible});
     return this.http.put("http://localhost/keyband/Desarrollo/KeybandServer/rest/categoria", enviar)
   }

   editarProducto(id, nombre, descripcion, categoria_producto, precio, iva, cantidad_disponible, tweet, estancia, imagen, imagen_redes) {
      let enviar = JSON.stringify({id, nombre, descripcion, precio, iva, tweet, cantidad_disponible, categoria_producto, estancia, imagen, imagen_redes});
      return this.http.post("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/"+id, enviar)
                            .map(response => response.json())
   }

   eliminarProducto(id) {
     return this.http.delete("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/"+id)
                            .map(response => response.json())
   }

   deleteCategoria(id) {
     return this.http.delete("http://localhost/keyband/Desarrollo/KeybandServer/rest/categoria/"+id)
                            
   }

   asignarProducto(usuario, producto) {
      let enviar = JSON.stringify({usuario, producto});
      return this.http.put("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/empleado", enviar)
                          .map(response => response.json())
   }

   desasignarProducto(usuario, producto) {
     return this.http.delete("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/empleado/"+usuario+"/"+producto)
                          .map(response => response.json())
   }

   desasignarProductos(producto) {
     return this.http.delete("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/empleado/"+producto)
                         
   }

   getProductos(){
      return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto")
                            .map(response => response.json())                    
   }

   getProducto(id) {
     return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto?id="+id)
                            .map(response => response.json())    
   }

   getCategorias() {
     return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/categoria")
                            .map(response => response.json())  
   }

   getEmpleados() {
     return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/usuario?empleado=true")
                            .map(response => response.json())  
   }

   getEmpleado(id) {
      return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/empleado/producto/"+id)
                            .map(response => response.json())
   }

   getEmpleadosAsignados(id) {
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

   filterProductos(id, nombre, categoria, reservable, initrow, paginar, orderBy) {
     var filter = "";
     var pagination = "";
     var order = "";

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
        filter = filter + "&&categoria_producto="+categoria;
     }
     if(categoria == "Todas") {
       filter = filter + "&&categoria_producto=";
     }

     if(!paginar)
        pagination = "&&initrow="+initrow+"&&pagesize=";
     else
        pagination = "&&initrow="+initrow+"&&pagesize=5";
     if(orderBy != undefined)
        order = "&&order=asc&&&by="+orderBy;
        

     console.log(filter+pagination+order);
     if(reservable) {
       return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto/reservable"+filter+pagination+order)
                          .map(response => response.json())
     }

     else {
        return this.http.get("http://localhost/keyband/Desarrollo/KeybandServer/rest/producto"+filter+pagination+order)
                            .map(response => response.json())
     }  
   }
}
