import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErpComponent } from './components/erp/erp.component';
import { MesComponent } from './components/mes/mes.component';

const routes: Routes = [
  { path:'erp', component: ErpComponent},
  { path:'mes', component: MesComponent},
  { path: '**',  pathMatch: 'full', redirectTo:'erp'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
