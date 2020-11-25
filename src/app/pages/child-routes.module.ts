import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessControlGuard } from '../guards/access-control.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErpComponent } from './erp/erp.component';
import { MesComponent } from './mes/mes.component';

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
    canActivate: [AuthGuard],
    canLoad: [AccessControlGuard],
    loadChildren: () => import('./erp/child-routes-erp.module').then(m => m.ChildRoutesErpModule)
  },
  {
    path: 'mes',
    component: MesComponent,
    canActivate: [AuthGuard],
    canLoad: [AccessControlGuard],
    loadChildren: () => import('./mes/child-routes-mes.module').then(m => m.ChildRoutesMesModule)
  },
  { 
    path: 'control', component: ControlComponent,
    canActivate: [AuthGuard],
    canLoad: [AccessControlGuard],
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
