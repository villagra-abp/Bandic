import { Component, OnInit } from '@angular/core';
import { MainPipe } from '../tools/pipe.module';
import { MetricasService } from '../metricas/services/metricas.service';;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [MetricasService]
})
export class InicioComponent implements OnInit {

  public datos =[0,0,0,0,0,0,0,0,0,0,0,0];

  constructor(private metricasService: MetricasService) { 
    var numero = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    this.metricasService.getUsuarios()
                        .subscribe(response =>{

                        //esto para la grafica de usuarios
                        for(var i = 0; i < response.length; i++){
                          var fecha = response[i].fecha_entrada;
                          var split = fecha.split("-");  
                          for(var j=0; j<numero.length;j++){
                            if(split[1]==numero[j]){             
                                this.datos[j] = this.datos[j] + 1;

                          }
                        }
                      }
                      /*for(var k = 0; k < response.length; k++){
                         var comunidad = response[k].provincia;
                         if(comunidad == this.polarAreaChartLabels[k]){
                            this.polarAreaChartData[k] =  this.polarAreaChartData[k] + 1;
                         }
                         else{

                         }
                      }*/
                        this.lineChartData = this.datos;
                    },
                    error =>{
                        alert('Error');
                    });
  }

  /* A PARTIR DE AQUI EL GRÁFICO DE NUEVOS CLIENTES REGISTRAOS */

  public lineChartData:Array<any> = [
    {data: this.datos, label: '2016'}
  ];

  public lineChartLabels:Array<any> = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  
  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  
  public lineChartType:string = 'line';

   /* A PARTIR DE AQUI EL GRÁFICO DE COMUNIDADES AUTONOMAS */

  // PolarArea
  //public polarAreaChartLabels:string[] = ['Galicia','Asturias','Cantabria','País Vasco','Navarra','Cataluña','Comunidad Valenciana','Islas Baleares','Región de Murcia','Andalucía','Castilla la Mancha','Castilla y León','Extremadura','Islas Canarias','La Rioja','Comunidad de Madrid','Ceuta','Melilla','Aragón'];
  public polarAreaChartLabels:string[] = ['Cataluña','Comunidad Valenciana','Islas Baleares','Región de Murcia','Andalucía','Comunidad de Madrid'];
  public polarAreaChartData:number[] = [5,7,4,5,3,6];
  public polarAreaLegend:boolean = true;
 
  public polarAreaChartType:string = 'polarArea';

  /*habitaciones ocupadas*/

  public pieChartLabels:string[] = ['Reservado', 'Disponible'];
  public pieChartData:number[] = [75,25];
  public pieChartType:string = 'pie';
 

  ngOnInit() {
  }

}
