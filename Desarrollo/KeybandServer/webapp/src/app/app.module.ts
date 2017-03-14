//importamos las librerias necesarias
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//importamos los componentes 
import { AppComponent } from './app.component';
import { ProfileBarComponent } from './profile-bar/profile-bar.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MetricasComponent } from './metricas/metricas.component';
import { EstanciaComponent } from './estancia/estancia.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ProductoComponent } from './producto/producto.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { RolComponent } from './rol/rol.component';
import { CategoriaProductoComponent } from './categoria-producto/categoria-producto.component';
import { PulseraComponent } from './pulsera/pulsera.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { LoginComponent } from './login/login.component';
import { BuscadorCategoriaComponent } from './categoria-producto/buscador-categoria/buscador-categoria.component';
import { BuscadorClienteComponent } from './cliente/buscador-cliente/buscador-cliente.component';
import { BuscadorEmpleadoComponent } from './empleado/buscador-empleado/buscador-empleado.component';
import { BuscadorEstanciaComponent } from './estancia/buscador-estancia/buscador-estancia.component';
import { BuscadorHabitacionComponent } from './habitacion/buscador-habitacion/buscador-habitacion.component';
import { BuscadorProductoComponent } from './producto/buscador-producto/buscador-producto.component';
import { BuscadorPulseraComponent } from './pulsera/buscador-pulsera/buscador-pulsera.component';
import {BuscadorNotificacionComponent} from './notificacion/buscador-notificacion/buscador-notificacion.component';
import { BuscadorRolComponent } from './rol/buscador-rol/buscador-rol.component';
import { AppRoutingModule} from './app-routing/app-routing.module'; //importamos el contenedor de las rutas
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { OcupacionComponent } from './metricas/ocupacion/ocupacion.component';
import { ContabilidadComponent } from './metricas/contabilidad/contabilidad.component';
import { PromocionComponent } from './promocion/promocion.component';
import { MapaComponent } from './mapa/mapa.component';

import {MainPipe} from './tools/pipe.module';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';





@NgModule({
  declarations: [
    AppComponent,
    ProfileBarComponent,
    ClienteComponent,
    MetricasComponent,
    EstanciaComponent,
    EmpleadoComponent,
    ProductoComponent,
    NotificacionComponent,
    RolComponent,
    CategoriaProductoComponent,
    PulseraComponent,
    HabitacionComponent,
    LoginComponent,
    BuscadorCategoriaComponent,
    BuscadorClienteComponent,
    BuscadorEmpleadoComponent,
    BuscadorEstanciaComponent,
    BuscadorHabitacionComponent,
    BuscadorProductoComponent,
    BuscadorPulseraComponent,
    BuscadorNotificacionComponent,
    BuscadorRolComponent,
    InicioComponent,
    MenuComponent,
    OcupacionComponent,
    ContabilidadComponent,
    PromocionComponent,
    MapaComponent,
    WysiwygComponent,
  
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MainPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
