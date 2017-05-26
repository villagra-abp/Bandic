import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Condiciones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-condiciones',
  templateUrl: 'condiciones.html'
})
export class CondicionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CondicionesPage');
  }
  ionViewDidLeave(){
    //this.navCtrl.setRoot(this.navCtrl.first());
  }

}
