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
  
  // Doughnut
  public doughnutChartLabels:string[] = ['TPV 1', 'TPV 2'];
  public doughnutChartData:number[] = [1700, 1250];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
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


}
