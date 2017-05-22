
import { Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers:[LoginService]
})
export class LoginComponent implements OnInit{

  constructor(private loginService: LoginService, private router:Router) { }
  doLogin(dni, password) {
      this.loginService.postLogin(dni, password)
        .subscribe( response =>{
            if(response[0].token != null){
                sessionStorage["login"] = response[0].token;
                //this.router.navigate(['/admin']);
             
            }  
        },
       error =>{
              alert('Ha ocurrido un error en la petición');
      }); 
  }
    ngOnInit(){
      sessionStorage.clear();
      if(sessionStorage.getItem("login") === null){
          alert('hey');
      }
      else{
          alert('asdfasdfasfdsafas');
        //this.router.navigate(['/admin']);
        
      }
    }
}


