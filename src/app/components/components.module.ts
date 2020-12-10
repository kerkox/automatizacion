import { animationReducers } from './../animations/reducers/animation.reducers';
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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AlarmaDialogComponent } from './alarma-dialog/alarma-dialog.component';
import { ConfirmacionAbortarDialogComponent } from './confirmacion-abortar-dialog/confirmacion-abortar-dialog.component';
import { ReporteOrdenDialogComponent } from './reporte-orden-dialog/reporte-orden-dialog.component'; 


@NgModule({
  declarations: [
    AnimacionComponent,
    OrdenDetalleInternoComponent,
    OrdenProduccionTablaComponent,
    OrdenProduccionDetalleComponent,
    LoadingComponent,
    PruebaCalidadDialogComponent,
    AlarmaDialogComponent,
    ConfirmacionAbortarDialogComponent,
    ReporteOrdenDialogComponent
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
    PipesModule,
    StoreModule.forRoot(animationReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ]
})
export class ComponentsModule { }
