import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TicketService } from '../../providers/ticket'
import { ConsumoPage } from '../consumo/consumo'


@Component({
  selector: 'page-gastos',
  templateUrl: 'gastos.html',
  providers: [ TicketService]
})
export class GastosPage {
  data;
  tickets

  constructor(public navCtrl: NavController, public navParams: NavParams,public ticketService: TicketService) {}

  ionViewDidLoad() {
    this.load();
  }
  load(){
    this.ticketService.load()
    .then(data =>{
      this.tickets = data;
      for(let i = 0; i <this.tickets.length; i++){
        this.getTpv(this.tickets[i].tpv, i);
      }
    })
  }
  getTpv(item, i){
    this.ticketService.GetTpv(item)
    .then(tpv =>{
      this.tickets[i].tpvNombre = tpv[i].nombre;
    });
  }
  detalleTicket(item){
    this.navCtrl.push( ConsumoPage, { 
      item: item
    });
  }

}
