import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErpComponent } from './pages/erp/erp.component';
import { MesComponent } from './components/mes/mes.component';
import { OrdenPedidoComponent } from './pages/erp/orden-pedido/orden-pedido.component';
import { ControlComponent } from './components/control/control.component';
import { ParametrosReferenciasComponent } from './pages/parametros-referencias/parametros-referencias.component';
import { MateriaPrimaComponent } from './pages/erp/materia-prima/materia-prima.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { InventarioComponent } from './pages/inventario/inventario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErpComponent,
    MesComponent,
    OrdenPedidoComponent,
    ControlComponent,
    ParametrosReferenciasComponent,
    MateriaPrimaComponent,
    LoadingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NoPageFoundComponent,
    PagesComponent,
    InventarioComponent
    
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
