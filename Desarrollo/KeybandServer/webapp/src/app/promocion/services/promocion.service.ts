import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class PromocionService {

  constructor(private http: Http) { }
   getPromociones(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/promocion")
                            .map(response => response.json())
                            
   }
      getProductos(){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/producto")
                            .map(response => response.json())
                            
   }
   deletePromocion(id){
     
     return this.http.delete("http://localhost/Keyband/Desarrollo/KeybandServer/rest/promocion/"+id)
                            .map(response => response.json())
   }

getPromocion(id){
        // petición por get a esa url de un api rest de pruebas
      return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/promocion?id="+id)
                            .map(response => response.json())
                            
   }

  putPromocion(id,titulo,producto, descripcion){
       let valor =JSON.stringify({id, titulo,  descripcion, producto});
       console.log(valor);
       return this.http.put("http://localhost/Keyband/Desarrollo/KeybandServer/rest/promocion",valor)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                //this.getPromociones();
                               
                            },
                            error => 
                                alert(error.text())
                            );
        
   }
    postPromocion(id,titulo,producto, descripcion){
       let valor =JSON.stringify({id, titulo,  descripcion, producto});
       console.log(valor);
       return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/promocion/"+id,valor)
                            .subscribe(response=>{
                           
                                console.log(response.json());
                                //this.getPromociones();
                               
                            },
                            error => 
                                alert(error.text())
                            );
        
   }
getProductobyId(id){
   return this.http.get("http://localhost/Keyband/Desarrollo/KeybandServer/rest/producto?id="+id)
                            .map(response => response.json())
}
  

}
