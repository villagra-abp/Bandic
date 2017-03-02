import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../../tools/pipe.module';
import { MetricasService } from '../services/metricas.service';
 
@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.css'],
  providers: [MetricasService]
})

export class OcupacionComponent implements OnInit {

 public datos1 =[0,0,0,0,0,0,0,0,0,0,0,0];
 public datos2 =[];
 public year1 = ['2016'];
 public year2 = ['2017'];

  constructor(private metricasService: MetricasService) {}

  ngOnInit() {
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  public barChartLabels:string[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  //public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
 //AQUI HAGO EL GET DE ACCESOS Y PARCHEO LAS FECHAS PARA DIVIDIR

   public getOcupacion(id) {
    var numero = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    console.log(id);
    this.metricasService.getOcupacion(id).subscribe(
          response => {
            console.log(response[0].hora_salida);
                 	for(var i = 0; i < response.length; i++){
                  var fecha = response[i].hora_salida;
                  var split = fecha.split("-");   
                    
                    for(var j=0; j<numero.length;j++){
                          if(split[1]==numero[j]){                       
                            this.datos1[j] = this.datos1[j] + 1;
                            this.barChartData = this.datos1;
                          }
                        }
                    }
          },
          error => {
                  alert("Error en la petición");
          }
      );
  }

  //OTRA FUNCION PARA SACAR EL AÑO
 
  public barChartData:any[] = [
    {data: this.datos1, label: this.year1},
    {data: this.datos2, label: this.year2}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
