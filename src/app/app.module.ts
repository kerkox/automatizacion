import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErpComponent } from './components/erp/erp.component';
import { MesComponent } from './components/mes/mes.component';
import { OrdenProduccionComponent } from './components/orden-produccion/orden-produccion.component';
import { StockComponent } from './components/stock/stock.component';
import { ControlComponent } from './components/control/control.component';
import { ParametrosReferenciasComponent } from './components/parametros-referencias/parametros-referencias.component';
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErpComponent,
    MesComponent,
    OrdenProduccionComponent,
    StockComponent,
    ControlComponent,
    ParametrosReferenciasComponent,
    MateriaPrimaComponent,
    LoadingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
