import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OcioPage } from '../ocio/ocio';
import { ReservasPage } from '../reservas/reservas';
import { PromocionesPage } from '../promociones/promociones';
import { PerfilPage} from '../perfil/perfil'

@Component({
  templateUrl: 'tab.html',
})
export class TabPage {

  tab1Root: any = PromocionesPage;
  tab2Root: any = ReservasPage;
  tab3Root: any = OcioPage;
  tab4Root: any = PerfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  activar(tab){
  	console.log("activar esta página");
  }
}


