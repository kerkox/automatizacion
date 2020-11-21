import { EstadoOrden } from './../../../enums/estado-orden.enum';
import { Component, OnInit  } from '@angular/core';
import { ColumnsTable } from 'src/app/components/orden-produccion-tabla/orden-produccion-tabla.component';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent implements OnInit {
  
  orden_generada= [EstadoOrden.GENERADA]
  columns_show = [
      ColumnsTable.id,
      ColumnsTable.cliente,
      ColumnsTable.prioridad,
      ColumnsTable.referencia_producto,
      ColumnsTable.tipo_producto,
      ColumnsTable.presentacion_producto,
      ColumnsTable.cantidad,
      ColumnsTable.lotes_ejecutados,
      ColumnsTable.lotes_totales,
      // ColumnsTable.fecha_inicio,
      // ColumnsTable.fecha_terminado,
      ColumnsTable.estado,
      ColumnsTable.tiene_observaciones,
      ColumnsTable.materias_primas,
      ColumnsTable.detalle,
  ]

  ngOnInit(): void {
  }

}

