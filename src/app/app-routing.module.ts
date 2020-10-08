import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './components/control/control.component';
import { ErpComponent } from './components/erp/erp.component';
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { MesComponent } from './components/mes/mes.component';
import { OrdenProduccionComponent } from './components/orden-produccion/orden-produccion.component';
import { ParametrosReferenciasComponent } from './components/parametros-referencias/parametros-referencias.component';
import { StockComponent } from './components/stock/stock.component';

const routes: Routes = [
  { path:'', component: ErpComponent },
  { 
    path:'erp',
    component: ErpComponent,
    children: [
      {
        path: 'inventario',
        component: StockComponent
      },
      {
        path: 'materia-prima',
        component: MateriaPrimaComponent
      },
      {
        path: 'orden-produccion',
        component: OrdenProduccionComponent
      },
      {
        path: 'parametros-referencia',
        component: ParametrosReferenciasComponent
      },
    ]
  },
  { path:'mes', component: MesComponent},
  { path:'control', component: ControlComponent},
  { path: '**',  pathMatch: 'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
