import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ActividadesPage } from '../pages/actividades/actividades';
import { CuentaPage } from '../pages/cuenta/cuenta';
import { TPVPage } from '../pages/tpv/tpv';
import { LoginPage } from '../pages/login/login';
import { DetalleActividadPage} from '../pages/detalle-actividad/detalle-actividad';
import { HomePage } from '../pages/home/home';
import { AsistentesPage} from '../pages/asistentes/asistentes';
import {ActividadesProvider} from '../providers/actividades-provider';
import {AsistentesProvider} from '../providers/asistentes-provider';
import {DetalleActividadProvider} from '../providers/detalle-actividad-provider';
import {TpvProvider} from '../providers/tpv-provider';
import {HomeProvider} from '../providers/home-provider';
@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2, 
    ActividadesPage,
    CuentaPage, 
    HomePage, 
    TPVPage, 
    LoginPage,
    DetalleActividadPage,
    AsistentesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2, 
    ActividadesPage,
    CuentaPage, 
    TPVPage, 
    LoginPage,
    HomePage,
    DetalleActividadPage,
    AsistentesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  ActividadesProvider,
  DetalleActividadProvider, TpvProvider, AsistentesProvider, HomeProvider]
})
export class AppModule {}
