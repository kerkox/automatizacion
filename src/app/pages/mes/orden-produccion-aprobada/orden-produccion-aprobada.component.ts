import { OrdenProduccionDetalle } from './../../../interfaces/orden-produccion-detalle.interface';
import { EstadoOrden } from './../../../enums/estado-orden.enum';
import Swal from 'sweetalert2';
import { GeneralService } from './../../../services/general.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenProduccionService } from './../../../services/orden-produccion.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orden-produccion-aprobada',
  templateUrl: './orden-produccion-aprobada.component.html',
  styleUrls: ['./orden-produccion-aprobada.component.css']
})
export class OrdenProduccionAprobadaComponent implements OnInit {

  ordenes_produccion: OrdenProduccionDetalle[];
  ordenes_aprobadas: EstadoOrden[];
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
    this.ordenes_aprobadas = [EstadoOrden["EN PRODUCCION"], EstadoOrden.EN_COLA]
  }

  ngOnInit(): void {
  }

}
