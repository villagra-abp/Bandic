
import { Component} from '@angular/core';
import {LoginService} from './services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers:[LoginService]
})
export class LoginComponent {

  constructor(private loginService: LoginService) { }

  doLogin(event, dni, password) {
      event.preventDefault();
      this.loginService.postLogin(dni, password);
  }
  

}
