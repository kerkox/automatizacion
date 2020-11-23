import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimacionComponent } from './animacion/animacion.component';
import { OrdenDetalleInternoComponent } from './orden-detalle-interno/orden-detalle-interno.component';
import { OrdenProduccionDetalleComponent } from './orden-produccion-detalle/orden-produccion-detalle.component';
import { OrdenProduccionTablaComponent } from './orden-produccion-tabla/orden-produccion-tabla.component';



@NgModule({
  declarations: [
    AnimacionComponent,
    OrdenDetalleInternoComponent,
    OrdenProduccionTablaComponent,
    OrdenProduccionDetalleComponent,
  ],
  exports: [
    AnimacionComponent,
    OrdenDetalleInternoComponent,
    OrdenProduccionTablaComponent,
    OrdenProduccionDetalleComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
