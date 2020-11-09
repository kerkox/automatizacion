import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from '../components/control/control.component';
import { ErpComponent } from './erp/erp.component';
import { InventarioComponent } from './erp/inventario/inventario.component';
import { MateriaPrimaComponent } from './erp/materia-prima/materia-prima.component';
import { OrdenPedidoComponent } from './erp/orden-pedido/orden-pedido.component';
import { ParametrosReferenciasComponent } from './erp/parametros-referencias/parametros-referencias.component';
import { MesComponent } from './mes/mes.component';
import { OrdenProduccionComponent } from './mes/orden-produccion/orden-produccion.component';
import { PagesComponent } from './pages.component';


// Mantenimientos
// import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  {
    path: 'erp',
    component: ErpComponent,
    children: [
      {
        path: 'inventario',
        component: InventarioComponent
      },
      {
        path: 'materia-prima',
        component: MateriaPrimaComponent
      },
      {
        path: 'orden-pedido',
        component: OrdenPedidoComponent
      },
      {
        path: 'parametros-referencia',
        component: ParametrosReferenciasComponent
      },
      {
        path: '',
        redirectTo: 'materia-prima',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'mes',
    component: MesComponent,
    children: [
      {
        path: 'orden-produccion',
        component: OrdenProduccionComponent
      }

    ]
  },
  {
    path: '',
    redirectTo: 'erp',
    pathMatch: 'full'
  },
  { path: 'control', component: ControlComponent },

]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
