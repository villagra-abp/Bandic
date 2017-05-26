import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TabPage } from '../pages/tab/tab';
import { OcioPage } from '../pages/ocio/ocio';
import { PromocionesPage } from '../pages/promociones/promociones';
import { ReservasPage } from '../pages/reservas/reservas';
import { ConsumoPage } from '../pages/consumo/consumo';
import { SaldoPage } from '../pages/saldo/saldo';
import { IngresoPage } from '../pages/ingreso/ingreso';
import { GastosPage } from '../pages/gastos/gastos';
import { PerfilPage } from '../pages/perfil/perfil';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { DetalleActividadPage } from '../pages/detalle-actividad/detalle-actividad';
import { PromocionesService } from '../providers/promociones';
import { UsuarioService } from '../providers/usuario';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { CondicionesPage } from '../pages/condiciones/condiciones';
import { PrivacidadPage } from '../pages/privacidad/privacidad';
import { CambioPasswordPage } from '../pages/cambio-password/cambio-password';
import { CerrarSesionPage } from '../pages/cerrar-sesion/cerrar-sesion';
import { Storage } from '@ionic/storage';
import { ModalProductoPage } from '../pages/modal-producto/modal-producto';
import { RestorePasswordPage } from '../pages/restore-password/restore-password';
import { CsvPage } from '../pages/csv/csv';
@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2, TabPage, OcioPage, PromocionesPage, ReservasPage, ConsumoPage, SaldoPage, IngresoPage, GastosPage, 
    PerfilPage, AjustesPage, DetalleActividadPage, LoginPage, RegistroPage, CondicionesPage, PrivacidadPage,
    CambioPasswordPage, CerrarSesionPage, ModalProductoPage, RestorePasswordPage, CsvPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2, TabPage, OcioPage, PromocionesPage, ReservasPage, ConsumoPage, SaldoPage, IngresoPage, GastosPage,
    PerfilPage, AjustesPage, DetalleActividadPage, LoginPage, RegistroPage, CondicionesPage, PrivacidadPage,
    CambioPasswordPage, CerrarSesionPage, ModalProductoPage, RestorePasswordPage, CsvPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
  
})
export class AppModule {}
