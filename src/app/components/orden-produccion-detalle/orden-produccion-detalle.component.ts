import { GeneralService } from './../../services/general.service';
import { OrdenProduccionDetalle } from './../../interfaces/orden-produccion-detalle.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orden-produccion-detalle',
  templateUrl: './orden-produccion-detalle.component.html',
  styleUrls: ['./orden-produccion-detalle.component.css']
})
export class OrdenProduccionDetalleComponent implements OnInit {

  constructor(
    private generalService:  GeneralService,
    public dialogRef: MatDialogRef<OrdenProduccionDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrdenProduccionDetalle) { }

  ngOnInit(): void {
    console.log("this.data", this.data)
  }

  colorBadgeEstadoOrden(estado: string) {
    return this.generalService.colorBadgeEstadoOrden(estado);
  }

  colorBadgePrioridad(nivel: number) {
    return this.generalService.colorBadgePrioridad(nivel);
  }
  materiaPrimaPorcentaje(materia_prima: any, toneladas_totales: number) {
    return (materia_prima.MateriaPrimaReceta.porcentaje / 100) * toneladas_totales
  }

}
