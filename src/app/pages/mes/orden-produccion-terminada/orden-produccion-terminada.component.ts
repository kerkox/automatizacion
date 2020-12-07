import { GeneralService } from './../../../services/general.service';
import { OrdenProduccionService } from './../../../services/orden-produccion.service';
import { EstadoOrden } from './../../../enums/estado-orden.enum';
import { OrdenProduccionDetalle } from './../../../interfaces/orden-produccion-detalle.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden-produccion-terminada',
  templateUrl: './orden-produccion-terminada.component.html',
  styleUrls: ['./orden-produccion-terminada.component.css']
})
export class OrdenProduccionTerminadaComponent implements OnInit {

  ordenes_produccion: OrdenProduccionDetalle[];
  ordenes_terminadas: EstadoOrden[];
  titulos_columnas: string[] = [
    'id',
    'cliente',
    'prioridad',
    'referencia_producto',
    'tipo_producto',
    'presentacion_producto',
    'cantidad',
    'lotes_ejecutados',
    'lotes_totales',
    'fecha_inicio',
    'fecha_terminado',
    'estado',
    // 'detalle',
  ];
  constructor(private ordenProduccionService: OrdenProduccionService,
    private generalService: GeneralService) {
    this.ordenes_produccion = []
    this.ordenes_terminadas = [EstadoOrden.ABORTADA, EstadoOrden.TERMINADA]
  }

  ngOnInit(): void {
  }

}
