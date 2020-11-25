import { AccessControlGuard } from '../../guards/access-control.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenProduccionComponent } from './orden-produccion/orden-produccion.component';
import { OrdenProduccionAprobadaComponent } from './orden-produccion-aprobada/orden-produccion-aprobada.component';

// Mantenimientos
// import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: 'orden-produccion', canActivate: [AccessControlGuard], component: OrdenProduccionComponent, data: { titulo: 'Orden Producción' } },
  { path: 'orden-produccion-aprobada', canActivate: [AccessControlGuard], component: OrdenProduccionAprobadaComponent, data: { titulo: 'Orden Producción Aprobadas' } },
  { path: '', redirectTo: 'orden-produccion', pathMatch: 'full' }

]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesMesModule { }
