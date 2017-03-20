//Importamos librerias del core y router necesarias
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importamos todos los components que se redireccionen
import { AppComponent } from '../app.component';
import { ProductoComponent }   from '../producto/producto.component';
import { InicioComponent }   from '../inicio/inicio.component';
import { EmpleadoComponent }   from '../empleado/empleado.component';
import { ClienteComponent }   from '../cliente/cliente.component';
import { CategoriaProductoComponent }   from '../categoria-producto/categoria-producto.component';
import { HabitacionComponent }   from '../habitacion/habitacion.component';
import { EstanciaComponent }   from '../estancia/estancia.component';
import { OcupacionComponent }   from '../metricas/ocupacion/ocupacion.component';
import { ContabilidadComponent }   from '../metricas/contabilidad/contabilidad.component';
import { RolComponent }   from '../rol/rol.component';
import { NewRolComponent }   from '../rol/new-rol/new-rol.component';
import { EditRolComponent }   from '../rol/edit-rol/edit-rol.component';
import { PulseraComponent }   from '../pulsera/pulsera.component';
import { PromocionComponent }   from '../promocion/promocion.component';
import { MapaComponent }   from '../mapa/mapa.component';
import { LoginComponent }   from '../login/login.component';



const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
// { path: 'detail/:id', component: HeroDetailComponent }, EJEMPLO DONDE SE LE PASA ID
  { path: 'cliente',     component: ClienteComponent },
  { path: 'inicio',     component: InicioComponent },
  { path: 'empleado',     component: EmpleadoComponent },
  { path: 'categoria',     component: CategoriaProductoComponent },
  { path: 'producto',     component: ProductoComponent },
  { path: 'habitacion',     component: HabitacionComponent },
  { path: 'estancia',     component: EstanciaComponent },
  { path: 'ocupacion',     component: OcupacionComponent },
  { path: 'contabilidad',     component: ContabilidadComponent },
  { path: 'mapa',     component: MapaComponent },
  { path: 'rol',     component: RolComponent },
  { path: 'newRol',     component: NewRolComponent },
  { path: 'editRol',     component: EditRolComponent },
  { path: 'pulsera',     component: PulseraComponent },
  { path: 'promocion',     component: PromocionComponent },
  { path: 'login',     component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
