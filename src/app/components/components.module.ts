import { LoadingComponent } from './shared/loading/loading.component';
import { PipesModule } from './../pipes/pipes.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimacionComponent } from './animacion/animacion.component';
import { OrdenDetalleInternoComponent } from './orden-detalle-interno/orden-detalle-interno.component';
import { OrdenProduccionDetalleComponent } from './orden-produccion-detalle/orden-produccion-detalle.component';
import { OrdenProduccionTablaComponent } from './orden-produccion-tabla/orden-produccion-tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PruebaCalidadDialogComponent } from './prueba-calidad-dialog/prueba-calidad-dialog.component';



@NgModule({
  declarations: [
    AnimacionComponent,
    OrdenDetalleInternoComponent,
    OrdenProduccionTablaComponent,
    OrdenProduccionDetalleComponent,
    LoadingComponent,
    PruebaCalidadDialogComponent
  ],
  exports: [
    AnimacionComponent,
    OrdenDetalleInternoComponent,
    OrdenProduccionTablaComponent,
    OrdenProduccionDetalleComponent,
    LoadingComponent,
    PruebaCalidadDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
