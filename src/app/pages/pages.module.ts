import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './../components/components.module';
import { PagesRoutingModule } from './pages.routing';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';

// Sistema Control
import { ControlComponent } from './control/control.component';
import { SistemaControlComponent } from './control/sistema-control/sistema-control.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// ERP
import { ErpComponent } from './erp/erp.component';
import { InventarioComponent } from './erp/inventario/inventario.component';
import { MateriaPrimaComponent } from './erp/materia-prima/materia-prima.component';
import { OrdenPedidoComponent } from './erp/orden-pedido/orden-pedido.component';
import { ParametrosReferenciasComponent } from './erp/parametros-referencias/parametros-referencias.component';

// MES
import { MesComponent } from './mes/mes.component';
import { OrdenProduccionAprobadaComponent } from './mes/orden-produccion-aprobada/orden-produccion-aprobada.component';
import { OrdenProduccionComponent } from './mes/orden-produccion/orden-produccion.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [

    ErpComponent,
    MesComponent,
    OrdenPedidoComponent,
    ControlComponent,
    ParametrosReferenciasComponent,
    MateriaPrimaComponent,
    PagesComponent,
    InventarioComponent,
    OrdenProduccionComponent,
    OrdenProduccionAprobadaComponent,
    SistemaControlComponent,
    DashboardComponent,
  ],
  exports: [
    ErpComponent,
    MesComponent,
    OrdenPedidoComponent,
    ControlComponent,
    ParametrosReferenciasComponent,
    MateriaPrimaComponent,
    PagesComponent,
    InventarioComponent,
    OrdenProduccionComponent,
    OrdenProduccionAprobadaComponent,
    DashboardComponent,
    SistemaControlComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
