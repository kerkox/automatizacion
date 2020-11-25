import { AccessControlGuard } from '../../guards/access-control.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { OrdenPedidoComponent } from './orden-pedido/orden-pedido.component';
import { ParametrosReferenciasComponent } from './parametros-referencias/parametros-referencias.component';

// Mantenimientos
// import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
      { path: 'inventario', canActivate: [AccessControlGuard], component: InventarioComponent, data: { titulo: 'Inventario' } },
      { path: 'materia-prima', canActivate: [AccessControlGuard], component: MateriaPrimaComponent, data: { titulo: 'Materia Prima' } },
      { path: 'orden-pedido', canActivate: [AccessControlGuard], component: OrdenPedidoComponent, data: { titulo: 'Orden Pedido' } },
      { path: 'parametros-referencia', canActivate: [AccessControlGuard], component: ParametrosReferenciasComponent, data: { titulo: 'Parametros Referencia' } },
      { path: '', redirectTo: 'materia-prima', pathMatch: 'full' }

]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesErpModule { }
