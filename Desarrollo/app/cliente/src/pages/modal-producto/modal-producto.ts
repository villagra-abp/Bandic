import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-producto',
  templateUrl: 'modal-producto.html'
})
export class ModalProductoPage {
item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProductoPage');
  }
  close(){
    this.navCtrl.popTo(this.navCtrl.getPrevious());
  }

}
