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

  /*public colores:Array<any> = [
    {
      backgroundColor:["#FF7360"]
    }
  ];*/

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(111,200,206,0.2)',
      borderColor: 'rgba(111,200,206,1)',
      pointBackgroundColor: 'rgba(111,200,206,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(111,200,206,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

   /* A PARTIR DE AQUI EL GRÁFICO DE COMUNIDADES AUTONOMAS */
  // PolarArea


  public polarAreaChartLabels:string[] = ['Cataluña','Comunidad Valenciana','Islas Baleares','Región de Murcia','Andalucía','Comunidad de Madrid'];
  public polarAreaChartData:number[] = [5,7,4,5,3,6];
  public polarAreaLegend:boolean = true;
 
  public polarAreaChartType:string = 'polarArea';


  ngOnInit() {
  }


  /* AQUI VA LA GRAFICA DE HABITACIONES OCUPADAS */

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Nacionales'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Extranjeros'}
  ];

  public coloresClientes: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,115,96,1)',
      borderColor: 'rgba(225,115,96,0.2)',
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

    public coloresRuleta: any[] = [{ 
      backgroundColor:["#FF7360", "#6FC8CE", "#8DE78D", "#F0F562"] 
    }];
}
