import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TabPage } from '../pages/tab/tab';
import { GastosPage } from '../pages/gastos/gastos';
import { PerfilPage } from '../pages/perfil/perfil';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { LoginPage } from '../pages/login/login';
import{ UsuarioService } from '../providers/usuario';


@Component({
  templateUrl: 'app.html',
  providers: [ UsuarioService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = TabPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public usuarioService: UsuarioService) {
    /*var usuario = this.usuarioService.devolverStorage();
    if(this.usuarioService.devolverStorage() != null){
      this.rootPage = TabPage;
    }
    else{
      this.rootPage = LoginPage;
    }
    /*.then(usuarios =>{
      if(usuarios != null){
        
      }
      else
        this.rootPage = LoginPage;
        //this.rootPage = TabPage;
    })*/
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}
