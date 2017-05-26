import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import {  ViewChild } from '@angular/core';
import { ActividadesPage} from '../actividades/actividades';
import { TPVPage} from '../tpv/tpv';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
actividades(){
  this.navCtrl.push(ActividadesPage);
}
tpv(){
  this.navCtrl.push(TPVPage);
}
}
