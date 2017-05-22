import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../../tools/pipe.module';
import { MetricasService } from '../services/metricas.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css'],
  providers: [MetricasService]
})
export class ContabilidadComponent implements OnInit {
public tpvs;

  constructor(private metricasService: MetricasService) {
   // this.productos_reservables = [];
    this.metricasService.getTPV()
        .subscribe(
            response => {
                this.tpvs = response;
            },
            error => {

            });
   }
  
  // ESTADISTICAS PRINCIPALES DE LA VENTANA GRANDE
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['TPV Recepción', 'TPV Piscina', 'TPV Salas', 'TPV Comedor'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81], label: '1ºTrimestre'},
    {data: [28, 48, 40, 19], label: '2ºTrimestre'},
    {data: [28, 48, 30, 59], label: '3ºTrimestre'}
  ];
  
  /*  public coloresPrincipales: any[] = [
      { 
        backgroundColor:[{
          backgroundColor: '#FF7360'},{
          backgroundColor:'#8DE78D'},{
          backgroundColor:'#F0F562'}]
      }];*/

      public coloresPrincipales: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,115,96,1)',
      borderColor: 'rgba(225,115,96,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(141,231,141,1)',
      borderColor: 'rgba(141,231,141,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // third color
      backgroundColor: 'rgba(111,200,206,1)',
      borderColor: 'rgba(111,200,206,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  ngOnInit() {
  }


  public getDatosMes(id){
      /*var numero = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	      this.metricasService.getResultados(id).subscribe(
          response =>{
	           for(var i = 0; i<response.data.length;i++){
	               var fecha = response.data[i].fecha;
	               var split = fecha.split("-");   
	               
	               for(var j=0; j<numero.length;j++){
	                   if(split[1]==numero[j]){
	                	   visitas[j] = visitas[j] + parseInt(response.data[i].importe);
	                   }
	               }
	           }
	           for(var b=0; b<meses.length;b++){
	               if(visitas[b]!=0){
	                   total = visitas[b] + total;
	                   respuestaMes.push({mes: meses[b],fondos:visitas[b]});
	               }
	           }
          },
          error =>{
            alert('error');
          }  
	       );   */ 
	   }

/* AQUI VAN LAS CATEGORIAS */

    public radarChartLabels:string[] = ['Alimentación', 'Masajes', 'Deportes', 'Otros', 'Excursiones'];
    public radarChartData:any = [
        {data: [92, 79, 90, 81, 55], label: '2017'}
    ];
    public radarChartType:string = 'radar';

  public lineChartColors:Array<any> = [
    { // Verde
      backgroundColor: 'rgba(141,231,141,0.2)',
      borderColor: 'rgba(141,231,141,1)',
      pointBackgroundColor: 'rgba(141,231,141,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(141,231,141,0.8)'
    }
  ];

/* AQUI VAN LOS TPV COMPARADOS */

  public leyenda:boolean = true;
  public pieChartLabels:string[] = ['TPV Piscina', 'TPV Recepción', 'TPV Comedor', 'TPV Salas'];
  public pieChartData:number[] = [75,35,156,20];
  public pieChartType:string = 'pie';

  public coloresTPVs: any[] = [
      { 
        backgroundColor:["#FF7360", "#6FC8CE", "#8DE78D", "#F0F562"] 
      }];

}
