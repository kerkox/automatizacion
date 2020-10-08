import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './components/control/control.component';
import { ErpComponent } from './components/erp/erp.component';
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { MesComponent } from './components/mes/mes.component';
import { OrdenProduccionComponent } from './components/orden-produccion/orden-produccion.component';

const routes: Routes = [
  { path:'', component: ErpComponent },
  { 
    path:'erp',
    component: ErpComponent,
    children: [
      {
        path: 'materia-prima',
        component: MateriaPrimaComponent
      },
      {
        path: 'orden-produccion',
        component: OrdenProduccionComponent
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
