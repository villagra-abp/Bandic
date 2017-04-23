import { Component } from '@angular/core';
import { ProfileBarComponent } from './profile-bar/profile-bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    ProfileBarComponent
  ]
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})

export class AppComponent {
  title = 'app works!';
}
