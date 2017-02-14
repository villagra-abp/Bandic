import { Injectable } from '@angular/core';
// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {


   constructor(private http: Http){}

   postLogin(dni, password){
       let valor =JSON.stringify({dni, password});
       
       return this.http.post("http://localhost/Keyband/Desarrollo/KeybandServer/rest/login",valor)
                            .subscribe(response=>{
                                //HACER EL IF ELSE DE SI ENTRA O NO TT
                               /* var obj = response.text();
                                
                                if(obj.startsWith("[")){
                                    sessionStorage["usertoken"]=response.json()[0].token;
                                }
                                else{
                                    alert("los parametros introducidos no son correctos");
                                }*/
                                console.log(response.json());
                                let usu = new usuario();
                                usu = response.json();
                              if(usu.token!= null){
                                    alert("acertaste guey");
                                    sessionStorage["usertoken"]=response.json()[0].token;
                                }
                                else {
                                    alert("o pones bien la contraseña te mato");
                                }
                            },
                            error => 
                                alert(error.text())
                            );
        
   }

  
}
class usuario{
    token:string;
    message:string;
}