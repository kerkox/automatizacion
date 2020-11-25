import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessControlGuard } from '../guards/access-control.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErpComponent } from './erp/erp.component';
import { InventarioComponent } from './erp/inventario/inventario.component';
import { MateriaPrimaComponent } from './erp/materia-prima/materia-prima.component';
import { OrdenPedidoComponent } from './erp/orden-pedido/orden-pedido.component';
import { ParametrosReferenciasComponent } from './erp/parametros-referencias/parametros-referencias.component';
import { MesComponent } from './mes/mes.component';
import { OrdenProduccionComponent } from './mes/orden-produccion/orden-produccion.component';
import { OrdenProduccionAprobadaComponent } from './mes/orden-produccion-aprobada/orden-produccion-aprobada.component';
import { SistemaControlComponent } from './control/sistema-control/sistema-control.component';
import { ControlComponent } from './control/control.component';
import { AuthGuard } from '../guards/auth.guard';

// Mantenimientos
// import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { titulo:'Dashboard'}},
  {
    path: 'erp',
    component: ErpComponent,
    // canActivate: [AuthGuard],
    loadChildren: () => import('./erp/child-routes-erp.module').then(m => m.ChildRoutesErpModule)
  },
  {
    path: 'mes',
    component: MesComponent,
    children: [
      { path: 'orden-produccion', canActivate: [AccessControlGuard], component: OrdenProduccionComponent, data: {titulo: 'Orden Producción'} },
      { path: 'orden-produccion-aprobada', canActivate: [AccessControlGuard], component: OrdenProduccionAprobadaComponent, data: {titulo: 'Orden Producción Aprobadas'} }
    ]
  },
  { 
    path: 'control', component: ControlComponent,
    children: [
      { 
        path: 'sistema-control',
        canActivate: [AccessControlGuard],
        component: SistemaControlComponent, data: { titulo: 'Sistema Control'}}
    ]
  },
  

]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }
