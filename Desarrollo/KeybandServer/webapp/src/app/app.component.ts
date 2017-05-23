import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})

export class AppComponent implements OnInit {

constructor(private loginService: LoginService, private router:Router) { }
  doLogin(dni, password) {
      this.loginService.postLogin(dni, password)
        .subscribe( response =>{
            if(response[0].token != null){
                sessionStorage["login"] = response[0].token;
                //data-toggle="modal" data-target=".bs-example-modal-sm"
                document.getElementById("login").style.display = "none";
                document.getElementById("menu").style.display = "block";
                this.router.navigate(['/inicio']);      
            }  
        },
       error =>{
         console.log(error);
              //alert('Ha ocurrido un error en la petición');
      }); 
  }
    ngOnInit(){

      if(sessionStorage.getItem("login") === null){
          document.getElementById("login").style.display = "block";
          document.getElementById("menu").style.display = "none";
      }
      else{
          document.getElementById("login").style.display = "none";
          document.getElementById("menu").style.display = "block";
      }
      //sessionStorage.clear();
     /* if(sessionStorage.getItem("login") === null){
          alert('hey');
      }
      else{
          alert('asdfasdfasfdsafas');
        //this.router.navigate(['/admin']);
        
      }*/
    }

}
