import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.css']
})
export class ProfileBarComponent implements OnInit {

  constructor(private router:Router) { }

  cerrarSesion(){
    sessionStorage.clear();
    document.getElementById("login").style.display = "block";
    document.getElementById("menu").style.display = "none";
    //this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
