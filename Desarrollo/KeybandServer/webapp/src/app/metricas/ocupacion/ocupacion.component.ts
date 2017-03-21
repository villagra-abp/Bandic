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
 public datos2 =[0,0,0,0,0,0,0,0,0,0,0,0];
 public year1 = ['2016'];
 public year2 = ['2017'];
 public acceso;
 public estancia;
 public porcentaje;
 public capacidad;

 public numero;

  constructor(private metricasService: MetricasService) {
     this.metricasService.getNumero()
            .subscribe(
            response => {
                        this.numero = response.length;
                        //console.log(this.estancias);
                },
                error => {
                        alert("Error en la petición");
                }
            );  
  }

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
                    console.log(split); 
                      
                      for(var j=0; j<numero.length;j++){
                          if(split[1]==numero[j]){  
                              if(split[0]=='2016'){                     
                                  this.datos1[j] = this.datos1[j] + 1;
                                  this.barChartData = this.datos1;
                              }
                              else if(split[0]=='2017'){
                                this.datos2[j] = this.datos2[j] + 1;
                                this.barChartData = this.datos2;
                              }
                          }
                      }
                    }
                    this.completarOcupacion(id);
            },
            error => {
                    alert("Error en la petición");
            }
        );
  }

  public completarOcupacion(id){
   this.metricasService.getDetalles(id).subscribe(
                response =>{
                      this.acceso = response[0].count;
                      this.completarDetalles(id);
                },
                error =>{
                  alert("Error en la petición");
                }
        );
  }

  public completarDetalles(id){
    this.metricasService.getEstancia(id).subscribe(
      response => {
                this.capacidad = response[0].capacidad;
                let percen = ((this.acceso*100)/this.capacidad);
                this.porcentaje = percen.toFixed(2);
                this.estancia = response[0].id;
                document.getElementById("ocultar").style.visibility = "visible";


      },
      error => {
         alert("Error en la petición");
      }
    )
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
